import React from "react";
import Course from "./Course";
import { useLoaduserQuery } from "@/features/api/authapi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Check, X,BookOpen } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useGetAllCourseProgressQuery } from "@/features/api/courseProgressApi";

const MyLearning = () => { 

  const {data, isLoading} = useLoaduserQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const myLearning = data?.user?.enrolledCourses || [];
  const [progressFilter, setProgressFilter] = useState(null);
const { data: progressData} = useGetAllCourseProgressQuery();
const filteredCourses = myLearning.filter((course) => {
  const progress = progressData?.courseProgress?.find(
    (item) => item.courseId === course._id
  );
  if (!progressFilter) {
    return true;
  }
  if (progressFilter === "completed") {
    return progress?.completed === true;
  }
  if (progressFilter === "in-progress") {
    return (
      progress &&
      progress.completed === false &&
      progress.lectureProgress.some(
        (lecture) => lecture.viewed === true
      )
    );
  }
  if (progressFilter === "not-started") {
    return (
      !progress ||
      progress.lectureProgress.length === 0
    );
  }

  return true;
});
  
  const coursesPerPage = 8;
const totalPages = Math.ceil(
  filteredCourses.length / coursesPerPage
);
const startIndex = (currentPage - 1) * coursesPerPage;

const currentCourses = filteredCourses.slice(
  startIndex,
  startIndex + coursesPerPage
);
const [open, setOpen] = useState(false);

  return (
    <>
    <div >
      <div className="w-full py-13 pl-20 bg-gray-800">
      <h1 className="font-bold text-3xl text-white">MY LEARNING</h1>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col ">
        <div className="flex justify-end w-full mb-3 mt-2"> 
        <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="gap-2"
    >
      <SlidersHorizontal className="h-4 w-4" />

      {progressFilter === "completed"
        ? "Completed"
        : progressFilter === "in-progress"
        ? "In Progress"
        : progressFilter === "not-started"
        ? "Not Started"
        : "Progress"}
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-56" align="end">
    {progressFilter && (
        <>
          <div/>

<button
  className="flex w-full items-center justify-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
  onClick={() => {
    setProgressFilter(null);
    setCurrentPage(1);
    setOpen(false);
  }}
>
  <span className="mr-22">Clear filter</span>
  <X className="h-4 w-4" />
</button>
        </>
      )}
    <div className="space-y-1">
      <p className="px-2 pb-2 text-sm font-semibold">
        Filter by progress
      </p>

      <button
        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
        onClick={() => {
          setProgressFilter("completed");
          setCurrentPage(1);
          setOpen(false);
        }}
      >
        <span>Completed</span>

        {progressFilter === "completed" && (
          <Check className="h-4 w-4" />
        )}
      </button>

      <button
        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
        onClick={() => {
          setProgressFilter("in-progress");
          setCurrentPage(1);
          setOpen(false);
        }}
      >
        <span>In Progress</span>

        {progressFilter === "in-progress" && (
          <Check className="h-4 w-4" />
        )}
      </button>

      <button
        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
        onClick={() => {
          setProgressFilter("not-started");
          setCurrentPage(1);
          setOpen(false);
        }}
      >
        <span>Not Started</span>

        {progressFilter === "not-started" && (
          <Check className="h-4 w-4" />
        )}
      </button>

      
    </div>
  </PopoverContent>
</Popover>
        </div>
      <div className="my-5 mx-10  ">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <>
          
           {currentCourses.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />

    <h2 className="text-lg font-semibold">
      No courses found
    </h2>

    <p className="mt-1 text-sm text-muted-foreground">
      No courses match the selected progress filter.
    </p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {currentCourses.map((course) => (
      <Course
        key={course._id}
        course={course}
      />
    ))}
  </div>
)}
        {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>

                <PaginationItem>
                  <PaginationPrevious
                   className={
                     currentPage === 1
      ? "hover:pointer-events-none opacity-50 cursor-not-allowed"
      : ""
  }
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      );
                    }}
                  />
                </PaginationItem>

                {Array.from(
                  { length: totalPages },
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                   className={
                     currentPage === totalPages
                     ? " hover:pointer-events-none opacity-50 cursor-not-allowed"
                     : ""
                    }
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      );
                    }}
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          )}
            </>
        )
      }
        
      </div>
        </div>
    </div>
   
  </>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);