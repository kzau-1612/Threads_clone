import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(auth-layout)/_auth-layout/auth/google/callback',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth-layout)/_auth-layout/auth/google/callback"!</div>
}
