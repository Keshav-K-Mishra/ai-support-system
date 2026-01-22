import { useState } from "react"

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message) return

    setLoading(true)

    try {
      const res = await fetch("http://localhost:3000/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      })

      const data = await res.json()

      console.log("Backend response:", data)

      setMessages(prev => [
        ...prev,
        "You: " + message,
        "Agent: " + data.response
      ])
    } catch (err) {
      console.error("API Error:", err)
      setMessages(prev => [...prev, "Error talking to backend"])
    } finally {
      setLoading(false)
      setMessage("")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Support Chat</h2>

      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}

      {loading && <p>Agent is typing...</p>}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
