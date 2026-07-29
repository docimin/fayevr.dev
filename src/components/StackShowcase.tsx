import { Code2, Cpu, Database, Layers } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { STACK, type StackGroup } from '@/data/stack'

const ICONS = {
  layers: Layers,
  code: Code2,
  database: Database,
  cpu: Cpu,
} satisfies Record<StackGroup['icon'], unknown>

export default function StackShowcase() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {STACK.map((group) => {
        const Icon = ICONS[group.icon]
        return (
          <TiltCard
            key={group.id}
            className="space-y-4 rounded-lg border bg-glass p-4 shadow-elevation-2 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b pb-2">
              <Icon className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-xl font-semibold">{group.name}</h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border bg-background px-4 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>
        )
      })}
    </div>
  )
}
