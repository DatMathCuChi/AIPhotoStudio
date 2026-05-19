import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenerativeAI | null = null;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenerativeAI(apiKey);
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    try {
      res.json({ 
        status: "ok", 
        aiEnabled: !!ai,
        demoMode: !ai,
        message: ai ? "AI services are ready." : "AI demo mode: Gemini API key is not configured."
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/ai/edit", async (req, res) => {
    try {
      const { prompt, image, mode, userApiKey } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const effectiveKey = userApiKey || apiKey;
      
      if (!effectiveKey || effectiveKey === "MY_GEMINI_API_KEY") {
        return res.json({ 
          success: true, 
          message: "AI processing completed (Demo Mode)", 
          image: image,
          isDemo: true 
        });
      }

      const activeAi = new GoogleGenerativeAI(effectiveKey);
      const model = activeAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const parts: any[] = [
        { text: `Edit this image according to this prompt: ${prompt}. Mode: ${mode}` },
        { inlineData: { data: image.split(',')[1], mimeType: "image/png" } },
      ];

      const result = await model.generateContent(parts);
      const responseText = result.response.text();

      res.json({ 
        success: true, 
        analysis: responseText,
        image: image, // Simulation: for true image-to-image, we should return the edited one
        isDemo: false
      });
    } catch (error: any) {
      console.error("AI Error:", error);
      res.status(500).json({ 
        error: error.message || "An unknown error occurred during AI processing"
      });
    }
  });

  // Vite middleware for development
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
