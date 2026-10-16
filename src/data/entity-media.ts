import registry from './entity-media.json'

type Media = { src: string; background?: string }
const people: Record<string, Media> = registry.people
const companies: Record<string, Media> = registry.companies
const brands: Record<string, Media> = registry.brands

// Resolve by observed record ID, never by initials or a matching display name.
export const personImage = (id?: string | null) => (id ? people[id]?.src : undefined)
export const companyImage = (id?: string | null) => (id ? companies[id]?.src : undefined)
export const brandImage = (id?: string | null) => (id ? brands[id]?.src : undefined)
export const brandBackground = (id?: string) => (id ? brands[id]?.background : undefined)
