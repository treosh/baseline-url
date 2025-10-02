#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { testUrl } from './index.js'

// Configure and parse the command-line arguments.
const argv = yargs(hideBin(process.argv))
  .usage('Test any URL to see which baseline features are used')
  .example("baseline-url -o=json 'https://web.dev/'", 'Get features as JSON')
  .option('o', {
    alias: 'output',
    describe: 'Output format (json or text)',
    type: 'string', // The value of the option will be a string.
  })
  .demandCommand(1, 'You need to provide a URL')
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .parseSync()

const url = /** @type {string} */ (argv._[0])
const output = argv.o || 'text'

const features = await testUrl(url)
if (output === 'json') {
  console.log(JSON.stringify(features, null, 2))
} else {
  console.log('Found %o WebDX Features used on %s:', features.length, url)
  for (const f of features) {
    console.log('• %s - %o/%o - %s (%s)', f.id, f.status || 'limited', f.chromeUsage || '-', f.desc || '-', f.dxId)
  }
}

// console.log('test %s and output=%s', url, output)
// console.log('Found %o WebDXFeatures used on %s:', dxFeatureIds.length, url)
