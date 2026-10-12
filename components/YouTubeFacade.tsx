"use client";

import Image from "next/image";
import { useState } from "react";
import { C } from "@/lib/site";

/**
 * Click-to-play YouTube embed. Until the visitor presses play only the
 * poster frame (an optimised <Image>) and a play badge are rendered, so the
 * page never loads YouTube's player script or sets its cookies on its own.
 * Fills its parent: the parent sets the aspect ratio and `position: relative`.
 */
export default function YouTubeFacade({
  id,
  title,
}: {
  /** YouTube video id, e.g. "AnLzNzHE7JY". */
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          display: "block",
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        padding: 0,
        border: 0,
        background: C.navyDeep,
        cursor: "pointer",
        display: "block",
      }}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 1140px) 90vw, 1140px"
        style={{ objectFit: "cover" }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 88,
          height: 60,
          borderRadius: 16,
          background: "rgba(242, 92, 10, 0.96)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.35)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
