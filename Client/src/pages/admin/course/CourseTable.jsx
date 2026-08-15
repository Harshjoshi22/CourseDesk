import { Button } from '@/components/ui/button'
import React from 'react'
import { Table, TableCell, TableCaption, TableFooter, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '../../../features/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'



const CourseTable = () => {
  const { data, isLoading,  } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>

      <Button className="dark:bg-gray-800 dark:text-white" onClick={() => navigate("create")}> Create a new course</Button>

      <Table className=" dark:text-black mt-2">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow  >
            <TableHead className="w-[100px] dark:text-black ">Price</TableHead>
            <TableHead className="w-[100px] text-center  dark:text-black ">Status</TableHead>
            <TableHead className="w-[100px] pl-12 text-left dark:text-black ">Title</TableHead>
            <TableHead className="text-right dark:text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">₹ {course?.coursePrice || "NA"}</TableCell>
              <TableCell className="px-7"><Badge>
                {course.isPublished ? "Published" : "Draft"}
              </Badge>
                </TableCell>
              <TableCell className="px-10 py-4">{course.courseTitle}</TableCell>
              <TableCell className="text-right">
           
                <Button size="sm" variant="ghost" onClick={()=>{
                  navigate(`/admin/course/${course._id}`);
                }
                }><Edit /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseTable