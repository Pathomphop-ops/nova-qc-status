import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://datacenter.novamodular.co.th/api/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const element_no = searchParams.get('element_no');
  const project_id = searchParams.get('project_id');

  if (!element_no || !project_id) {
    return NextResponse.json({ success: false, message: 'Missing element_no or project_id' }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`${EXTERNAL_API_URL}/index.php?element_no=${encodeURIComponent(element_no)}&project_id=${encodeURIComponent(project_id)}`);
    if (!apiRes.ok) {
      throw new Error(`External API responded with status ${apiRes.status}`);
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const apiRes = await fetch(`${EXTERNAL_API_URL}/index.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!apiRes.ok) {
            const errorText = await apiRes.text();
            console.error("External API Error:", errorText);
            throw new Error(`External API responded with status ${apiRes.status}: ${errorText}`);
        }
        
        const data = await apiRes.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("API Route Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
