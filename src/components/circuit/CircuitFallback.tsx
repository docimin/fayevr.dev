const TRACES = [
  'M12 20 L12 88 L84 124 L84 220 L40 250 L40 340',
  'M128 -5 L128 52 L200 90 L200 205 L150 236 L150 340',
  'M292 16 L292 74 L232 106 L232 200 L272 228 L272 340',
  'M62 340 L62 300 L112 272 L112 150 L58 118 L58 -8',
  'M246 -6 L246 44 L166 88 L166 168',
]

const NODES = [
  { cx: 84, cy: 124, r: 4, delay: '0s' },
  { cx: 200, cy: 90, r: 4, delay: '.5s' },
  { cx: 112, cy: 150, r: 3, delay: '1s' },
  { cx: 232, cy: 106, r: 3, delay: '1.5s' },
  { cx: 166, cy: 168, r: 2.5, delay: '2s' },
]

export default function CircuitFallback({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none h-full w-full text-primary ${className}`}
      viewBox="0 0 300 340"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="circuit-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".85" />
          <stop offset="55%" stopColor="currentColor" stopOpacity=".3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#circuit-fade)" strokeWidth="1.4">
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="currentColor">
        {NODES.map((node) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className="circuit-node"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </g>
    </svg>
  )
}
