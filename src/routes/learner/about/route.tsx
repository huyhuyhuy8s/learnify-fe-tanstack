import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/learner/about')({
  component: AboutLayout,
})

function AboutLayout() {
  return (
    // Outlet chính là nơi nội dung của index.tsx sẽ được chèn vào
    <Outlet />
  )
}