'use client'

import 'leaflet/dist/leaflet.css'

import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/lib/constants'
import type { Case } from '@/lib/types'

const CARTODB_POSITRON_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export default function LeafletCasesMap({ cases }: { cases: Case[] }) {
  const geocodedCases = cases.filter(
    (item) => item.latitude !== null && item.longitude !== null
  )

  return (
    <div className="h-[68vh] min-h-[480px] overflow-hidden border border-outline-variant/50 bg-surface-container-low">
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution={CARTODB_POSITRON_ATTRIBUTION}
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

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
