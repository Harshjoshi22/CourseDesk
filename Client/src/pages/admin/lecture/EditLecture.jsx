import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className=" dark:border-black rounded-full">
              <ArrowLeft className="dark:text-black " size={16} />
            </Button>
          </Link>
          <h1 className="font-bold dark:text-gray-900 text-xl">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;