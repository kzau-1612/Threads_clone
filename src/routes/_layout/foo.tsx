import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/foo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_hidden/_layout/foo"!</div>
}
