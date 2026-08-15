import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
    setLectureTitle("");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

 

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl dark:text-black">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm dark:text-black">
         Create interactive learning experiences by adding new lectures to your course.
        </p>
      </div>
      <div className="space-y-4">
        <div >
          <Label className="mb-3 text ml-1 text-black">Title</Label>
          <Input
            type="text"
            className="dark:border-gray-400 text-black dark:placeholder:text-gray-800"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
          className="border-black dark:bg-gray-900 dark:text-white dark:hover:text-black dark:hover:bg-white dark:hover:border-black  "
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button className=" dark:hover:text-black dark:hover:bg-white dark:hover:border-black dark:bg-gray-900 dark:text-white" disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureError ? (
            <p className="dark:text-black">Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p className="dark:text-black">No lectures availabe</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture 
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;