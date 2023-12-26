import * as z from "zod"

export const eventformSchema = z.object({
    title: z.string().min(3, {
        message : "Title must be at least 3 characters.",
    }),
    description: z.string().min(3, {
        message : "Description must be at least 3 characters.",
    }).max(500,"Description must be less then 500 characters.", ),
    location: z.string().min(3, {
        message : "Location must be at least 3 characters.",
    }).max(300,"Location must be less then 300 characters.", ),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isfree: z.boolean(),
    url: z.string().url()
})