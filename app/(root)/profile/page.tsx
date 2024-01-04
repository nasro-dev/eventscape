import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/mongodb/actions/event.actions'
import { IOrder } from '@/lib/mongodb/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string

  const ordersPage = Number(searchParams?.ordersPage) || 1
  const eventsPage = Number(searchParams?.eventsPage) || 1

  const organizedEvents = await getEventsByUser({userId, page:eventsPage})
  // orders ticket 
  const orders = await getOrdersByUser({ userId, page: ordersPage})

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []

  

  return (
    <>
      {/* My Tickets */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
         <div className='wrapper flex items-center justify-center sm:jusify-between'>
            <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
            <Button asChild size='lg' className='button hidden sm:flex'>
                <Link href="/#events">Explore More Events</Link>
            </Button>
         </div>
      </section>

      <section className='wrapper m-8'>
            <Collection 
                data={orderedEvents?.data}
                emptyTitle="No event tickets purchased yet"
                emptyStateSubtext="No woorries - plenty of exciting to explore!"
                collectionType="My_Tickets"
                limit={3}
                page={ordersPage}
                urlParamName='ordersPage'
                totalPages={orders?.totalPages}
                />
       </section>

      {/* Events Organized */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
         <div className='wrapper flex items-center justify-center sm:jusify-between'>
            <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link href="/events/create">Create New Event</Link>
            </Button>
         </div>
      </section>
       
     <section className='wrapper m-8'>
            <Collection 
                data={organizedEvents ?.data}
                emptyTitle="No events have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Events_Organized"
                limit={3}
                page={eventsPage}
                urlParamName='eventsPage'
                totalPages={organizedEvents?.totalPages}
                />
       </section>
    </>
  )
}

export default ProfilePage