import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const isValidPayload = (body: unknown): body is ContactPayload => {
  if (!body || typeof body !== "object") return false;
  const candidate = body as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    candidate.name.trim().length <= 100 &&
    typeof candidate.email === "string" &&
    candidate.email.trim().length > 0 &&
    candidate.email.trim().length <= 255 &&
    typeof candidate.message === "string" &&
    candidate.message.trim().length > 0 &&
    candidate.message.trim().length <= 1000
  );
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const contactApiPlugin = (env: Record<string, string>) => ({
  name: "contact-api-plugin",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: () => void) => {
      if (req.url !== "/api/contact") return next();
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk);
        const rawBody = Buffer.concat(chunks).toString("utf8");
        const body = rawBody ? JSON.parse(rawBody) : {};

        if (!isValidPayload(body)) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid form data" }));
          return;
        }

        const apiKey = env.RESEND_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing RESEND_API_KEY in .env" }));
          return;
        }

        const payload = {
          name: body.name.trim(),
          email: body.email.trim(),
          message: body.message.trim(),
        };

        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: env.CONTACT_TO_EMAIL || "bhanu.prakash1708@gmail.com",
          replyTo: payload.email,
          subject: `Portfolio Contact: ${payload.name}`,
          html: `
            <h2>New portfolio contact message</h2>
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
          `,
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        console.error("Contact API error:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Failed to send email" }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), contactApiPlugin(env), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
