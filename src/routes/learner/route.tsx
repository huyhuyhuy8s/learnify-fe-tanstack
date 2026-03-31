import LeftNav from '@/components/LeftNav'
import TopNav from '@/components/TopNav'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import Footer from '@/components/Footer'
import './style.scss';

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
  return (
    <>
      <LeftNav />
      <article className="body">
        <TopNav />
        <div className="inner">
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </article>
    </>
  )
}
