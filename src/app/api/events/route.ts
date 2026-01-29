import { NextRequest, NextResponse } from 'next/server'
import { filterEvents, getEventById, getEvents } from '@/lib/events'
import type { MoroccoRegion, EventCategory } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const id = searchParams.get('id')
  if (id) {
    const event = getEventById(id)
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ event })
  }

  const query = searchParams.get('q') || undefined
  const region = searchParams.get('region') as MoroccoRegion | undefined
  const categories = searchParams.get('categories')?.split(',') as EventCategory[] | undefined
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const events = filterEvents({
    query,
    region,
    categories,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  })

  return NextResponse.json({
    count: events.length,
    events,
  })
}
