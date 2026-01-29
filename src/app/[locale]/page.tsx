import { getEvents } from '@/lib/events'
import HomeClient from './HomeClient'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const events = await getEvents()
  
  return <HomeClient initialEvents={events} />
}
