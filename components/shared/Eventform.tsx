"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
}  from "@/components/ui/form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { eventformSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { FileUploader } from "./Fileuploader"
import { useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/mongodb/actions/event.actions"
import { IEvent } from "@/lib/mongodb/models/event.model"
type EventformProps = {
    userId: string
    type: "Create" | "Update"
    event?: IEvent
    eventId?: string
}

const Eventform = ({ userId, type ,event , eventId}: EventformProps ) => {
    const initialValues = event && type === 'Update' ? 
    {...event, 
    startDateTime: new Date(event.startDateTime),
    endDateTime: new Date(event.endDateTime)}:eventDefaultValues

    const eventform = useForm<z.infer<typeof eventformSchema>>({
        resolver: zodResolver(eventformSchema),
        defaultValues: initialValues
    })

    const router  = useRouter()
    const { startUpload } = useUploadThing('imageUploader')
    async function onSubmit(values: z.infer<typeof eventformSchema>){
        {/*form submit function*/}
        const eventData = values
        let uploadImageUrl = values.imageUrl;
        if (files.length > 0){
            const uploadedImages = await startUpload(files)
            if(!uploadedImages){
                return
            }
            uploadImageUrl = uploadedImages[0].url
        }
        //Create
        if(type == 'Create'){
            try {
                const newEvent = createEvent({
                    event: { ...values, imageUrl: uploadImageUrl},
                    userId,
                    path: '/profile'
                })

                if(newEvent){
                    eventform.reset()
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        //Update
        if(type == 'Update'){
            if(!eventId){
                router.back()
                return
            }
            try {
                const updatedEvent = await updateEvent({
                    event: { ...values, imageUrl: uploadImageUrl ,_id},
                    userId,
                    eventId,
                    path: `/events/${eventId}`
                })

                if(updatedEvent){
                    eventform.reset()
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const [files, setfiles] = useState<File[]>([])

  return (
    <Form {...eventform}>
        <form onSubmit={eventform.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={eventform.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                            <Input placeholder="Give an event title" {...field} className="input-field"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={eventform.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                            <Dropdown onChangeHandler={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                        control={eventform.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full ">
                                <FormControl className="h-52">
                                <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />         
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                        control={eventform.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full ">
                                <FormControl className="h-52">
                                    <FileUploader 
                                       onFieldChange={field.onChange}
                                       imageUrl={field.value}
                                       setFiles={setfiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                        control={eventform.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full 
                                      overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                          src="/assets/icons/location-grey.svg"
                                          alt="location"
                                          width={24}
                                          height={24}
                                        />
                                        <Input placeholder="Event location" {...field} className="input-field"/>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                        control={eventform.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full 
                                      overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                          src="/assets/icons/calendar.svg"
                                          alt="calendar"
                                          width={24}
                                          height={24}
                                          className="filter-gray"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-600">Event start date:</p>
                                        <DatePicker selected={field.value} 
                                        onChange={(date: Date) => field.onChange(date)}
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="datePicker" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <FormField
                        control={eventform.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full 
                                      overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                          src="/assets/icons/calendar.svg"
                                          alt="calendar"
                                          width={24}
                                          height={24}
                                          className="filter-gray"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-600">Event end date:</p>
                                        <DatePicker selected={field.value} 
                                        onChange={(date: Date) => field.onChange(date)}
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="datePicker" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
                        control={eventform.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full 
                                      overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                          src="/assets/icons/dollar.svg"
                                          alt="dollar"
                                          width={24}
                                          height={24}
                                          className="filter-gray"
                                        />
                                        <Input type="number" placeholder="Price" {...field} 
                                        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <FormField
                                            control={eventform.control}
                                            name="isfree"
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isfree" className="whitespace-nowrap pr-3 leading-none 
                                                            peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                                            <Checkbox id="isfree" onCheckedChange={field.onChange} checked={field.value} 
                                                             className="mr-2 h-5 w-5 border-2 border-custom hover:border-black"  />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />        
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={eventform.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full 
                                      overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                          src="/assets/icons/link.svg"
                                          alt="link"
                                          width={24}
                                          height={24}
                                        />
                                        <Input placeholder="URL" {...field} className="input-field"/>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>
            <Button type="submit" size="lg" disabled={eventform.formState.isSubmitting} 
            className="button col-span-2 w-full bg-custom text-black hover:bg-black hover:text-white">
                {eventform.formState.isSubmitting ? ('Submitting...'):`${type} Event`} 
                </Button>
        </form>
    </Form>
  )
}

export default Eventform