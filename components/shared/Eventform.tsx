"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
            <Button type="submit">Submit</Button>
        </form>
    </Form>
  )
}

export default Eventform