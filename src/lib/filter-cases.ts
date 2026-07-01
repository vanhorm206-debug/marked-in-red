import type { Case, MapFilters } from './types'

export function getMissingYear(item: Case): number {
  return Number(item.date_missing.slice(0, 4))
}

export function applyMapFilters(cases: Case[], filters: MapFilters): Case[] {
  const [minYear, maxYear] = filters.yearRange

  return cases.filter((item) => {
    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(item.status)

    const year = getMissingYear(item)
    const matchesYear = year >= minYear && year <= maxYear

    const matchesStateProvince =
      filters.stateProvince === null ||
      item.state_province === filters.stateProvince

    const matchesTribalNation =
      filters.tribalNation === null ||
      item.tribal_affiliation === filters.tribalNation

    const matchesAge =
      filters.ageRange === null ||
      (item.age_at_disappearance !== null &&
        item.age_at_disappearance >= filters.ageRange[0] &&
        item.age_at_disappearance <= filters.ageRange[1])

    return (
      matchesStatus &&
      matchesYear &&
      matchesStateProvince &&
      matchesTribalNation &&
      matchesAge
    )
  })
}

export function getStateProvinceOptions(cases: Case[]): string[] {
  return [...new Set(cases.map((item) => item.state_province))].sort((a, b) =>
    a.localeCompare(b)
  )
}
