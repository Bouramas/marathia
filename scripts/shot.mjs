// Headless-Chrome screenshot helper for visual verification against the live site.
// Renders a route from the local preview server (SPA needs JS, so we wait) and
// writes a PNG. Uses the DevTools protocol so mobile widths actually reflow —
// Chrome on macOS has a ~500px minimum WINDOW width, so --window-size=390 crops
// instead of reflowing; Emulation.setDeviceMetricsOverride is the fix.
//
// Usage:
//   npm run preview            # in another shell (note the port)
//   node scripts/shot.mjs <url> <out.png> [width] [height] [scrollY]
// Example:
//   node scripts/shot.mjs http://localhost:4173/about/i-filosofia-mas /tmp/p.png 1440 1200
//   node scripts/shot.mjs http://localhost:4173/ /tmp/m.png 390 844        # true mobile

import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const [url, out, width = '1440', height = '1200', scrollY = '0'] = process.argv.slice(2)
if (!url || !out) {
  console.error('usage: node scripts/shot.mjs <url> <out.png> [width] [height] [scrollY]')
  process.exit(1)
}

const port = 9400 + Math.floor(Math.random() * 500)
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, 'about:blank'])
await new Promise((r) => setTimeout(r, 1800))

const list = await (await fetch(`http://localhost:${port}/json`)).json()
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl)
let id = 0
const pend = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
await new Promise((r) => (ws.onopen = r))

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(width), height: Number(height), deviceScaleFactor: 2, mobile: Number(width) < 768,
})
await send('Page.navigate', { url })
await new Promise((r) => setTimeout(r, 5000)) // SPA render + fonts + video poster
if (Number(scrollY) > 0) {
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${Number(scrollY)})` })
  await new Promise((r) => setTimeout(r, 1000))
}
const shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
console.log('saved', out)
chrome.kill()
process.exit(0)
