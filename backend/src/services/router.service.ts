import { orderAgent } from "./agents/order.agent"
import { billingAgent } from "./agents/billing.agent"
import { supportAgent } from "./agents/support.agent"

export type AgentType = "order" | "billing" | "support"

export interface AgentResult {
  agent: AgentType
  response: string
}

export async function routeMessage(message: string): Promise<AgentResult> {
  const lower = message.toLowerCase()

  if (lower.includes("order")) {
    const response = await orderAgent(message)
    return {
      agent: "order",
      response: response ?? "Order Agent: Unable to fetch order details."
    }
  }

  if (lower.includes("bill") || lower.includes("invoice")) {
    const response = await billingAgent(message)
    return {
      agent: "billing",
      response: response ?? "Billing Agent: Unable to fetch billing details."
    }
  }

  const response = await supportAgent(message)
  return {
    agent: "support",
    response: response ?? "Support Agent: How can I help you?"
  }
}
