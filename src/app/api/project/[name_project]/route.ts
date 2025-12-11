import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/novacenter/api/v2';

export async function GET(
  request: Request,
  context: { params: { name_project: string } }
) {

  const params = await context.params;
  const name_project = params.name_project;


  if (!name_project) {
    return NextResponse.json({ success: false, message: 'Missing name_project (debug v3)' }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`${EXTERNAL_API_URL}/get_project_id.php?name_project=${encodeURIComponent(name_project)}`);

    // console.log('Fetching project ID for:', apiRes.url);
    if (!apiRes.ok) {
      throw new Error(`External API responded with status ${apiRes.status}`);
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
