import LeftNav from '@/components/LeftNav'
import TopNav from '@/components/TopNav'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/learner')({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Learnify for Learner"
      }
    ]
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <LeftNav />
    <div className="body">
      <header>
        <TopNav />
      </header>
      <article className="content">
        <Outlet />
      </article>
      <footer>
      </footer>
    </div>
  </>
}
