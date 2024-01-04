import Eventform from '@/components/shared/Eventform'
import { getEventById } from '@/lib/mongodb/actions/event.actions';
import { auth } from '@clerk/nextjs';
import React from 'react'

type UpdateEventProps = {
  params: {
    id: string
  }
}
const UpdateEvent = async ({ params: {id}}: UpdateEventProps) => {
  
  const event = await getEventById(id)
  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string

  return (
    <>
      <section  className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h1 className="wrapper h3-bold text-center sm:text-left">
           Update Events
        </h1>
      </section>
      <div className='wrapper my-8'>
        <Eventform type="Update" userId={userId} event={event} eventId={event._id}/>
      </div>
    </>
    
  )
}

export default UpdateEvent