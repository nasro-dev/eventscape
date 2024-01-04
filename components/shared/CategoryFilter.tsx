"use client"

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { getAllCategory } from '@/lib/mongodb/actions/category.actions'
import { ICategory } from '@/lib/mongodb/models/category.model'

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(()=>{
    const getCategories = async () => {
    const categoryList = await getAllCategory()

      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories()
  }, []) 

  const onSelectCategory = (category: string) => {
    let newUrl =''
    if(category && category !== 'All') {
        newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'category',
            value: category
        })
    } else {
        newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['category']
        })
    }
    router.push(newUrl, { scroll: false })
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className='selelct-item p-regular-14'>All</SelectItem>
            {categories.map((category) => (
                <SelectItem value={category.name} key={category._id} className='selet-item p-regular-14'>
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default CategoryFilter