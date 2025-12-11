import { NextResponse, NextRequest } from 'next/server';

const EXTERNAL_API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/novacenter/api/v2';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name_project: string }> }
) {
  const { name_project } = await context.params; // ⭐ ต้อง await params

  if (!name_project) {
    return NextResponse.json(
      { success: false, message: 'Missing name_project' },
      { status: 400 }
    );
  }

  try {
    const apiRes = await fetch(
      `${EXTERNAL_API_URL}/get_project_id.php?name_project=${encodeURIComponent(
        name_project
      )}`
    );

    if (!apiRes.ok) {
      throw new Error(`External API responded with status ${apiRes.status}`);
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
