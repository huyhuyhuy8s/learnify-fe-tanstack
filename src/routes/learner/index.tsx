import { createFileRoute } from '@tanstack/react-router';
import TextButton from '@/components/TextButton';
import './home.scss';

export const Route = createFileRoute('/learner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="home">

    </div>
  )
}
