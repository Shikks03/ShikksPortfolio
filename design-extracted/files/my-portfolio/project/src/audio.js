// Web Audio: ambient drone + UI clicks. No external samples; all synth.
// Exposed as window.SFX.

(function () {
  let ctx = null;
  let droneNodes = null;
  let muted = true; // start muted; user must unmute (browser autoplay policy)
  let masterGain = null;

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : 0.6;
    masterGain.connect(ctx.destination);
    return ctx;
  }

  function startDrone() {
    if (!ensureCtx() || droneNodes) return;
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = 0;
    out.gain.linearRampToValueAtTime(0.22, now + 2.5);
    out.connect(masterGain);

    // Filter for warmth
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 600;
    lp.Q.value = 0.7;
    lp.connect(out);

    // A small chord of slowly detuned oscillators
    const freqs = [55, 82.5, 110, 164.81, 220.0]; // A1, E2, A2, E3, A3
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "sawtooth" : "triangle";
      o.frequency.value = f;
      // slow LFO on each oscillator for shimmer
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.7 + i * 0.4;
      lfo.connect(lfoGain).connect(o.frequency);
      lfo.start();

      const g = ctx.createGain();
      g.gain.value = 0.15 / (i + 1);
      o.connect(g).connect(lp);
      o.start();
      return { o, g, lfo };
    });

    // High shimmer pad
    const shim = ctx.createOscillator();
    shim.type = "sine";
    shim.frequency.value = 880;
    const shimG = ctx.createGain();
    shimG.gain.value = 0;
    // gentle tremolo
    const tremo = ctx.createOscillator();
    tremo.type = "sine";
    tremo.frequency.value = 0.12;
    const tremoG = ctx.createGain();
    tremoG.gain.value = 0.03;
    tremo.connect(tremoG).connect(shimG.gain);
    tremo.start();
    shim.connect(shimG).connect(out);
    shim.start();
    shimG.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);

    droneNodes = { out, oscs, shim, shimG, lp, tremo };
  }

  function stopDrone() {
    if (!droneNodes) return;
    const now = ctx.currentTime;
    droneNodes.out.gain.cancelScheduledValues(now);
    droneNodes.out.gain.setValueAtTime(droneNodes.out.gain.value, now);
    droneNodes.out.gain.linearRampToValueAtTime(0, now + 0.6);
    setTimeout(() => {
      try {
        droneNodes.oscs.forEach((n) => { n.o.stop(); n.lfo.stop(); });
        droneNodes.shim.stop();
        droneNodes.tremo.stop();
      } catch (e) {}
      droneNodes = null;
    }, 700);
  }

  function blip(opts = {}) {
    if (!ensureCtx() || muted) return;
    const {
      freq = 720,
      dur = 0.08,
      type = "sine",
      vol = 0.18,
      sweep = 0,
    } = opts;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, now);
    if (sweep) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + sweep), now + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    o.connect(g).connect(masterGain);
    o.start(now);
    o.stop(now + dur + 0.05);
  }

  function chord(notes, opts = {}) {
    notes.forEach((f, i) => setTimeout(() => blip({ freq: f, ...opts }), i * 18));
  }

  const SFX = {
    setMuted(m) {
      muted = !!m;
      if (!ensureCtx()) return;
      if (ctx.state === "suspended") ctx.resume();
      const tgt = muted ? 0 : 0.6;
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(tgt, ctx.currentTime + 0.4);
      if (!muted) startDrone();
    },
    isMuted() { return muted; },
    hover()   { blip({ freq: 980,  dur: 0.05, vol: 0.06, type: "triangle" }); },
    select()  { blip({ freq: 660,  dur: 0.08, vol: 0.12, type: "triangle" }); blip({ freq: 990, dur: 0.12, vol: 0.08, type: "sine" }); },
    confirm() { chord([523.25, 659.25, 783.99], { dur: 0.5, vol: 0.1, type: "triangle" }); },
    back()    { blip({ freq: 440, dur: 0.18, vol: 0.1, type: "triangle", sweep: -260 }); },
    crack()   {
      // gem crack: noise burst + low thud
      if (!ensureCtx() || muted) return;
      const now = ctx.currentTime;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
      const d = buffer.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2200;
      bp.Q.value = 1.2;
      const g = ctx.createGain();
      g.gain.value = 0.4;
      src.connect(bp).connect(g).connect(masterGain);
      src.start(now);

      blip({ freq: 120, dur: 0.4, vol: 0.16, type: "sine", sweep: -60 });
      setTimeout(() => chord([523.25, 783.99, 1046.5], { dur: 0.6, vol: 0.07, type: "sine" }), 120);
    },
    carve() { blip({ freq: 260 + Math.random() * 80, dur: 0.06, vol: 0.06, type: "sawtooth", sweep: -40 }); },
  };

  window.SFX = SFX;
})();
