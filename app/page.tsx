import { Hero } from '@/app/components/home/Hero'
import { Proof } from '@/app/components/home/Proof'
import { HowWeWork } from '@/app/components/home/HowWeWork'
import { CoBuildSection } from '@/app/components/home/CoBuildSection'
import { BuiltBySection } from '@/app/components/home/BuiltBySection'
import { FollowTheBuild } from '@/app/components/home/FollowTheBuild'
import { FAQSection } from '@/app/components/home/FAQSection'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <Proof />
      <HowWeWork />
      <CoBuildSection />
      <BuiltBySection />
      <FollowTheBuild />
      <FAQSection />
    </main>
  )
}
