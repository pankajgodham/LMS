import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourceDetail = () => {
    const PurchasedCourse=true
  return (
    <div className='mt-20 space-y-5'>
        <div className='bg-[#2D2F31] text-white '>
            <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3x'>Cource title</h1>
                <p className='text-base md:text-lg'>course Sub-title</p>
                <p>created by{" "}<span className='text-[#C0C4FC] underline italic'>Pankaj</span></p>
                <div className='flex items-center gap-2 text-sm'>
                    <BadgeInfo size={16}/>
                    <p>Last Updated 12/2/2022</p>
                </div>
                <p>Student Enrolled:10</p>
            </div>
        </div>
        <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
            <div className='w-full lg:w-1/2 space-y-5'>
                <h1 className='font-bold text-xl md:text-2xl'>
                    Description
                </h1>
                <p className='text-sm'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim incidunt animi quibusdam, cupiditate numquam possimus iusto saepe distinctio rerum temporibus!
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle>Course Content</CardTitle>
                        <CardDescription>4 lecture</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 '>
                    {
  [1, 2, 3].map((_, idx) => (
    <div key={idx} className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-2">
        {true ? <PlayCircle size={14} /> : <Lock size={14} />}
        <p>Lecture Title</p>
      </div>
    </div>
  ))
}

                    </CardContent>
                </Card>
            </div>
            <div className='w-full lg:w-1/3'>
            <Card>
                <CardContent className='p-4 flex flex-col'>
                    <div className='w-full aspect-video mb-4'>
                    Video
                    </div>
                    <h1>Lecture Title</h1>
                    <Separator className='my-2'/>
                    <h1 className='text-lg md:text-xl font-semibold'>Course Price</h1>
                </CardContent>
                <CardFooter className='flex justify-center p-4'>
                    {
                        PurchasedCourse?(<Button className='w-full'>Continue Course</Button>):<Button className='w-full'>Purchase Course</Button>
                    }
                    
                </CardFooter>
            </Card>

            </div>
        </div>
    </div>
  )
}

export default CourceDetail