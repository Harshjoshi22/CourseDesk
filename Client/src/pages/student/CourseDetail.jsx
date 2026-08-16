import { store } from "@/app/store";
import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

import { useNavigate,useLocation, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const location=useLocation();
  const { data, isLoading,isError } = useGetCourseDetailWithStatusQuery(courseId, {
  refetchOnMountOrArgChange: true,
});

if (isLoading) return <h1>Loading...</h1>;
if (isError) return <h>Failed to load course details</h>;

const { course, purchased} = data;

const handleAuth = () => {
  const returnUrl = location.pathname;

  navigate(`/login?redirect=${encodeURIComponent(returnUrl)}`);
};
  const handleContinueCourse = () => {
    if(purchased || !course?.coursePrice){
      navigate(`/course-progress/${courseId}`)
    }
  }
 const handlevideopreview=()=>{
  if(!course?.coursePrice || purchased ){
    return true;
  }else{
    return false;

  }
 }
  return (
    <div className="space-y-5 mt-22">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.coursesubTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl mb-2">Description</h1>
          <div 
  dangerouslySetInnerHTML={{
    __html: course.description
      .replace(/&nbsp;/g, " ")
      .replace(/\u00A0/g, " "),
  }}
/>
          <Card>
            <CardHeader>
              <CardTitle >Course Content</CardTitle>
              <CardDescription className="mt-0">{course?.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {lecture.isPreviewFree ?<PlayCircle size={14} /> :
                    handlevideopreview() ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card >
            <CardContent className=" flex flex-col">
              {isAuthenticated ?(
<div className="w-full aspect-video mb-5">
                 <ReactPlayer
                 width="100%"
                 height={"100%"}
                 src={course.lectures[0].videoUrl?.replace(/^http:\/\//, "https://")}
                 controls={true}
                 />
              </div>
              ):(
              <div className="w-full aspect-video rounded-xl bg-muted/30 border flex flex-col items-center justify-center gap-5 p-6 mb-4">
  <div className="text-center space-y-2">
    <h3 className="text-xl font-semibold">
      Login to watch this course
    </h3>
    <p className="text-sm text-muted-foreground">
      Sign in to access the course content.
    </p>
  </div>

  <div className="flex items-center gap-3">
    <Button
      variant="outline"
      className="px-7 py-5"
      onClick={handleAuth}
    >
      Login
    </Button>
  </div>
</div>
              )}
              
              <h1 className="font-bold text-2xl">{course.lectures[0].lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold mt-1 ">₹{course?.coursePrice}</h1>
            </CardContent>
            <CardFooter>
 {!course?.coursePrice ?
              <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
              : purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;