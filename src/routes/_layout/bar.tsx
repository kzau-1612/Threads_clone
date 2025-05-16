import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/bar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_hidden/_layout/bar"!</div>
}
