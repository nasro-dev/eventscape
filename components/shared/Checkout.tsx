import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { IEvent } from '@/lib/mongodb/models/event.model'

// Stripe config
import { loadStripe} from '@stripe/stripe-js'
import { checkoutOrder } from '@/lib/mongodb/actions/order.actions'
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = ({event, userId}:{event:IEvent, userId: string}) => {
  
  // useEffect - stripe
  useEffect(()=>{
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.')
    }
    
    if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you are ready')
    }
  }, [])

  //
  const onCheckout = async () => {
   const order   = {
    eventTitle: event.title,
    eventId: event._id,
    price: event.price,
    isfree: event.isfree,
    buyerId: userId
   } 
  
   await checkoutOrder(order) 
  }
  return (
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
            {event.isfree ? 'Get Ticket':'Buy Ticket'}
        </Button>
    </form>
  )
}

export default Checkout