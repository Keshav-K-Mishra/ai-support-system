import { Hono } from "hono"
import { cors } from "hono/cors"

import { chatRoutes } from "./routes/chat.routes"
import { agentRoutes } from "./routes/agents.routes"
import { healthRoutes } from "./routes/health.routes"

const app = new Hono()

// ✅ Enable CORS for frontend (5173 → 3000)
app.use(
  "*",
  cors({
    origin: "http://localhost:5173"
  })
)

app.route("/api/chat", chatRoutes)
app.route("/api/agents", agentRoutes)
app.route("/api/health", healthRoutes)

export default app