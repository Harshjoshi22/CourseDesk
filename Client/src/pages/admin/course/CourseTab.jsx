import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useDeleteCourseMutation,
} from "@/features/api/courseApi";

import { useGenerateCourseMutation } from "@/features/api/aiApi";

import {
  Loader2,
  Sparkles,
  Wand2,
  Check,
  X,
  RotateCcw,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  // =========================
  // AI STATES
  // =========================
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiCourse, setAiCourse] = useState(null);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const params = useParams();
  const courseId = params.courseId;

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    error: iserror,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();

  const [publishCourse, {}] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;

      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const [generateCourse, { isLoading: aiLoading }] =
    useGenerateCourseMutation();

  // =========================
  // EXISTING FUNCTION
  // =========================

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const removeCourseHandler = async () => {
    try {
      const res = await deleteCourse(courseId).unwrap();

      toast.success(res.message);
      navigate("/admin/course");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete course");
    }
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const fileReader = new FileReader();

      fileReader.onloadend = () =>
        setPreviewThumbnail(fileReader.result);

      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();

    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });

    navigate("/admin/course");
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
      });

      if (response.data) {
        refetch();

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  // =========================
  // AI GENERATE FUNCTION
  // =========================

  const generateCourseHandler = async () => {
  if (!aiPrompt.trim()) {
    toast.error("Please describe the course you want to create.");
    return;
  }

  try {
   const currentCourse = {
  ...input,
  ...(aiCourse || {}),
};

const isInitialGeneration =
  !currentCourse.subTitle &&
  !currentCourse.description &&
  !currentCourse.courseLevel;
  
const response = await generateCourse({
  prompt: aiPrompt,
  currentCourse: currentCourse,
  isInitialGeneration: isInitialGeneration,
}).unwrap();


    let generatedCourse =
      response?.result ||
      response?.course ||
      response?.data ||
      response;

    // If Gemini returned JSON as a string
    if (typeof generatedCourse === "string") {
      try {
        generatedCourse = JSON.parse(generatedCourse);
      } catch (error) {
        console.error("AI result is not JSON:", generatedCourse);
      }
    }

    // Sometimes AI response may be wrapped inside course
    if (generatedCourse?.course) {
      generatedCourse = generatedCourse.course;
    }

    
  setAiCourse({
  ...currentCourse,
  ...generatedCourse,
});

    toast.success("Course generated successfully!");
  } catch (error) {
    console.error("AI Error:", error);

    toast.error(
      error?.data?.message || "Failed to generate course"
    );
  }
};

  // =========================
  // APPLY AI COURSE
  // =========================

  const applyAICourseHandler = () => {
    if (!aiCourse) {
      toast.error("No AI course available.");
      return;
    }

    setInput((prev) => ({
  ...prev,
  ...aiCourse,
}));

    toast.success("AI course details applied!");

    setAiCourse(null);
    setAiPrompt("");
    setShowAIPanel(false);
  };

  // =========================
  // CLOSE AI PANEL
  // =========================

  const closeAIPanelHandler = () => {
    setShowAIPanel(false);
    setAiCourse(null);
    setAiPrompt("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course update.");
    }

    if (error) {
      toast.error(
        error.data.message || "Failed to update course"
      );
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card className="dark:bg-gray-900">

      {/* ================= HEADER ================= */}

      <CardHeader className="flex flex-row justify-between">

        <div>
          <CardTitle>
            Basic Course Information
          </CardTitle>

          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>

        <div className="space-x-2">

          <Button
            disabled={
              courseByIdData?.course.lectures.length === 0
            }
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished
                  ? "false"
                  : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished
              ? "Unpublished"
              : "Publish"}
          </Button>

          <AlertDialog>

            <AlertDialogTrigger asChild>

              <Button variant="destructive">
                Remove Course
              </Button>

            </AlertDialogTrigger>

            <AlertDialogContent>

              <AlertDialogHeader>

                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently
                  delete this course, all its lectures, and their videos.
                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter>

                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={removeCourseHandler}
                  disabled={deleteLoading}
                >
                  {deleteLoading
                    ? "Deleting..."
                    : "Delete"}
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

        </div>

      </CardHeader>


      <CardContent>

        {/* ================================================= */}
        {/* AI COURSE GENERATOR */}
        {/* ================================================= */}

       <div className="mb-6">

  {!showAIPanel ? (

    <div className="flex items-center justify-between rounded-lg border border-purple-300 bg-gray-50 p-4 shadow-sm dark:border-purple-500/40 dark:bg-gray-900">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40">

          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />

        </div>

        <div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Create your course with AI
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Describe your course idea and let AI generate the course details.
          </p>

        </div>

      </div>

      <Button
        onClick={() => setShowAIPanel(true)}
        className="gap-2 bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
      >
        <Sparkles className="h-4 w-4" />
        Generate with AI
      </Button>

    </div>

  ) : (

    <div className="rounded-lg border border-purple-300 bg-white shadow-sm dark:border-purple-500/40 dark:bg-gray-900">

      {/* AI HEADER */}

      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40">

            <Wand2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />

          </div>

          <div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI Course Generator
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Describe what kind of course you want to create.
            </p>

          </div>

        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={closeAIPanelHandler}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>

      </div>


      {/* AI INPUT */}

      <div className="p-4">

        <Label className="mb-2 block text-gray-800 dark:text-gray-200">
          Describe your course
        </Label>

       <textarea
  value={aiPrompt}
  maxLength={500}
  onChange={(e) => setAiPrompt(e.target.value)}
  placeholder="Example: Create a beginner-friendly React course for students who know basic JavaScript..."
  className="min-h-[110px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
/>

<div className="mt-1 flex justify-end">
  <span
    className={`text-xs ${
      aiPrompt.length >= 450
        ? "text-orange-500"
        : "text-gray-500 dark:text-gray-400"
    }`}
  >
    {aiPrompt.length}/500
  </span>
</div>

        <div className="mt-3 flex items-center justify-between">

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Be specific about the topic and target level.
          </p>

          <Button
            onClick={generateCourseHandler}
            disabled={aiLoading || !aiPrompt.trim()}
            className="gap-2 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          >

            {aiLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Course
              </>
            )}

          </Button>

        </div>

      </div>


      {/* ================================================= */}
      {/* AI PREVIEW */}
      {/* ================================================= */}

      {aiCourse && (

        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-gray-900 dark:text-white">
                AI Generated Course
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Review the generated information before applying it.
              </p>

            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={applyAICourseHandler}
                className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
              >

                <Check className="h-4 w-4" />

                Apply to Course

              </Button>

            </div>

          </div>


          {/* AI RESULT */}

          <div className="grid gap-3">

            {/* TITLE */}

            <div className="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">

              <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                TITLE
              </p>

              <p className="font-medium text-gray-900 dark:text-white">
                {input.courseTitle || "Not generated"}
              </p>

            </div>


            {/* SUBTITLE */}

            <div className="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">

              <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                SUBTITLE
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                {aiCourse.subTitle|| input.subTitle || "Not generated"}
              </p>

            </div>


            {/* DESCRIPTION */}

            <div className="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">

              <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                DESCRIPTION
              </p>

              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                {aiCourse.description||input.courseTitle || "Not generated"}
              </p>

            </div>


            {/* CATEGORY + LEVEL */}

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">

                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  CATEGORY
                </p>

                <p className="text-gray-900 dark:text-white">
                  {aiCourse.category || input.category}
                </p>

              </div>

              <div className="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">

                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  COURSE LEVEL
                </p>

                <p className="text-gray-900 dark:text-white">
                  {aiCourse.courseLevel || input.courseLevel}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )}

</div>


        {/* ================================================= */}
        {/* EXISTING COURSE FORM */}
        {/* ================================================= */}

        <div className="space-y-4 mt-5">

          <div>

            <Label className="mb-2 ml-1">
              Title
            </Label>

            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />

          </div>


          <div>

            <Label className="mb-2 ml-1">
              Subtitle
            </Label>

            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />

          </div>


          <div>

            <Label className="mb-2 ml-1">
              Description
            </Label>

            <RichTextEditor
              input={input}
              setInput={setInput}
            />

          </div>


          <div className="flex items-center gap-5">

            {/* CATEGORY */}

            <div>

              <Label className="mb-2 ml-1">
                Category
              </Label>

              <Select
                value={input.category}
                onValueChange={selectCategory}
              >

                <SelectTrigger className="w-[180px]">

                  <SelectValue
                    placeholder="Select a category"
                  />

                </SelectTrigger>

                <SelectContent className="mt-15">

                  <SelectGroup className="dark:bg-gray-800">

                    <SelectLabel>
                      Category
                    </SelectLabel>

                    <SelectItem value="Next JS">
                      Next JS
                    </SelectItem>

                    <SelectItem value="Data Science">
                      Data Science
                    </SelectItem>

                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>

                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>

                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>

                    <SelectItem value="Javascript">
                      Javascript
                    </SelectItem>

                    <SelectItem value="Python">
                      Python
                    </SelectItem>

                    <SelectItem value="Docker">
                      Docker
                    </SelectItem>

                    <SelectItem value="MongoDB">
                      MongoDB
                    </SelectItem>

                    <SelectItem value="HTML">
                      HTML
                    </SelectItem>

                    <SelectItem value="React">
                      React
                    </SelectItem>

                  </SelectGroup>

                </SelectContent>

              </Select>

            </div>


            {/* COURSE LEVEL */}

            <div>

              <Label className="mb-2 ml-1">
                Course Level
              </Label>

              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >

                <SelectTrigger className="w-[180px]">

                  <SelectValue
                    placeholder="Select a course level"
                  />

                </SelectTrigger>

                <SelectContent className="mt-15">

                  <SelectGroup className="dark:bg-gray-800">

                    <SelectLabel>
                      Course Level
                    </SelectLabel>

                    <SelectItem value="Beginner">
                      Beginner
                    </SelectItem>

                    <SelectItem value="Intermediate">
                      Intermediate
                    </SelectItem>

                    <SelectItem value="Advanced">
                      Advanced
                    </SelectItem>

                  </SelectGroup>

                </SelectContent>

              </Select>

            </div>


            {/* PRICE */}

            <div>

              <Label className="mb-2 ml-1">
                Price in (INR)
              </Label>

              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit dark:bg-gray-800"
              />

            </div>

          </div>


          {/* THUMBNAIL */}

          <div>

            <Label className="mb-2 ml-1">
              Course Thumbnail
            </Label>

            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />

            {previewThumbnail && (

              <img
                src={previewThumbnail}
                className="e-64 my-2"
                alt="Course Thumbnail"
              />

            )}

          </div>


          {/* SAVE / CANCEL */}

          <div>

            <Button
              className="mr-3"
              onClick={() =>
                navigate("/admin/course")
              }
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={updateCourseHandler}
            >

              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}

            </Button>

          </div>

        </div>

      </CardContent>

    </Card>
  );
};

export default CourseTab;