import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }

    setSearchQuery("");
  };

  return (
    <section
      className="
        relative
        overflow-hidden

        border-b
        border-blue-200/70

        bg-gradient-to-br
        from-blue-100
        via-indigo-100
        to-violet-100

        dark:border-slate-800
        dark:from-slate-950
        dark:via-indigo-950
        dark:to-slate-900
      "
    >

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-400/35
          blur-[90px]

          dark:bg-blue-600/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-violet-400/30
          blur-[100px]

          dark:bg-violet-600/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/3
          h-[400px]
          w-[400px]
          rounded-full
          bg-cyan-300/25
          blur-[100px]

          dark:bg-cyan-600/10
        "
      />


      {/* =====================================================
          DECORATIVE DOTS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-24
          h-3
          w-3
          rounded-full
          bg-blue-500/50

          dark:bg-blue-400/40
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[12%]
          bottom-24
          h-2
          w-2
          rounded-full
          bg-indigo-500/50

          dark:bg-indigo-400/40
        "
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-5xl

          px-5
          py-12

          text-center

          sm:px-6
          sm:py-14

          lg:px-8
          lg:py-16
        "
      >

        {/* ===================================================
            BADGE
        =================================================== */}

        <div
          className="
            mx-auto
            mb-4

            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-blue-300/70

            bg-white/70

            px-4
            py-2

            text-sm
            font-semibold
            text-blue-700

            shadow-[0_8px_25px_rgba(37,99,235,0.12)]

            backdrop-blur-md

            dark:border-blue-700/60
            dark:bg-blue-950/40
            dark:text-blue-300
          "
        >
          <Sparkles className="h-4 w-4" />

          Learn something new today
        </div>


        {/* ===================================================
            HEADING
        =================================================== */}

        <h1
          className="
            mx-auto
            max-w-4xl

            text-4xl
            font-black
            leading-[1.05]
            tracking-tight

            text-slate-900

            sm:text-5xl
            lg:text-6xl

            dark:text-white
          "
        >
          Find the right course.

          <span
            className="
              block

              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-violet-600

              bg-clip-text
              text-transparent

              dark:from-blue-400
              dark:via-indigo-400
              dark:to-violet-400
            "
          >
            Build your future.
          </span>
        </h1>


        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            mx-auto
            mt-4

            max-w-2xl

            text-base
            leading-7

            text-slate-600

            sm:text-lg

            dark:text-slate-400
          "
        >
          Discover practical courses, learn from experienced
          instructors, and build the skills you need to move
          forward.
        </p>


        {/* ===================================================
            SEARCH FORM
        =================================================== */}

        <form
          onSubmit={searchHandler}
          className="
            mx-auto
            mt-7

            flex
            max-w-2xl
            items-center
            gap-3

            rounded-2xl

            border
            border-white/80

            bg-white/90

            p-2

            shadow-[0_20px_50px_rgba(37,99,235,0.18)]

            backdrop-blur-xl

            transition-all
            duration-300

            hover:shadow-[0_22px_55px_rgba(37,99,235,0.23)]

            focus-within:border-blue-400

            focus-within:shadow-[0_22px_60px_rgba(37,99,235,0.25)]

            dark:border-slate-700
            dark:bg-slate-900/90

            dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]

            dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.4)]

            dark:focus-within:border-blue-600
          "
        >

          {/* SEARCH ICON */}

          <div
            className="
              ml-1

              flex
              h-10
              w-10

              shrink-0

              items-center
              justify-center

              rounded-xl

              bg-blue-50
              text-blue-600

              dark:bg-blue-950/60
              dark:text-blue-400
            "
          >
            <Search className="h-5 w-5" />
          </div>


          {/* INPUT */}

          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses, skills, or topics..."
            className="
              h-12

              min-w-0
              flex-1

              border-none

              bg-transparent

              px-3

              text-base
              text-slate-900

              shadow-none
              outline-none

              focus-visible:ring-0

              placeholder:text-slate-400

              dark:text-white
              dark:placeholder:text-slate-500
            "
          />


          {/* SEARCH BUTTON */}

          <Button
            type="submit"
            className="
              h-12

              shrink-0

              rounded-xl

              bg-blue-600

              px-6

              text-sm
              font-semibold
              text-white

              shadow-sm

              transition-all
              duration-300

              hover:bg-blue-700
              hover:shadow-md

              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            Search
          </Button>

        </form>


        {/* ===================================================
            EXPLORE BUTTON
        =================================================== */}

        <div className="mt-5 flex justify-center">

          <Button
            onClick={() => navigate(`/course/search?query`)}
            variant="outline"
            className="
              group

              h-11

              rounded-xl

              border-blue-300

              bg-white/70

              px-6

              font-semibold
              text-blue-700

              shadow-[0_8px_20px_rgba(37,99,235,0.10)]

              backdrop-blur

              transition-all
              duration-300

              hover:-translate-y-0.5

              hover:border-blue-400
              hover:bg-white
              hover:text-blue-700

              hover:shadow-[0_12px_28px_rgba(37,99,235,0.18)]

              dark:border-slate-700
              dark:bg-slate-900/60
              dark:text-slate-200

              dark:hover:border-blue-700
              dark:hover:bg-slate-900
              dark:hover:text-blue-400
            "
          >
            Explore Courses

            <ArrowRight
              className="
                ml-2
                h-4
                w-4

                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </Button>

        </div>


        {/* ===================================================
            TRUST TEXT
        =================================================== */}

        <div
          className="
            mt-6

            flex
            flex-wrap
            items-center
            justify-center

            gap-x-6
            gap-y-2

            text-xs
            font-medium

            text-slate-500

            dark:text-slate-500
          "
        >
          <span>
            ✓ Learn at your own pace
          </span>

          <span className="hidden sm:inline">
            •
          </span>

          <span>
            ✓ Practical skills
          </span>

          <span className="hidden sm:inline">
            •
          </span>

          <span>
            ✓ Expert-led courses
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;