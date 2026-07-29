import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/suggestions-bot/')({
  head: () => ({ meta: [{ title: 'Suggestions Bot | Faye' }] }),
  component: Suggestions,
})

function Suggestions() {
  return <main className="flex relative w-full h-full overflow-hidden">hi</main>
}
