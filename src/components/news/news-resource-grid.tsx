'use client'

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

interface ResourceItem {
  name: string
  url: string
  description: string
  category: string
}

const CATEGORY_LABELS: Record<string, string> = {
  'Official databases & government offices': 'Official',
  'Advocacy & resource organizations': 'Advocacy',
  'Landmark reports & inquiries': 'Reports',
  'News & journalism': 'News',
}

function Icon({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function CategoryIcon({
  category,
  className,
}: {
  category: string
  className?: string
}) {
  switch (category) {
    case 'Advocacy & resource organizations':
      return (
        <Icon className={className}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z" />
        </Icon>
      )
    case 'Landmark reports & inquiries':
      return (
        <Icon className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
        </Icon>
      )
    case 'News & journalism':
      return (
        <Icon className={className}>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </Icon>
      )
    case 'Official databases & government offices':
    default:
      return (
        <Icon className={className}>
          <line x1="3" x2="21" y1="22" y2="22" />
          <line x1="6" x2="6" y1="18" y2="11" />
          <line x1="10" x2="10" y1="18" y2="11" />
          <line x1="14" x2="14" y1="18" y2="11" />
          <line x1="18" x2="18" y1="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </Icon>
      )
  }
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export default function NewsResourceGrid({
  resources,
  featuredUrl,
}: {
  resources: ResourceItem[]
  featuredUrl: string
}) {
  const categories = useMemo(() => {
    const seen: string[] = []
    for (const resource of resources) {
      if (!seen.includes(resource.category)) seen.push(resource.category)
    }
    return seen
  }, [resources])

  const [active, setActive] = useState<string>('All')

  const featured = useMemo(
    () => resources.find((resource) => resource.url === featuredUrl) ?? null,
    [resources, featuredUrl]
  )

  const showFeatured = active === 'All' && featured !== null

  const gridResources = useMemo(() => {
    const base =
      active === 'All'
        ? resources
        : resources.filter((resource) => resource.category === active)
    return showFeatured
      ? base.filter((resource) => resource.url !== featuredUrl)
      : base
  }, [resources, active, showFeatured, featuredUrl])

  const tabs = ['All', ...categories]

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Filter resources by category"
        className="flex flex-wrap gap-1 self-start rounded-full border border-outline-variant/50 bg-surface-container-low p-1"
      >
        {tabs.map((tab) => {
          const selected = active === tab
          const label = tab === 'All' ? 'All' : CATEGORY_LABELS[tab] ?? tab
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab)}
              className={
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors ' +
                (selected
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface')
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      {showFeatured && featured ? (
        <a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid overflow-hidden rounded-2xl border border-outline-variant/60 bg-white transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 lg:grid-cols-12"
        >
          <div className="flex flex-col justify-center gap-4 p-8 lg:col-span-7 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                Featured
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                {CATEGORY_LABELS[featured.category] ?? featured.category}
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold leading-tight text-on-surface transition-colors group-hover:text-primary md:text-3xl">
              {featured.name}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-on-surface-variant">
              {featured.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Visit site
              <ExternalIcon className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
          <div className="flex items-center justify-center bg-primary/5 p-10 lg:col-span-5">
            <CategoryIcon
              category={featured.category}
              className="h-16 w-16 text-primary/70"
            />
          </div>
        </a>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {gridResources.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 rounded-xl border border-outline-variant/60 bg-white p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
              <CategoryIcon category={item.category} className="h-6 w-6" />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
                {CATEGORY_LABELS[item.category] ?? item.category}
              </span>
              <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                {item.name}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                Visit site
                <ExternalIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
