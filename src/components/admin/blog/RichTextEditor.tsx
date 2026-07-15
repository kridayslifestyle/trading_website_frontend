"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  async function uploadImage(file: File) {
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

    editor
      ?.chain()
      .focus()
      .setImage({
        src: json.secure_url,
      })
      .run();
  }

  if (!editor) return null;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          uploadImage(e.target.files[0]);
        }}
      />
      
      <div
        style={{
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            padding: "12px",
            borderBottom: "1px solid #E2E8F0",
            background: "#F8FAFC",
          }}
        >
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            • List
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. List
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            Quote
          </ToolbarButton>
        </div>

        <EditorContent
          editor={editor}
          style={{
            minHeight: 400,
            padding: 20,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderTop: "1px solid #E2E8F0",
            background: "#F8FAFC",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <ToolbarButton
              active={false}
              onClick={() => {
                const url = window.prompt("Enter image URL");
                if (!url) return;
                editor.chain().focus().setImage({ src: url }).run();
              }}
            >
              🖼 Image
            </ToolbarButton>

            <ToolbarButton
              active={false}
              onClick={() => {
                const url = window.prompt("Enter link");
                if (!url) return;
                editor.chain().focus().setLink({ href: url }).run();
              }}
            >
              🔗 Link
            </ToolbarButton>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            <ToolbarButton
              active={false}
              onClick={() => editor.chain().focus().undo().run()}
            >
              ↶ Undo
            </ToolbarButton>

            <ToolbarButton
              active={false}
              onClick={() => editor.chain().focus().redo().run()}
            >
              ↷ Redo
            </ToolbarButton>
          </div>
        </div>
      </div>
    </>
  );
}

function ToolbarButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 10,
        border: active ? "1px solid #2563EB" : "1px solid #E2E8F0",
        background: active ? "#2563EB" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#334155",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: ".9rem",
        transition: ".2s",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "#F8FAFC";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "#FFFFFF";
        }
      }}
    >
      {children}
    </button>
  );
}