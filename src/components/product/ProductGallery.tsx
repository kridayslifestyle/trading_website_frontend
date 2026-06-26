"use client";

import { useState } from "react";

interface Props {
  image: string;
  name: string;
}

export default function ProductGallery({
  image,
  name,
}: Props) {
  const [selected, setSelected] = useState(image);

  const images = [image];

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
        }}
      >
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
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setSelected(img)}
            style={{
              width: 70,
              height: 70,
              borderRadius: 12,
              cursor: "pointer",
              objectFit: "cover",
              border:
                selected === img
                  ? "2px solid #2563EB"
                  : "2px solid transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}