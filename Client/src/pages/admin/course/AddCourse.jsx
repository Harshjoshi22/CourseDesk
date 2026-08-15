import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
 import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'



const AddCourse = () => {
  const[createCourse,{data,error,isLoading,isSuccess}]=useCreateCourseMutation();
  const [courseTitle ,setcourseTitle]=useState("")
  const[category,setcategory]=useState("")
  
  const createCourseHandler= async ()=>{
       await createCourse({courseTitle,category});
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message ||"Course created.")
      navigate("/admin/course")
    }
  },[isSuccess,error])
  
  
  const navigate= useNavigate("");
  const getselectedcategory=(value)=>{
    setcategory(value);
  }
const items = [
  { label: "Next JS", value: "Next JS" },
  { label: "Data Science", value: "Data Science" },
  { label: "Frontend Development", value: "Frontend Development" },
  { label: "Fullstack Development", value: "Fullstack Development" },
  { label: "MERN Stack Development", value: "MERN Stack Development" },
  { label: "Javascript", value: "Javascript" },
  { label: "Python", value: "Python" },
  { label: "Docker", value: "Docker" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "HTML", value: "HTML" },
  { label: "React", value: "React" },
]
  return (

    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font bold dark:text-black text-xl'>Lets add course,add some basic course details for your new course</h1>
        <p className='text-sm dark:text-black '>Start building a course that inspires and educates students.</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label className="mb-2 dark:text-black ml-1">Title</Label>
          <Input type="text"
            name="courseTitle"
            className="dark:border-gray-700 dark:text-black dark:placeholder:border-gray-900"
            value={courseTitle}
            onChange={(e)=>setcourseTitle(e.target.value)}
            placeholder="Your Course Name" />
        </div>
         <div>
          <Label  className="mb-2 dark:text-black ml-1">Category</Label>
  <Select items={items} onValueChange={getselectedcategory}>
  <SelectTrigger className="w-full max-w-48 dark:border-black dark:text-black">
    <SelectValue
      placeholder="Select a category"
      className="text-black dark:text-black"
    />
  </SelectTrigger>

  <SelectContent className="mt-15 dark:bg-gray-800">
    <SelectGroup>
      <SelectLabel className="dark:text-white">
        Category
      </SelectLabel>

      {items.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          className="dark:text-white dark:focus:bg-gray-700"
        >
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant="outline" className="dark:bg-gray-900 dark:hover:bg-white dark:hover:border-black dark:hover:text-black" onClick={()=>navigate("/admin/course")}>Back</Button>
          <Button disabled={isLoading} className="dark:bg-gray-900 dark:text-white  dark:hover:bg-white dark:hover:border-black dark:hover:text-black" onClick={createCourseHandler}>
            {
              isLoading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait</>:"Create"
            }
          </Button>
        </div>
      </div>
    </div>

  )
}

export default AddCourse