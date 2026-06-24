import type { Metadata } from 'next'
import SampleDataBanner from '@/components/layout/sample-data-banner'
import { RESOURCE_CATEGORIES } from '@/lib/resources'

export const metadata: Metadata = {
  title: 'News & Resources — Marked in Red',
  description:
    'Curated external MMIWG2S awareness resources for the Marked in Red demonstration build.',
}

export default function NewsPage() {
  return (
    <div className="bg-surface">
      <section className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10">
        <SampleDataBanner />

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase text-primary">
            External Awareness Resources
          </p>
          <h1 className="font-display text-4xl font-extrabold text-on-surface md:text-5xl">
            News & Resources
          </h1>
          <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
            These are trusted external places to learn more about and follow
            MMIWG2S issues. They are independent third-party sites, and this
            demo itself uses sample data only.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {RESOURCE_CATEGORIES.map((resourceCategory) => (
            <section
              key={resourceCategory.category}
              aria-labelledby={`resources-${resourceCategory.category
                .toLowerCase()
                .replaceAll(/[^a-z0-9]+/g, '-')}`}
              className="space-y-4 border border-outline-variant/50 bg-white p-5"
            >
              <h2
                id={`resources-${resourceCategory.category
                  .toLowerCase()
                  .replaceAll(/[^a-z0-9]+/g, '-')}`}
                className="font-display text-2xl font-extrabold text-on-surface"
              >
                {resourceCategory.category}
              </h2>

              <ul className="space-y-4">
                {resourceCategory.links.map((resource) => (
                  <li
                    key={resource.url}
                    className="border-l-4 border-primary bg-surface-container-low px-4 py-3"
                  >
                    <a
                      href={resource.url}
                      className="text-base font-semibold text-primary underline-offset-4 hover:underline focus:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {resource.name}
                    </a>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                      {resource.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
