import { Hero } from '@/app/components/home/Hero'
import { WhatThisIs } from '@/app/components/home/WhatThisIs'
import { ExperimentLedger } from '@/app/components/home/ExperimentLedger'
import { Proof } from '@/app/components/home/Proof'
import { HowWeWork } from '@/app/components/home/HowWeWork'
import { CommercialRoutes } from '@/app/components/home/CommercialRoutes'
import { BuiltBySection } from '@/app/components/home/BuiltBySection'
import { FollowTheBuild } from '@/app/components/home/FollowTheBuild'
import { FAQSection } from '@/app/components/home/FAQSection'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <WhatThisIs />
      <ExperimentLedger />
      <Proof />
      <HowWeWork />
      <CommercialRoutes />
      <BuiltBySection />
      <FollowTheBuild />
      <FAQSection />
    </main>
  )
}
