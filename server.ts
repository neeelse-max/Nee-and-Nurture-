import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import session from "express-session";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cookieParser());
  app.use(express.json());
  
  // Session configuration for iframe context
  app.use(session({
    secret: process.env.SESSION_SECRET || "nee-nurture-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,      // Required for SameSite=None
      sameSite: 'none',  // Required for cross-origin iframe
      httpOnly: true,
    }
  }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Monzo OAuth Routes
  app.get("/api/auth/monzo/url", (req, res) => {
    const clientId = process.env.MONZO_CLIENT_ID;
    const redirectUri = process.env.MONZO_REDIRECT_URI || `${req.protocol}://${req.get('host')}/auth/monzo/callback`;
    
    if (!clientId) {
      return res.status(500).json({ error: "Monzo Client ID not configured" });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state: Math.random().toString(36).substring(7), // In real app, store this in session
    });

    const authUrl = `https://auth.monzo.com/?${params}`;
    res.json({ url: authUrl });
  });

  app.get("/auth/monzo/callback", async (req, res) => {
    const { code, state } = req.query;
    const clientId = process.env.MONZO_CLIENT_ID;
    const clientSecret = process.env.MONZO_CLIENT_SECRET;
    const redirectUri = process.env.MONZO_REDIRECT_URI || `${req.protocol}://${req.get('host')}/auth/monzo/callback`;

    if (!code) {
      return res.status(400).send("No code provided");
    }

    try {
      const response = await axios.post("https://api.monzo.com/oauth2/token", new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        code: code as string,
      }));

      // Store tokens in session (In a real app, store in DB)
      (req.session as any).monzoTokens = response.data;

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'MONZO_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Monzo connected successfully. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("Monzo OAuth Error:", error.response?.data || error.message);
      res.status(500).send("Failed to exchange Monzo code for tokens");
    }
  });

  app.get("/api/monzo/status", (req, res) => {
    const tokens = (req.session as any).monzoTokens;
    res.json({ connected: !!tokens });
  });

  // Mock Stripe Checkout Session
  app.post("/api/create-checkout-session", (req, res) => {
    const { bookingType } = req.body;
    res.json({ url: "#", id: "mock_session_id" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
