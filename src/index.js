import { round } from 'lodash-es'
import puppeteer from 'puppeteer-core'
import { features as webFeatures } from 'web-features'
import { featuresMapping } from './features-mapping.js'
import { getUsageFromApi } from './features-api.js'

/** @param {string} url */
export async function testUrl(url) {
  const browser = await puppeteer.launch({
    headless: true,
    channel: 'chrome',
    args: ['--enable-blink-features=UseCounterReporting'],
  }) // non-headless for easier testing
  const [page] = await browser.pages()

  const client = await page.createCDPSession()
  await client.send('Page.enable')
  await page.goto(url, { waitUntil: ['load', 'networkidle2'] })
  await new Promise((resolve) => setTimeout(resolve, 3000)) // just in case

  const result = await client.send('Browser.getHistogram', {
    name: 'Blink.UseCounter.WebDXFeatures',
    delta: true,
  })

  await browser.close()

  const dxFeatureIds = result.histogram.buckets
    .map((bucket) => Number(bucket.low))
    .filter((id) => id > 0)
    .sort((a, b) => b - a)

  const apiUsage = await getUsageFromApi(dxFeatureIds)
  const features = []

  for (const dxFeatureId of dxFeatureIds) {
    const featureId = featuresMapping.get(dxFeatureId)
    if (!featureId) {
      console.error('Unknown feature id: %s', dxFeatureId)
      continue
    }
    const feature = /** @type {import('web-features/types.js').FeatureData} */ (webFeatures[featureId])
    if (!feature) {
      console.error('Missing feature info: %s', featureId)
      continue
    }

    features.push({
      id: featureId,
      name: feature.name || '-',
      status: feature.status.baseline || 'limited',
      usage: apiUsage[featureId] ? round(apiUsage[featureId] * 100, 1) : '-',
      desc: (feature.description || '-').slice(0, 100),
      dxId: dxFeatureId,
    })
  }
  return features
}
