import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// Configure and parse the command-line arguments.
const argv = yargs(hideBin(process.argv))
  .usage('Test any URL for baseline features')
  .example("baseline-test -o=json 'https://web.dev/'", 'Get features as JSON')
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

const url = argv._[0]
const output = argv.o || 'text'

console.log('test %s and output=%s', url, output)
