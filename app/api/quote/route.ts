import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://korean-advice-open-api.vercel.app/api/advice",
    );
    const data = await res.json();

    return NextResponse.json({
      quote: data.message,
      author: data.author,
      authorProfile: data.authorProfile,
      content: data.message,
    });
  } catch (err) {
    console.error("[명언 API 에러]", err);
    return NextResponse.json({ error: "명언 불러오기 실패" }, { status: 500 });
  }
}
