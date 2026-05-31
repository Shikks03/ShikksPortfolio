import { NextResponse } from 'next/server';

export const revalidate = 86400; // cache for 24 hours

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.cloak-preview+json',
    'User-Agent': 'shikkari-portfolio',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/search/commits?q=author:${process.env.GITHUB_USERNAME ?? 'Shikks03'}&per_page=1`,
      { headers, next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ commits: null }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ commits: data.total_count ?? null });
  } catch {
    return NextResponse.json({ commits: null }, { status: 500 });
  }
}
