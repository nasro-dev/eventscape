"use server"

import { handleError } from "@/lib/utils"
import { CreateEventParams } from "@/types";
import { connectToDb } from "../database";
import User from "../models/user.model";
import Event from "../models/event.model";
import Category from "../models/category.model";

const populateEvent = async(query: any) => {
    return query.populate({
        path:'organizer',
        model:User,
        select: '_id firstName lastName'
    }).populate({
        path: 'category',
        model: Category,
        select: '_id name'
    })
}

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

export const getEventById = async (eventId: string) => {
    try {
        await connectToDb()
        
        const event = await populateEvent(Event.findById(eventId))
        if(!event){
            throw new Error("Event not found")
        }

        return JSON.parse(JSON.stringify(event))
    } catch (error) {
        handleError(error)
    }
}