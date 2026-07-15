import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        category,
        origin_country,
        short_description,
        image
      FROM products
      WHERE id = $1
      `,
      [productId]
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const product = result.rows[0];

    const prompt = `
You are a senior B2B Social Media Marketing Expert working for TradePro Global.

Generate engaging Facebook and Instagram content for the following export product.

Company:
TradePro Global

Product:
${product.name}

Category:
${product.category}

Country of Origin:
${product.origin_country}

Description:
${product.short_description}

Requirements:

- Professional B2B tone
- Target importers, wholesalers, distributors and retailers
- Mention export quality
- Mention worldwide shipping
- Include a strong Call-To-Action
- Generate exactly 15 SEO hashtags

IMPORTANT:

Return ONLY valid JSON.

Do NOT wrap the response inside markdown.

Do NOT use triple backticks.

Return exactly this format:

{
  "facebook":"...",
  "instagram":"...",
  "hashtags":"..."
}
`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL!,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message.content || "";

    if (!content.trim()) {
      return NextResponse.json(
        { error: "AI returned an empty response." },
        { status: 500 }
      );
    }

    // Remove markdown code fences if the AI adds them
    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let aiResponse;

    try {
      aiResponse = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse AI response.",
          raw: content,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
      facebook: aiResponse.facebook,
      instagram: aiResponse.instagram,
      hashtags: aiResponse.hashtags,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}