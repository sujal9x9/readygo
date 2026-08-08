import { NextResponse } from 'next/server';

const SHEET_ID = '1SfXoc3DeVjVM1-MTQ-puAYwCwRotHxlX';
const SHEET_BASE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SheetRow = Record<string, string>;

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function clean(value: unknown) {
  return String(value ?? '').trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get('sheet');

  if (!sheet) {
    return NextResponse.json({ error: 'Missing sheet name' }, { status: 400 });
  }

  try {
    const response = await fetch(`${SHEET_BASE}&sheet=${encodeURIComponent(sheet)}&cachebust=${Date.now()}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Unable to load ${sheet}` }, { status: response.status });
    }

    const text = await response.text();
    const jsonText = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const payload = JSON.parse(jsonText);
    let cols = payload.table.cols.map((col: { label?: string }) => normalizeKey(col.label || ''));
    let rows = payload.table.rows || [];

    if (!cols.some(Boolean) && rows.length) {
      cols = (rows[0].c || []).map((cell: { v?: unknown; f?: string } | null) => normalizeKey(clean(cell?.f ?? cell?.v ?? '')));
      rows = rows.slice(1);
    }

    const data = rows.map((row: { c?: Array<{ v?: unknown; f?: string } | null> }) => {
      const nextRow: SheetRow = {};
      cols.forEach((key: string, index: number) => {
        if (!key) return;
        const cell = row.c?.[index];
        nextRow[key] = clean(cell?.f ?? cell?.v ?? '');
      });
      return nextRow;
    }).filter((row: SheetRow) => Object.values(row).some(Boolean));

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: `Unable to parse ${sheet}` }, { status: 500 });
  }
}
