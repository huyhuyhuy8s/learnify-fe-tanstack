import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/learner/friends')({
  component: FriendsLayout,
})

function FriendsLayout() {
  return (
    // Outlet chính là nơi nội dung của index.tsx sẽ được chèn vào
    <Outlet />
  )
}