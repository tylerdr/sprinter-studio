import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/app/components/Reveal'
import { NOT_A_FUND_STATEMENT } from '@/app/data/positioning'

const faqItems = [
  {
    question: 'Is Sprinter Studio a fund?',
    answer: `No. ${NOT_A_FUND_STATEMENT} Work here is funded by services revenue, not outside capital.`,
  },
  {
    question: 'How does the Amble → Sprint → Sail methodology work?',
    answer:
      'Amble is the ideation phase: exploring ideas, scoring them, and validating demand before writing any code. Sprint is focused build: shipping a working product with AI as leverage, while architecture and scope decisions stay human. Sail is growth: distribution and revenue work, with evidence tracked honestly rather than assumed. Ventures only advance through stage gates with real data.',
  },
  {
    question: 'What counts as a "venture" on this site?',
    answer:
      'Every portfolio item is labeled with a relationship (owned, operated, client work, or experiment), a public state, evidence, and a last-verified date. An item is listed publicly only once that record is backed by something checkable — an empty evidence array or a delisted item are both honest, valid states.',
  },
  {
    question: 'Can I propose a co-build?',
    answer:
      'Yes, if you are a domain insider with real distribution, cash for the first build, and clean IP. Read the full fit criteria and disqualifiers at /co-build.',
  },
  {
    question: 'Can I read the methodology?',
    answer: 'Yes. It covers idea scoring, ICP definition, MVP deployment, and growth loops. Read it at /playbook.',
  },
]

export function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <Reveal className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </Reveal>

        <div className="space-y-6">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.08} y={15}>
              <Card className="bg-surface border-border-subtle">
                <CardContent className="pt-6 space-y-2">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}
