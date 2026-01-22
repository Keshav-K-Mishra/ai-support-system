import { Context } from "hono"
import { prisma } from "../db"
import { routeMessage } from "../services/router.service"

export const handleChat = async (c: Context) => {
  const body = await c.req.json()
  const { conversationId, message } = body

  // 1️⃣ Create conversation if not exists
  const conversation =
    conversationId
      ? await prisma.conversation.findUnique({
          where: { id: conversationId }
        })
      : null

  const activeConversation =
    conversation ??
    (await prisma.conversation.create({ data: {} }))

  // 2️⃣ Save user message
  await prisma.message.create({
    data: {
      conversationId: activeConversation.id,
      role: "user",
      content: message
    }
  })

  // 3️⃣ Route message to agent
  const agentResponse = await routeMessage(message)

  // 4️⃣ Save agent response
  await prisma.message.create({
    data: {
      conversationId: activeConversation.id,
      role: "agent",
      content: agentResponse.response,
      agentType: agentResponse.agent
    }
  })

  // 5️⃣ Respond to frontend
  return c.json({
    conversationId: activeConversation.id,
    response: agentResponse.response,
    agent: agentResponse.agent
  })
}
