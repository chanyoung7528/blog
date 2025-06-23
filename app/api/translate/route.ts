// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("req", process.env.NAVER_CLIENT_ID);
  const { text } = await req.json();

  const res = await fetch(
    "https://openapi.naver.com/v1/papago/n2mt/v1/translate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
      },
      body: new URLSearchParams({
        source: "en",
        target: "ko",
        text,
      }),
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Papago API error response:", errorText);
    return NextResponse.json(
      { error: "Papago 요청 실패" },
      { status: res.status },
    );
  }

  const data = await res.json();

  if (data.message?.result?.translatedText) {
    return NextResponse.json({
      translated: data.message.result.translatedText,
    });
  }

  return NextResponse.json({ error: "번역 실패" }, { status: 500 });
}
