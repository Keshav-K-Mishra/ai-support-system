import { Hono } from "hono"

export const agentRoutes = new Hono()

agentRoutes.get("/", (c) => {
  return c.json({
    agents: ["support", "order", "billing"]
  })
})

agentRoutes.get("/:type/capabilities", (c) => {
  const type = c.req.param("type")

  return c.json({
    type,
    capabilities: `Capabilities for ${type} agent`
  })
})
