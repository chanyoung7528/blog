import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Contentful webhook payload에서 slug 가져오기
  const slug = body?.fields?.slug?.["en-US"]; // 언어코드 맞춰야 함

  if (slug) {
    revalidateTag(`post:${slug}`);
  }

  // 전체 리스트도 갱신
  revalidateTag("posts");

  return NextResponse.json({ revalidated: true });
}
