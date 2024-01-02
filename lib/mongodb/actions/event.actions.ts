"use server"

import { handleError } from "@/lib/utils"
import { CreateEventParams } from "@/types";
import { connectToDb } from "../database";
import User from "../models/user.model";
import Event from "../models/event.model";



export const createEvent = async ({ event, userId, path}:CreateEventParams) =>{
    try {
        await connectToDb()
        const organizer = await User.findById(userId)
        if(!organizer){
            throw new Error("Organizer not found")
        }

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        })

        return JSON.parse(JSON.stringify(newEvent))

    } catch (error) {
        handleError(error);   
    }
}