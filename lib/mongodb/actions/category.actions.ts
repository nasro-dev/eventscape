"use server"

import { handleError } from "@/lib/utils"
import { CreateCategoryParams } from "@/types"
import { connectToDb } from "../database"
import Category from "../models/category.model"


export const createCategory = async ({categoryName}:CreateCategoryParams) => {
  try {
    await connectToDb()

    const newCategory = await Category.create({ name: categoryName})

    return JSON.parse(JSON.stringify(newCategory))
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategory = async () => {
    try {
      await connectToDb()
  
      const categories = await Category.find()
  
      return JSON.parse(JSON.stringify(categories))
    } catch (error) {
      handleError(error)
    }
}