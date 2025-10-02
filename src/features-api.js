import { featuresMapping } from './features-mapping.js'

/** @param {number[]} dxFeatureIds */
export async function getUsageFromApi(dxFeatureIds) {
  const featureIds = dxFeatureIds.map((id) => featuresMapping.get(id)).filter(Boolean)
  // build: id:grid OR id:masks
  const query = featureIds.map((id) => `id:${id}`).join(' OR ')

  const res = await fetch(`https://api.webstatus.dev/v1/features?q=${encodeURIComponent(query)}`)
  const { data } = await res.json()
  // console.log(data[0])
  return Object.fromEntries(data.map(/** @param {any} f */ (f) => [f.feature_id, f.usage?.chrome?.daily ?? null]))
}

// daily stats api:
// https://api.webstatus.dev/v1/features/flexbox/stats/usage/chrome/daily_stats?startAt=2024-08-31&endAt=2025-09-30
