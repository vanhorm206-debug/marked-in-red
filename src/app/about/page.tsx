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

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            How to read the map
          </h2>
          <div className="space-y-4 text-base leading-8 text-on-surface-variant">
            <p>Each point on the map is one case record, colored by status:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-on-surface">Missing</strong>: the
                person has not been located.
              </li>
              <li>
                <strong className="text-on-surface">Murdered</strong>: the
                source record identifies the case as a homicide.
              </li>
              <li>
                <strong className="text-on-surface">Found</strong>: the person
                has been located; source records vary in what that means.
              </li>
              <li>
                <strong className="text-on-surface">Resolved</strong>: the case
                is closed or otherwise resolved in the source record.
              </li>
            </ul>
            <p>
              These categories are provisional for the demonstration build.
              When real records are added, status definitions will follow the
              source databases and the community guidance this project is
              seeking, and each case page will name its sources.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            Data sources & attribution
          </h2>
          <div className="space-y-4 text-base leading-8 text-on-surface-variant">
            <p>
              Case points are currently fictional sample records, clearly
              labeled as such throughout the site.
            </p>
            <p>
              The optional reservation/reserve boundary overlay uses two public
              datasets: United States boundaries come from the{' '}
              <a
                href="https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html"
                className="font-semibold text-primary underline-offset-4 hover:underline focus:underline"
              >
                US Census Bureau 2025 cartographic boundary files
              </a>{' '}
              (American Indian / Alaska Native / Native Hawaiian areas, public
              domain), and Canadian boundaries come from Natural Resources
              Canada&apos;s Aboriginal Lands of Canada Legislative Boundaries
              dataset, used under the{' '}
              <a
                href="https://open.canada.ca/en/open-government-licence-canada"
                className="font-semibold text-primary underline-offset-4 hover:underline focus:underline"
              >
                Open Government Licence - Canada
              </a>
              . Both layers are simplified for fast loading on the web.
            </p>
            <p>
              The basemap is &copy; OpenStreetMap contributors and &copy;
              CARTO.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            Limitations
          </h2>
          <div className="space-y-4 text-base leading-8 text-on-surface-variant">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Every case point shown today is fictional. No real records are
                displayed until sourcing, attribution, and community review are
                in place.
              </li>
              <li>
                The boundary overlay shows current administrative and
                statistical boundaries only. It does not represent ancestral or
                traditional territories, and it is not a legal land
                description.
              </li>
              <li>
                Boundary geometry is intentionally simplified for performance
                and should not be used for precise location work.
              </li>
              <li>
                Real-world MMIWG2S data undercounts the crisis. Reporting gaps,
                racial misclassification, and jurisdictional complexity mean
                any map is a partial view, never the full story.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
