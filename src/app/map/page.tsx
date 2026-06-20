import CasesMap from '@/components/map/cases-map'
import { getCases } from '@/lib/get-cases'

export default async function MapPage() {
  const cases = await getCases()

  return (
    <div className="bg-surface">
      <section className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10">
        <div className="border-l-4 border-primary bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface">
          Demonstration build. The points shown are sample data, not real cases.
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase text-primary">
            Awareness Map
          </p>
          <h1 className="font-display text-4xl font-extrabold text-on-surface md:text-5xl">
            Marked in Red
          </h1>
          <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
            A working demo map for understanding how MMIWG2S case information
            could be explored across the United States and Canada.
          </p>
        </div>

        <CasesMap cases={cases} />
      </section>
    </div>
  )
}
