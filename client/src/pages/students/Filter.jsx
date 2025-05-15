
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@radix-ui/react-select'
import React from 'react'
const catagories=[{ id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },]
const Filter = () => {
  return (
    <div className='w-full md:w-[20%]'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-lg md:text-xl'>Filter option</h1>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Sort By"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                       <SelectLabel>Sort By Price</SelectLabel>
                    <SelectItem value="low">Low to High</SelectItem>
                    <SelectItem value="high">High to Low</SelectItem> 
                    </SelectGroup>
                    
                </SelectContent>
            </Select>
        </div>
        <Separator className='my-4'/>
        <div>
            <h1 className='font-semibold mb-2'>Category</h1>
            {
                catagories.map((category)=>(
                    <div className='flex items-center space-x-2'>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Filter