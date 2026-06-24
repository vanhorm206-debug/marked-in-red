import Link from 'next/link'
import SampleDataBanner from '@/components/layout/sample-data-banner'

export default function Home() {
  return (
    <section className="bg-surface">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-[1440px] flex-col justify-center gap-10 px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase text-primary">
            MMIWG2S Awareness
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-on-surface md:text-7xl">
            Marked in Red
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-on-surface-variant">
            An interactive awareness map for understanding MMIWG2S cases across
            the United States and Canada.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Link
            href="/map"
            className="inline-flex w-fit items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
          >
            Open the map
          </Link>
          <SampleDataBanner />
        </div>

        <div className="grid gap-4 border-t border-outline-variant/50 pt-8 text-sm text-on-surface-variant md:grid-cols-3">
          <p>
            Sample records are clearly labeled and do not represent real
            people.
          </p>
          <p>
            The map uses status colors to show how a future source-backed
            experience could work.
          </p>
          <p>
            Real data handling will require careful source review and community
            guidance.
          </p>
        </div>
      </div>
    </section>
  )
}
