// Web Audio API — ambient drone + UI clicks. All synth, no samples.

type AudioContextType = typeof AudioContext;

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneNodes: {
    out: GainNode;
    oscs: Array<{ o: OscillatorNode; g: GainNode; lfo: OscillatorNode }>;
    shim: OscillatorNode;
    shimG: GainNode;
    lp: BiquadFilterNode;
    tremo: OscillatorNode;
  } | null = null;
  private muted = true;

  private ensureCtx(): AudioContext | null {
    if (this.ctx) return this.ctx;
    if (typeof window === 'undefined') return null;
    const AC: AudioContextType = window.AudioContext || (window as typeof window & { webkitAudioContext: AudioContextType }).webkitAudioContext;
    if (!AC) return null;
    this.ctx = new AC();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.muted ? 0 : 0.6;
    this.masterGain.connect(this.ctx.destination);
    return this.ctx;
  }

  private startDrone() {
    const ctx = this.ensureCtx();
    if (!ctx || this.droneNodes) return;
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = 0;
    out.gain.linearRampToValueAtTime(0.22, now + 2.5);
    out.connect(this.masterGain!);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    lp.Q.value = 0.7;
    lp.connect(out);

    const freqs = [55, 82.5, 110, 164.81, 220.0];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      o.frequency.value = f;
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.7 + i * 0.4;
      lfo.connect(lfoGain);
      lfoGain.connect(o.frequency);
      lfo.start();
      const g = ctx.createGain();
      g.gain.value = 0.15 / (i + 1);
      o.connect(g);
      g.connect(lp);
      o.start();
      return { o, g, lfo };
    });

    const shim = ctx.createOscillator();
    shim.type = 'sine';
    shim.frequency.value = 880;
    const shimG = ctx.createGain();
    shimG.gain.value = 0;
    const tremo = ctx.createOscillator();
    tremo.type = 'sine';
    tremo.frequency.value = 0.12;
    const tremoG = ctx.createGain();
    tremoG.gain.value = 0.03;
    tremo.connect(tremoG);
    tremoG.connect(shimG.gain);
    tremo.start();
    shim.connect(shimG);
    shimG.connect(out);
    shim.start();
    shimG.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);

    this.droneNodes = { out, oscs, shim, shimG, lp, tremo };
  }

  private stopDrone() {
    if (!this.droneNodes || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.droneNodes.out.gain.cancelScheduledValues(now);
    this.droneNodes.out.gain.setValueAtTime(this.droneNodes.out.gain.value, now);
    this.droneNodes.out.gain.linearRampToValueAtTime(0, now + 0.6);
    const nodes = this.droneNodes;
    setTimeout(() => {
      try {
        nodes.oscs.forEach(n => { n.o.stop(); n.lfo.stop(); });
        nodes.shim.stop();
        nodes.tremo.stop();
      } catch {}
    }, 700);
    this.droneNodes = null;
  }

  private blip(opts: { freq?: number; dur?: number; type?: OscillatorType; vol?: number; sweep?: number } = {}) {
    const ctx = this.ensureCtx();
    if (!ctx || this.muted) return;
    const { freq = 720, dur = 0.08, type = 'sine', vol = 0.18, sweep = 0 } = opts;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, now);
    if (sweep) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + sweep), now + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g);
    g.connect(this.masterGain!);
    o.start(now);
    o.stop(now + dur + 0.05);
  }

  private chord(notes: number[], opts: Parameters<AudioManager['blip']>[0] = {}) {
    notes.forEach((f, i) => setTimeout(() => this.blip({ freq: f, ...opts }), i * 18));
  }

  setMuted(m: boolean) {
    this.muted = !!m;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const tgt = this.muted ? 0 : 0.6;
    this.masterGain!.gain.cancelScheduledValues(ctx.currentTime);
    this.masterGain!.gain.linearRampToValueAtTime(tgt, ctx.currentTime + 0.4);
    if (!this.muted) this.startDrone();
  }

  isMuted() { return this.muted; }

  hover()   { this.blip({ freq: 980,  dur: 0.05, vol: 0.06, type: 'triangle' }); }
  select()  { this.blip({ freq: 660,  dur: 0.08, vol: 0.12, type: 'triangle' }); this.blip({ freq: 990, dur: 0.12, vol: 0.08, type: 'sine' }); }
  confirm() { this.chord([523.25, 659.25, 783.99], { dur: 0.5, vol: 0.1, type: 'triangle' }); }
  back()    { this.blip({ freq: 440, dur: 0.18, vol: 0.1, type: 'triangle', sweep: -260 }); }

  crack() {
    const ctx = this.ensureCtx();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const d = buffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2200;
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.value = 0.4;
    src.connect(bp);
    bp.connect(g);
    g.connect(this.masterGain!);
    src.start(now);
    this.blip({ freq: 120, dur: 0.4, vol: 0.16, type: 'sine', sweep: -60 });
    setTimeout(() => this.chord([523.25, 783.99, 1046.5], { dur: 0.6, vol: 0.07, type: 'sine' }), 120);
  }

  carve() { this.blip({ freq: 260 + Math.random() * 80, dur: 0.06, vol: 0.06, type: 'sawtooth', sweep: -40 }); }
}

let _instance: AudioManager | null = null;

export function getAudio(): AudioManager {
  if (!_instance) _instance = new AudioManager();
  return _instance;
}
