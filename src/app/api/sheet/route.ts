import { NextResponse } from 'next/server';

const PUBLISHED_SHEET_BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0byiFZv0tPDn8pVwZ9l6rMrjlxWfz8OX1Ej_fFEyF7K0lXY1ZJZ5XgBIS0v3f3g/pub';
const SHEET_GIDS: Record<string, string> = {
  Site_Info: '397243099',
  Packages: '1236580059',
  Featured_Destinations: '1182741567',
  Gallery: '1419443455',
  Reviews: '1812720314',
  FAQs: '1639202720',
  Team: '1230329493',
  Contact_Info: '1412481173',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SheetRow = Record<string, string>;

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function clean(value: unknown) {
  return String(value ?? '').trim();
}

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"' && quoted && nextChar === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === ',' && !quoted) {
      row.push(value);
      value = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get('sheet');

  if (!sheet) {
    return NextResponse.json({ error: 'Missing sheet name' }, { status: 400 });
  }

  try {
    const gid = SHEET_GIDS[sheet];
    if (!gid) {
      return NextResponse.json({ error: `Unknown sheet ${sheet}` }, { status: 404 });
    }

    const response = await fetch(`${PUBLISHED_SHEET_BASE}?gid=${gid}&single=true&output=csv&cachebust=${Date.now()}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Unable to load ${sheet}` }, { status: response.status });
    }

    const rows = parseCsv(await response.text());
    const cols = (rows[0] || []).map((cell) => normalizeKey(cell));
    const data = rows.slice(1).map((row) => {
      const nextRow: SheetRow = {};
      cols.forEach((key: string, index: number) => {
        if (!key) return;
        nextRow[key] = clean(row[index]);
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
