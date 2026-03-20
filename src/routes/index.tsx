import { createFileRoute } from '@tanstack/react-router'
import IconButton from '../components/IconButton/'
import '@styles/_global.scss';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <IconButton name="home" fill={true}/>
    </div>
  )
}
