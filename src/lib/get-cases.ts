import { createClient } from '@/lib/supabase/server'
import { sampleCases } from './sample-cases'
import type { Case } from './types'

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getCases(): Promise<Case[]> {
  if (!hasSupabaseConfig()) {
    return sampleCases
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('cases').select('*')

    if (error || !data || data.length === 0) {
      return sampleCases
    }

    return data as Case[]
  } catch {
    return sampleCases
  }
}

export async function getCaseById(id: string): Promise<Case | null> {
  if (!hasSupabaseConfig()) {
    return sampleCases.find((item) => item.id === id) ?? null
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) {
      return sampleCases.find((item) => item.id === id) ?? null
    }

    return data as Case
  } catch {
    return sampleCases.find((item) => item.id === id) ?? null
  }
}
