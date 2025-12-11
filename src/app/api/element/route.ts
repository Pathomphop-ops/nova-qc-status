import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/novacenter/api/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const element_no = searchParams.get('element_no');
  const project_id = searchParams.get('project_id');

  if (!element_no || !project_id) {
    return NextResponse.json({ success: false, message: 'Missing element_no or project_id' }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`${EXTERNAL_API_URL}/check_element.php?element_no=${encodeURIComponent(element_no)}&project_id=${encodeURIComponent(project_id)}`);
    if (!apiRes.ok) {
      throw new Error(`External API responded with status ${apiRes.status}`);
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
