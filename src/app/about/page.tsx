import Link from 'next/link'
import SampleDataBanner from '@/components/layout/sample-data-banner'

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-col gap-6">
        <SampleDataBanner />

        <p className="text-sm font-semibold uppercase text-primary">About</p>
        <h1 className="font-display text-4xl font-extrabold text-on-surface md:text-5xl">
          Marked in Red is an in-progress MMIWG2S awareness map.
        </h1>

        <div className="space-y-5 text-base leading-8 text-on-surface-variant">
          <p>
            Marked in Red is being built as a public-interest map and case
            context tool for Missing and Murdered Indigenous Women, Girls, Two
            Spirit, and relatives. The goal is to make patterns easier to see
            while keeping the work grounded in care, consent, and source
            transparency.
          </p>
          <p>
            MMIWG2S describes a long-running crisis of violence,
            disappearance, under-investigation, and under-reporting affecting
            Indigenous communities across the United States and Canada. A map
            cannot tell the whole story, but it can help people understand the
            scale of the issue and find trusted paths to learn more.
          </p>
          <p>
            This is a demonstration build using sample data only. Real records
            are expected to be sourced from NamUs, the Canadian MMIWG database,
            and advocacy organizations once the project has the review,
            attribution, and community guidance needed to handle that data
            responsibly.
          </p>
          <p>
            Want to learn more or follow this issue? See our{' '}
            <Link
              href="/news"
              className="font-semibold text-primary underline-offset-4 hover:underline focus:underline"
            >
              News & Resources
            </Link>{' '}
            page.
          </p>
        </div>
      </div>
    </section>
  )
}
