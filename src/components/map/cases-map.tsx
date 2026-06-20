'use client'

import dynamic from 'next/dynamic'
import type { Case } from '@/lib/types'

const LeafletCasesMap = dynamic(() => import('./leaflet-cases-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[68vh] min-h-[480px] items-center justify-center bg-surface-container-low text-sm font-medium text-on-surface-variant">
      Loading map...
    </div>
  ),
})

export default function CasesMap({ cases }: { cases: Case[] }) {
  return <LeafletCasesMap cases={cases} />
}
