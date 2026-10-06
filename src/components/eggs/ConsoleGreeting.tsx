import { useEffect } from 'react'

const ART = `
  __
 / _| __ _ _   _  ___
| |_ / _\` | | | |/ _ \\
|  _| (_| | |_| |  __/
|_|  \\__,_|\\__, |\\___|
           |___/
`

const HINTS = [
  'oh hi, you opened the console. there are secrets on this site:',
  '  - the braces on the home page are load-bearing',
  '  - the search palette understands a few shell commands',
  '  - bring a light to /light when it is dark',
  '  - curl fayevr.dev',
  '  - I would not order /coffee here',
].join('\n')

export default function ConsoleGreeting() {
  useEffect(() => {
    console.log(`%c${ART}`, 'color: #f97316; font-family: monospace')
    console.log(HINTS)
  }, [])

  return null
}
