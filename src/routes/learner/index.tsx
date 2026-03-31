import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/learner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/learner/"!</div>
}
