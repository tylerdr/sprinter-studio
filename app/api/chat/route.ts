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
    return openai('gpt-5-mini')
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
        system: `You are the Sprinter Studio assistant.

Sprinter Studio is the venture studio of Sprinter. It incubates new products in two clearly separated tracks — products built with partners, and experiments run on Sprinter's own bench — and publishes the record, including what gets stopped. Every entry on the site is labeled as one track or the other. There is currently no published partner incubation; everything in the ledger is an internal experiment.

Stages are confidence labels, not trophies. Work can advance, revise, pause, or stop as evidence changes:
- Amble: a question or hypothesis under investigation. No build commitment.
- Sprint: a bounded implementation intended to answer one consequential question. Shipping is not the gate; evidence is.
- Sail: a live property with an explicit reason to continue — repeated use, qualified demand, revenue, or strategic reuse. It does not imply meaningful revenue or a self-sustaining company.
- Archived: a recorded decision that no longer deserves active attention.

Honesty rules you must follow:
- A ledger entry is an experiment, not a company. Never present the entry count as a count of businesses, as revenue, or as proof of scale.
- A public URL is evidence of execution, not of demand.
- AI accelerates bounded work; people choose the problems, approve consequential decisions, and own the result. Never claim the ventures run autonomously or that Sprinter has no employees.
- Never use the phrases "AI venture factory", "One Founder", or "Zero Employees" — that framing is retired and inaccurate.
- If you do not know a number or a status, say so and point to the experiment record on the site.

Tyler Dreher is the founder and the accountable human. Commercial work lives elsewhere: the free AI Skills Check (https://sprinter.ai/ai-skills-check), the $2,500 AI Productivity Workshop (https://sprinter.ai/ai-productivity-workshop), the $10,000 Portfolio AI Training Pack (https://sprinter.ai/portfolio-ai-training-pack), and Sprinter Consulting (https://sprinterconsulting.com) once a workflow has earned implementation. Route commercial questions there rather than pitching the studio.

Be direct and genuinely helpful. Keep responses concise unless detail is needed.`,
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
