'use client'

import 'leaflet/dist/leaflet.css'

import { useEffect, useState } from 'react'
import type { GeoJsonObject } from 'geojson'
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Pane,
  Popup,
  TileLayer,
} from 'react-leaflet'
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/lib/constants'
import type { Case } from '@/lib/types'

const CARTODB_POSITRON_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> | Boundary sources: US Census Bureau (cartographic boundary files); Natural Resources Canada / Open Government Licence - Canada'

const BOUNDARY_SOURCES = [
  {
    id: 'us',
    url: '/data/reservation-boundaries-us-2025.geojson',
  },
  {
    id: 'ca',
    url: '/data/reservation-boundaries-ca-2025.geojson',
  },
] as const

const BOUNDARY_PANE = 'reservation-boundaries'

const BOUNDARY_STYLE = {
  color: '#64748b',
  fillColor: '#b8a77a',
  fillOpacity: 0.08,
  opacity: 0.72,
  weight: 1,
}

type BoundarySourceId = (typeof BOUNDARY_SOURCES)[number]['id']
type BoundaryData = Partial<Record<BoundarySourceId, GeoJsonObject>>

export default function LeafletCasesMap({ cases }: { cases: Case[] }) {
  const [showBoundaries, setShowBoundaries] = useState(false)
  const [panelExpanded, setPanelExpanded] = useState(false)
  const [boundaryData, setBoundaryData] = useState<BoundaryData>({})
  const [failedBoundarySources, setFailedBoundarySources] = useState<
    BoundarySourceId[]
  >([])
  const [isLoadingBoundaries, setIsLoadingBoundaries] = useState(false)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const geocodedCases = cases.filter(
    (item) => item.latitude !== null && item.longitude !== null
  )

  useEffect(() => {
    if (!showBoundaries) {
      setIsLoadingBoundaries(false)
      return
    }

    const missingSources = BOUNDARY_SOURCES.filter(
      (source) => boundaryData[source.id] === undefined
    )

    if (missingSources.length === 0) {
      return
    }

    let cancelled = false

    async function loadBoundaries() {
      setIsLoadingBoundaries(true)

      const results = await Promise.allSettled(
        missingSources.map(async (source) => {
          const response = await fetch(source.url)

          if (!response.ok) {
            throw new Error(`Failed to load ${source.url}`)
          }

          return {
            id: source.id,
            data: (await response.json()) as GeoJsonObject,
          }
        })
      )

      if (cancelled) {
        return
      }

      const loadedData: BoundaryData = {}
      const failedSources: BoundarySourceId[] = []

      results.forEach((result, index) => {
        const sourceId = missingSources[index].id

        if (result.status === 'fulfilled') {
          loadedData[sourceId] = result.value.data
        } else {
          failedSources.push(sourceId)
        }
      })

      setBoundaryData((currentData) => ({
        ...currentData,
        ...loadedData,
      }))
      setFailedBoundarySources(failedSources)
      setIsLoadingBoundaries(false)
    }

    void loadBoundaries()

    return () => {
      cancelled = true
    }
  }, [loadAttempt, showBoundaries])

  const boundaryLayers = BOUNDARY_SOURCES.flatMap((source) => {
    const data = boundaryData[source.id]

    return data === undefined
      ? []
      : [
          <GeoJSON
            key={source.id}
            data={data}
            interactive={false}
            pane={BOUNDARY_PANE}
            style={BOUNDARY_STYLE}
          />,
        ]
  })

  const handleBoundaryToggle = () => {
    setShowBoundaries((currentValue) => {
      const nextValue = !currentValue

      if (nextValue) {
        setLoadAttempt((currentAttempt) => currentAttempt + 1)
      }

      return nextValue
    })
  }

  return (
    <div className="relative h-[68vh] min-h-[480px] overflow-hidden border border-outline-variant/50 bg-surface-container-low">
      <div className="absolute right-3 top-3 z-[1000] max-w-[min(22rem,calc(100%-1.5rem))]">
        {panelExpanded ? (
          <div className="rounded-md border border-outline-variant/60 bg-surface/95 px-3 py-2 text-on-surface shadow-sm backdrop-blur">
            <div className="flex items-start justify-between gap-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={showBoundaries}
                  onChange={handleBoundaryToggle}
                  className="h-4 w-4 accent-primary"
                />
                <span>Show reservation/reserve boundaries</span>
              </label>
              {!showBoundaries && (
                <button
                  type="button"
                  onClick={() => setPanelExpanded(false)}
                  aria-label="Collapse boundary controls"
                  className="-mr-1 -mt-0.5 shrink-0 rounded p-1 text-on-surface-variant hover:bg-on-surface/5"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path
                      d="M6 12l4-4 4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-1 text-xs leading-snug text-on-surface-variant">
              Current administrative/statistical boundary datasets. Not ancestral
              or traditional territories; not legal land descriptions.
            </p>
            {showBoundaries &&
              (isLoadingBoundaries || failedBoundarySources.length > 0) && (
                <div className="mt-1 text-xs font-medium text-on-surface-variant">
                  {isLoadingBoundaries && <span>Loading boundary data...</span>}
                  {failedBoundarySources.length > 0 && (
                    <span>Some boundary data could not load.</span>
                  )}
                </div>
              )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPanelExpanded(true)}
            aria-label="Show reservation/reserve boundary controls"
            className="flex items-center gap-1.5 rounded-md border border-outline-variant/60 bg-surface/95 px-2.5 py-1.5 text-sm font-medium text-on-surface shadow-sm backdrop-blur hover:bg-surface"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M10 3l7 4-7 4-7-4 7-4z" strokeLinejoin="round" />
              <path
                d="M3 11l7 4 7-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Boundaries</span>
          </button>
        )}
      </div>
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        preferCanvas
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution={CARTODB_POSITRON_ATTRIBUTION}
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Pane name={BOUNDARY_PANE} style={{ zIndex: 350 }}>
          {showBoundaries && boundaryLayers}
        </Pane>

        {geocodedCases.map((item) => (
          <CircleMarker
            key={item.id}
            center={[item.latitude as number, item.longitude as number]}
            pathOptions={{
              color: STATUS_COLORS[item.status],
              fillColor: STATUS_COLORS[item.status],
              fillOpacity: 0.78,
              opacity: 1,
              weight: 2,
            }}
            radius={9}
          >
            <Popup>
              <div className="space-y-2">
                <p className="font-semibold text-on-surface">{item.name}</p>
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  {STATUS_LABELS[item.status]}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  {item.location_name}, {item.state_province}
                </p>
                <p className="max-w-64">{item.summary}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
