"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUploader({
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    try {
      setUploading(true);

      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const json = await res.json();

      onChange(json.secure_url);

    } catch (err) {

      console.error(err);

      alert("Image upload failed");

    } finally {

      setUploading(false);

    }
  }

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    upload(e.target.files[0]);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    if (!e.dataTransfer.files.length) return;

    upload(e.dataTransfer.files[0]);
  }

    return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleInput}
      />

      {!value ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            border: "2px dashed #CBD5E1",
            borderRadius: 20,
            padding: "3rem",
            textAlign: "center",
            cursor: "pointer",
            background: "#F8FAFC",
            transition: ".25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#2563EB";
            e.currentTarget.style.background = "#EFF6FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#CBD5E1";
            e.currentTarget.style.background = "#F8FAFC";
          }}
        >
          {uploading ? (
            <>
              <Loader2
                size={48}
                className="animate-spin"
                color="#2563EB"
              />

              <h3
                style={{
                  marginTop: "1rem",
                }}
              >
                Uploading...
              </h3>
            </>
          ) : (
            <>
              <Upload
                size={50}
                color="#2563EB"
              />

              <h3
                style={{
                  marginTop: "1rem",
                }}
              >
                Upload Image
              </h3>

              <p
                style={{
                  color: "#64748B",
                  marginTop: ".5rem",
                }}
              >
                Drag & Drop image here

                <br />

                or click to browse
              </p>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 20,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: 380,
              objectFit: "cover",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              style={button}
            >
              <RefreshCw size={18} />

              Replace
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              style={{
                ...button,
                background: "#EF4444",
              }}
            >
              <Trash2 size={18} />

              Remove
            </button>
          </div>
        </div>
      )}

          </div>
  );
}

const button: React.CSSProperties = {
  border: "none",
  background: "#2563EB",
  color: "#fff",
  padding: "12px 18px",
  borderRadius: 12,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 600,
  transition: ".25s",
};