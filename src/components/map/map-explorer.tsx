'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import CasesMap from '@/components/map/cases-map'
import {
  applyMapFilters,
  getStateProvinceOptions,
} from '@/lib/filter-cases'
import { MIN_YEAR, STATUS_LABELS } from '@/lib/constants'
import type { Case, CaseStatus, MapFilters } from '@/lib/types'

const ALL_STATUSES: CaseStatus[] = ['missing', 'murdered', 'found', 'resolved']

const CURRENT_YEAR = new Date().getFullYear()

const INITIAL_FILTERS: MapFilters = {
  statuses: [],
  yearRange: [MIN_YEAR, CURRENT_YEAR],
  stateProvince: null,
  tribalNation: null,
  ageRange: null,
}

const YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, index) => MIN_YEAR + index
)

export default function MapExplorer({ cases }: { cases: Case[] }) {
  const [filters, setFilters] = useState<MapFilters>(INITIAL_FILTERS)

  const stateProvinceOptions = useMemo(
    () => getStateProvinceOptions(cases),
    [cases]
  )

  const filteredCases = useMemo(
    () => applyMapFilters(cases, filters),
    [cases, filters]
  )

  const geocodedCount = filteredCases.filter(
    (item) => item.latitude !== null && item.longitude !== null
  ).length
  const unmappedCount = filteredCases.length - geocodedCount

  const filtersActive =
    filters.statuses.length > 0 ||
    filters.stateProvince !== null ||
    filters.yearRange[0] !== MIN_YEAR ||
    filters.yearRange[1] !== CURRENT_YEAR

  function toggleStatus(status: CaseStatus) {
    setFilters((current) => ({
      ...current,
      statuses: current.statuses.includes(status)
        ? current.statuses.filter((item) => item !== status)
        : [...current.statuses, status],
    }))
  }

  function updateYearRange(bound: 'from' | 'to', value: number) {
    setFilters((current) => {
      const [from, to] = current.yearRange

      if (bound === 'from') {
        return { ...current, yearRange: [value, Math.max(value, to)] }
      }

      return { ...current, yearRange: [Math.min(from, value), value] }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 border border-outline-variant/50 bg-white p-4 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-on-surface">
            Filter by status
          </legend>
          <div className="flex flex-wrap gap-3">
            {ALL_STATUSES.map((status) => (
              <label
                key={status}
                className="inline-flex items-center gap-2 text-sm text-on-surface"
              >
                <input
                  type="checkbox"
                  checked={filters.statuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className="h-4 w-4 accent-primary"
                />
                {STATUS_LABELS[status]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-on-surface">
            Year missing
          </p>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="map-year-from">
              From year
            </label>
            <select
              id="map-year-from"
              value={filters.yearRange[0]}
              onChange={(event) =>
                updateYearRange('from', Number(event.target.value))
              }
              className="border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span className="text-sm text-on-surface-variant">to</span>
            <label className="sr-only" htmlFor="map-year-to">
              To year
            </label>
            <select
              id="map-year-to"
              value={filters.yearRange[1]}
              onChange={(event) =>
                updateYearRange('to', Number(event.target.value))
              }
              className="border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="map-state-province"
            className="text-sm font-semibold text-on-surface"
          >
            State / province
          </label>
          <select
            id="map-state-province"
            value={filters.stateProvince ?? ''}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                stateProvince:
                  event.target.value === '' ? null : event.target.value,
              }))
            }
            className="w-full border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary md:w-40"
          >
            <option value="">All</option>
            {stateProvinceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setFilters(INITIAL_FILTERS)}
          disabled={!filtersActive}
          className="border border-outline-variant px-3 py-2 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>

      <p className="text-sm font-semibold text-on-surface-variant">
        Showing {geocodedCount} of {cases.length} cases on the map.
        {unmappedCount > 0 ? (
          <>
            {' '}
            {unmappedCount} matching{' '}
            {unmappedCount === 1 ? 'case lacks' : 'cases lack'} coordinates and{' '}
            {unmappedCount === 1 ? 'appears' : 'appear'} only in the{' '}
            <Link
              href="/list"
              className="text-primary underline-offset-4 hover:underline focus:underline"
            >
              case list
            </Link>
            .
          </>
        ) : null}
      </p>

      <CasesMap cases={filteredCases} />
    </div>
  )
}
