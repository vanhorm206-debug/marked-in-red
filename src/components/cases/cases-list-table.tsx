'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/lib/constants'
import type {
  Case,
  CaseFilters,
  CaseSortField,
  CaseStatus,
  Country,
  SortDirection,
} from '@/lib/types'

const ALL_STATUSES: CaseStatus[] = ['missing', 'murdered', 'found', 'resolved']
const ALL_COUNTRIES: Country[] = ['US', 'CA']

const INITIAL_FILTERS: CaseFilters = {
  query: '',
  statuses: [],
  countries: [],
  sortField: 'date_missing',
  sortDirection: 'desc',
  yearRange: [1950, new Date().getFullYear()],
  stateProvince: null,
  tribalNation: null,
  ageRange: null,
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

function formatLocation(item: Case) {
  return `${item.location_name}, ${item.state_province}, ${item.country}`
}

function compareCases(
  first: Case,
  second: Case,
  field: CaseSortField,
  direction: SortDirection
) {
  const multiplier = direction === 'asc' ? 1 : -1

  if (field === 'date_missing') {
    return (
      (new Date(first.date_missing).getTime() -
        new Date(second.date_missing).getTime()) *
      multiplier
    )
  }

  return first.name.localeCompare(second.name) * multiplier
}

export default function CasesListTable({ cases }: { cases: Case[] }) {
  const [filters, setFilters] = useState<CaseFilters>(INITIAL_FILTERS)

  const filteredCases = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    return cases
      .filter((item) => {
        const matchesQuery =
          query.length === 0 ||
          item.name.toLowerCase().includes(query) ||
          formatLocation(item).toLowerCase().includes(query)
        const matchesStatus =
          filters.statuses.length === 0 ||
          filters.statuses.includes(item.status)
        const matchesCountry =
          filters.countries.length === 0 ||
          filters.countries.includes(item.country)

        return matchesQuery && matchesStatus && matchesCountry
      })
      .toSorted((first, second) =>
        compareCases(
          first,
          second,
          filters.sortField,
          filters.sortDirection
        )
      )
  }, [cases, filters])

  function updateFilter(nextFilters: Partial<CaseFilters>) {
    setFilters((current) => ({ ...current, ...nextFilters }))
  }

  function toggleStatus(status: CaseStatus) {
    updateFilter({
      statuses: filters.statuses.includes(status)
        ? filters.statuses.filter((item) => item !== status)
        : [...filters.statuses, status],
    })
  }

  function toggleCountry(country: Country) {
    updateFilter({
      countries: filters.countries.includes(country)
        ? filters.countries.filter((item) => item !== country)
        : [...filters.countries, country],
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 border border-outline-variant/50 bg-white p-4 md:grid-cols-[minmax(16rem,1fr)_auto_auto] md:items-end">
        <div className="space-y-2">
          <label
            htmlFor="case-search"
            className="text-sm font-semibold text-on-surface"
          >
            Search cases
          </label>
          <input
            id="case-search"
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter({ query: event.target.value })}
            placeholder="Search by name or location"
            className="w-full border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="case-sort"
            className="text-sm font-semibold text-on-surface"
          >
            Sort by
          </label>
          <select
            id="case-sort"
            value={`${filters.sortField}:${filters.sortDirection}`}
            onChange={(event) => {
              const [sortField, sortDirection] = event.target.value.split(
                ':'
              ) as [CaseSortField, SortDirection]
              updateFilter({ sortField, sortDirection })
            }}
            className="w-full border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary md:w-52"
          >
            <option value="date_missing:desc">Date missing, newest</option>
            <option value="date_missing:asc">Date missing, oldest</option>
            <option value="name:asc">Name, A to Z</option>
            <option value="name:desc">Name, Z to A</option>
          </select>
        </div>

        <p className="text-sm font-semibold text-on-surface-variant">
          Showing {filteredCases.length} of {cases.length}
        </p>
      </div>

      <div className="grid gap-4 border border-outline-variant/50 bg-white p-4 md:grid-cols-2">
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

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-on-surface">
            Filter by country
          </legend>
          <div className="flex flex-wrap gap-3">
            {ALL_COUNTRIES.map((country) => (
              <label
                key={country}
                className="inline-flex items-center gap-2 text-sm text-on-surface"
              >
                <input
                  type="checkbox"
                  checked={filters.countries.includes(country)}
                  onChange={() => toggleCountry(country)}
                  className="h-4 w-4 accent-primary"
                />
                {country}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="overflow-x-auto border border-outline-variant/50 bg-white">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Fictional sample case records with status, affiliation, location,
            date missing, and age.
          </caption>
          <thead className="bg-surface-container-low text-on-surface">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Tribal affiliation
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Location
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Date missing
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Age
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {filteredCases.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-low/60">
                <th scope="row" className="px-4 py-4 font-semibold">
                  <Link
                    href={`/case/${item.id}`}
                    className="text-primary underline-offset-4 hover:underline focus:underline"
                  >
                    {item.name}
                  </Link>
                </th>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[item.status] }}
                      aria-hidden="true"
                    />
                    {STATUS_LABELS[item.status]}
                  </span>
                </td>
                <td className="px-4 py-4">{item.tribal_affiliation}</td>
                <td className="px-4 py-4">{formatLocation(item)}</td>
                <td className="px-4 py-4">{formatDate(item.date_missing)}</td>
                <td className="px-4 py-4">
                  {item.age_at_disappearance ?? 'Not listed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCases.length === 0 ? (
          <p className="border-t border-outline-variant/40 px-4 py-6 text-sm font-medium text-on-surface-variant">
            No sample cases match the current filters.
          </p>
        ) : null}
      </div>
    </div>
  )
}
