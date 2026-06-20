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
