import { Hono } from "hono"
import { handleChat } from "../controllers/chat.controller"

export const chatRoutes = new Hono()

chatRoutes.post("/messages", handleChat)
