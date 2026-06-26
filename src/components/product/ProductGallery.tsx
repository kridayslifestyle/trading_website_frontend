"use client";

import { useState } from "react";

interface Props {
  image: string;
  images?: string[];
  name: string;
}

export default function ProductGallery({ image, images, name }: Props) {
  const [selected, setSelected] = useState(image);

  const gallery = images && images.length > 0 ? images : [image];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "1.5rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 15px 35px rgba(15,23,42,.05)",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: 18,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            background: "#fff",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
            color: "#2563EB",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          Premium Export Product
        </div>
        <img
          src={selected || "/placeholder.png"}
          alt={name}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
            transition: ".4s",
            cursor: "zoom-in",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 18,
        }}
      >
        {gallery.map((img) => (
          <img
            key={img}
            src={img}
            alt=""
            onClick={() => setSelected(img)}
            style={{
              width: 75,
              height: 75,
              borderRadius: 14,
              objectFit: "cover",
              cursor: "pointer",
              transition: ".25s",
              border:
                selected === img ? "3px solid #2563EB" : "2px solid #E5E7EB",
              transform: selected === img ? "scale(1.05)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
