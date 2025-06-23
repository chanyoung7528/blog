"use client";

import { useEffect, useState } from "react";

export default function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuoteAndTranslate = async () => {
      try {
        const res = await fetch("/api/quote");
        const data = await res.json();

        setQuote(data.quote);
        setAuthor(data.author);

        // const translateRes = await fetch("/api/translate", {
        //   method: "POST",
        //   body: JSON.stringify({ text: content }),
        //   headers: { "Content-Type": "application/json" },
        // });

        // const result = await translateRes.json();
        // if (result.translated) setTranslated(result.translated);
      } catch (e) {
        console.error("명언 번역 실패", e);
      }
    };

    fetchQuoteAndTranslate();
  }, []);

  return (
    <div>
      <p>{quote}</p>
      <p>-{author}-</p>
    </div>
  );
}
