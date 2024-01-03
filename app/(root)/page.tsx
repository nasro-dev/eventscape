import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/mongodb/actions/event.actions";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6
  })
  return (
    <>
       <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
         <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              From Anywhere to Everywhere – Your Events, Your Way            </h1>
            <p className="p-regular-20 md:p-regular-24 text-gray-800">
            Experience the ease of planning and managing events effortlessly, from webinars and conferences to social gatherings and celebrations.            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit bg-custom hover:bg-black">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>
          <Image 
             src="/assets/images/planet-3d.png"
             alt="hero"
             width={1000}
             height={1000}
             className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
         </div>
       </section>
       <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold"> Trusted by <br/> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* Search Section*/}
            {/* Category Filter */}
        </div>

        <Collection 
           data={events?.data}
           emptyTitle="No Events Found"
           emptyStateSubtext="Come Back Later"
           collectionType="All_Events"
           limit={6}
           page={1}
           totalPages={2}
        />

       </section>
    </>
        )
}
