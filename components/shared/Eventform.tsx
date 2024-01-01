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

import { Input } from "@/components/ui/input"
import { eventformSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { FileUploader } from "./Fileuploader"
import { useState } from "react"
import Image from "next/image"

type EventformProps = {
    userId: string
    type: "Create" | "Update"
}

const Eventform = ({ userId, type }: EventformProps ) => {
    const initialValues = eventDefaultValues
    const eventform = useForm<z.infer<typeof eventformSchema>>({
        resolver: zodResolver(eventformSchema),
        defaultValues: initialValues
    })
    function onSubmit(values: z.infer<typeof eventformSchema>){
        console.log(values)
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
                                        {/* TODO: add date picker object*/}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>
            <Button type="submit" className="bg-custom text-black hover:bg-black hover:text-white">Create New Event</Button>
        </form>
    </Form>
  )
}

export default Eventform