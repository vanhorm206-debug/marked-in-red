import type { CaseStatus } from './types'

export const STATUS_COLORS: Record<CaseStatus, string> = {
  missing: '#dc2626',
  murdered: '#7f1d1d',
  found: '#ea580c',
  resolved: '#9ca3af',
}

export const STATUS_LABELS: Record<CaseStatus, string> = {
  missing: 'Missing',
  murdered: 'Murdered',
  found: 'Found',
  resolved: 'Resolved',
}

export const ADDITIONAL_INFO_LABELS: Record<string, string> = {
  physical_description: 'Physical Description',
  clothing_last_seen: 'Clothing When Last Seen',
  vehicle: 'Vehicle Information',
  distinguishing_marks: 'Distinguishing Marks',
  circumstances: 'Circumstances of Disappearance',
  investigating_agency: 'Investigating Agency',
  case_number: 'Case Number',
  contact_info: 'Contact for Tips',
}

export const DEFAULT_MAP_CENTER: [number, number] = [48.0, -100.0]
export const DEFAULT_MAP_ZOOM = 4
export const MIN_YEAR = 1950
export const MAX_EDITS_PER_HOUR = 10
export const NEW_ACCOUNT_THRESHOLD_HOURS = 24
