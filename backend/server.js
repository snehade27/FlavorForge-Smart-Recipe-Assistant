import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/get-recipe", async (req, res) => {
  const { ingredients } = req.body;

  // Safety check
  if (!ingredients || ingredients.length === 0) {
    return res.json({ recipe: "No ingredients provided." });
  }

  const prompt = `
Create a simple cooking recipe using these ingredients:
${ingredients.join(", ")}

Format:
Recipe Name
Ingredients
Steps
`;

  try {
    // ✅ SMALL, FAST MODEL (loads reliably)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();

    // If HF works → return it
    if (Array.isArray(data) && data[0]?.generated_text) {
      return res.json({ recipe: data[0].generated_text });
    }

    // HF loading / error → FALLBACK
    throw new Error("HF model not ready");

  } catch {
    // ✅ FALLBACK (ALWAYS WORKS)
    res.json({
      recipe: `
🍽️ Smart Recipe (Fallback Mode)

Ingredients:
${ingredients.map(i => `- ${i}`).join("\n")}

Steps:
1. Heat oil in a pan.
2. Add onion and sauté until golden.
3. Add remaining ingredients and spices.
4. Cook for 8–10 minutes.
5. Serve hot.

Note:
(Generated using fallback logic when AI model is busy.)
`
    });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
