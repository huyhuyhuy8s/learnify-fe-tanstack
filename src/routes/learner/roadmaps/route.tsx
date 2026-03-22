import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/learner/roadmaps')({
  component: RoadmapsLayout,
})

function RoadmapsLayout() {
  return (
    // Outlet chính là nơi nội dung của index.tsx sẽ được chèn vào
    <Outlet />
  )
}