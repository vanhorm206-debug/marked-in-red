import type { Metadata } from 'next'
import SampleDataBanner from '@/components/layout/sample-data-banner'
import NewsResourceGrid from '@/components/news/news-resource-grid'
import { RESOURCE_CATEGORIES } from '@/lib/resources'

export const metadata: Metadata = {
  title: 'News & Resources — Marked in Red',
  description:
    'Curated external MMIWG2S awareness resources for the Marked in Red demonstration build.',
}

const FEATURED_URL =
  'https://dps.mn.gov/divisions/ojp/offices-missing-murdered/mmir-office'

const resources = RESOURCE_CATEGORIES.flatMap((group) =>
  group.links.map((link) => ({ ...link, category: group.category }))
)

export default function NewsPage() {
  return (
    <div className="bg-surface">
      <section className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-10">
        <SampleDataBanner />

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            External Awareness Resources
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            News &amp; Resources
          </h1>
          <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
            Trusted external places to learn more about and follow MMIWG2S
            issues. These are independent third-party sites; this demo itself
            uses sample data only.
          </p>
        </div>

        <NewsResourceGrid resources={resources} featuredUrl={FEATURED_URL} />
      </section>
    </div>
  )
}
