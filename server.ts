import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
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
      const { prompt, image, mode } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!ai) {
        // Demo mode / Mock response
        console.log("Gemini API key not found, running in demo mode.");
        return res.json({ 
          success: true, 
          message: "AI processing completed (Demo Mode)", 
          image: image, // Just echoing back for demo
          isDemo: true 
        });
      }

      const parts = [
        { inlineData: { data: image.split(',')[1], mimeType: "image/png" } },
        { text: `Edit this image according to this prompt: ${prompt}. Mode: ${mode}` }
      ];

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash", // Using a stable model name
        contents: { parts }
      });

      res.json({ 
        success: true, 
        analysis: result.text,
        image: image, // Simulation: just return same image for now
        isDemo: false
      });
    } catch (error: any) {
      console.error("AI Error:", error);
      // Ensure we always return JSON
      res.status(500).json({ 
        error: error.message || "An unknown error occurred during AI processing",
        stack: isProd ? undefined : error.stack
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
