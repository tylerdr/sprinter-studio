import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { streamText, createUIMessageStreamResponse, convertToModelMessages } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

function resolveModel() {
  if (process.env.ANTHROPIC_API_KEY) {
    return anthropic('claude-3-5-haiku-20241022')
  }

  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4.1-mini')
  }

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
    return google('gemini-2.0-flash-lite')
  }

  return null
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const model = resolveModel()
    const modelMessages = await convertToModelMessages(messages)

    if (!model) {
      return new Response(
        JSON.stringify({ error: 'Chat not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return createUIMessageStreamResponse({
      stream: streamText({
        model,
        system: `You are the Sprinter Studio assistant. Sprinter Studio is an AI-native venture studio building a constellation of profitable software businesses.

We run on the Amble → Sprint → Sail methodology:
- Amble: Ideate and validate (divergent thinking, scoring, ICP definition)
- Sprint: Build and deploy (focused execution, shipping incrementally)
- Sail: Grow and scale (distribution, growth loops, revenue optimization)

We own 19+ ventures across SaaS, marketplace, content, tools, and services verticals.
The studio is run by Tyler Dreher (founder) with AI agents handling execution.

Answer questions about our methodology, ventures, and AI venture studio model.
Be direct, confident, and genuinely helpful. Keep responses concise unless detail is needed.`,
        messages: modelMessages,
        maxOutputTokens: 500,
      }).toUIMessageStream(),
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Chat unavailable' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
