import {
  Menu,
  School,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

import DarkMode from "@/DarkMode";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

import { Link, useNavigate } from "react-router-dom";
import { useLogoutuserMutation } from "@/features/api/authapi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { store } from "@/app/store";


/* =========================================================
   MOBILE NAVBAR
========================================================= */

const MobileNavbar = () => {

  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] =
    useLogoutuserMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message || "User logged out."
      );

      navigate("/");
    }
  }, [isSuccess, data, navigate]);


  return (
    <Sheet>

      <SheetTrigger asChild>

        <Button
          size="icon"
          variant="ghost"
          className="
            h-10
            w-10
            rounded-xl

            border
            border-slate-200

            bg-white/80

            shadow-sm

            transition-all
            duration-200

            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600

            dark:border-border
            dark:bg-background
            dark:hover:bg-muted
          "
        >
          <Menu className="h-5 w-5" />
        </Button>

      </SheetTrigger>


      <SheetContent
        side="right"
        className="
          w-[320px]
          border-l
          border-slate-200
          bg-white
          p-0

          dark:border-border
          dark:bg-background
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            border-b
            border-slate-200

            bg-gradient-to-r
            from-blue-50
            via-white
            to-indigo-50

            px-6
            py-7

            dark:border-border
            dark:bg-background
          "
        >

          <div className="flex items-center justify-between">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-blue-600
                  text-white

                  shadow-md
                "
              >
                <School className="h-5 w-5" />
              </div>


              <div>

                <h1
                  className="
                    text-lg
                    font-extrabold
                    tracking-tight

                    text-slate-900

                    dark:text-foreground
                  "
                >
                  CourseDesk
                </h1>

                <p className="text-xs text-muted-foreground">
                  Learn at your pace. Build your future.
                </p>

              </div>

            </Link>

            <DarkMode />

          </div>

        </div>


        {/* ================= USER ================= */}

        {user && (

          <div className="px-5 pt-6">

            <div
              className="
                rounded-2xl

                border
                border-blue-100

                bg-gradient-to-br
                from-blue-50
                to-indigo-50

                p-4

                shadow-sm

                dark:border-border
                dark:bg-muted/40
              "
            >

              <div className="flex items-center gap-3">

                <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm">

                  <AvatarImage
                    src={
                      user?.photoUrl ||
                      "https://github.com/shadcn.png"
                    }
                    alt={user?.name || "User"}
                  />

                  <AvatarFallback>
                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </AvatarFallback>

                </Avatar>


                <div className="min-w-0">

                  <p className="truncate font-semibold text-slate-900 dark:text-foreground">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ================= MOBILE MENU ================= */}

        <nav className="px-5 py-7">

          <p
            className="
              mb-3
              px-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-muted-foreground
            "
          >
            Menu
          </p>


          <div className="space-y-1">

            <SheetClose asChild>

              <Link
                to="/"
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium

                  transition

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:hover:bg-muted
                  dark:hover:text-foreground
                "
              >

                <School className="h-5 w-5 text-muted-foreground" />

                Home

              </Link>

            </SheetClose>


            <SheetClose asChild>

              <Link
                to="/my-learning"
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium

                  transition

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:hover:bg-muted
                  dark:hover:text-foreground
                "
              >

                <BookOpen className="h-5 w-5 text-muted-foreground" />

                My Learning

              </Link>

            </SheetClose>


            <SheetClose asChild>

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium

                  transition

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:hover:bg-muted
                  dark:hover:text-foreground
                "
              >

                <User className="h-5 w-5 text-muted-foreground" />

                Edit Profile

              </Link>

            </SheetClose>


            {user?.role === "instructor" && (

              <SheetClose asChild>

                <Link
                  to="/admin/dashboard"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium

                    transition

                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:hover:bg-muted
                    dark:hover:text-foreground
                  "
                >

                  <LayoutDashboard className="h-5 w-5 text-muted-foreground" />

                  Dashboard

                </Link>

              </SheetClose>

            )}

          </div>

        </nav>


        {/* ================= LOGOUT ================= */}

        {user && (

          <div className="absolute bottom-6 left-5 right-5">

            <Button
              variant="outline"
              onClick={logoutHandler}
              className="
                h-11
                w-full
                justify-start
                gap-3
                rounded-xl

                border-red-200
                text-red-500

                hover:bg-red-50
                hover:text-red-600

                dark:border-red-900
                dark:hover:bg-red-950/30
              "
            >

              <LogOut className="h-5 w-5" />

              Log Out

            </Button>

          </div>

        )}

      </SheetContent>

    </Sheet>
  );
};


/* =========================================================
   MAIN NAVBAR
========================================================= */

const Navbar = () => {

  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] =
    useLogoutuserMutation();

  const navigate = useNavigate();


  const logoutHandler = async () => {
    await logoutUser();
  };


  useEffect(() => {

    if (isSuccess) {

      toast.success(
        data?.message || "User logged out."
      );

      navigate("/");

    }

  }, [isSuccess, data, navigate]);


  return (

    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50

        h-[78px]

        border-b
        border-blue-200/70

        bg-gradient-to-r
        from-blue-50/95
        via-white/95
        to-indigo-50/95

        shadow-[0_5px_25px_rgba(37,99,235,0.09)]

        backdrop-blur-xl

        dark:border-slate-800
        dark:bg-slate-950
        dark:bg-none
        dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]
      "
    >

      {/* subtle light-theme glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/4
          top-0
          h-[78px]
          w-[350px]

          bg-blue-400/10

          blur-3xl

          dark:hidden
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-1/4
          top-0
          h-[78px]
          w-[300px]

          bg-indigo-400/10

          blur-3xl

          dark:hidden
        "
      />


      <div
        className="
          relative
          mx-auto
          flex
          h-full
          max-w-[1600px]

          items-center
          justify-between

          px-6

          lg:px-10
          xl:px-14
        "
      >


        {/* =================================================
            COURSE DESK BRAND
        ================================================= */}

        <Link
          to="/"
          className="
            group
            flex
            shrink-0
            items-center
            gap-3
          "
        >

          {/* Logo */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-blue-600
              to-indigo-600

              text-white

              shadow-[0_6px_18px_rgba(37,99,235,0.25)]

              transition-all
              duration-200

              group-hover:scale-105
              group-hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)]

              dark:bg-primary
              dark:from-primary
              dark:to-primary
              dark:text-primary-foreground
              dark:shadow-md
            "
          >

            <School className="h-8 w-8" />

          </div>


          {/* Brand */}

          <div className="flex items-center gap-3">

            <h1
              className="
                whitespace-nowrap

                text-[32px]
                font-black
                leading-none
                tracking-tight

                text-slate-900

                dark:text-foreground
              "
            >
              CourseDesk
            </h1>


            {/* Divider */}

            <div
              className="
                hidden
                h-7
                w-px

                bg-slate-300

                sm:block

                dark:bg-border
              "
            />


            {/* Tagline */}

            <p
              className="
                hidden
                whitespace-nowrap

                text-sm
                font-medium

                text-slate-500

                sm:block

                dark:text-muted-foreground
              "
            >
              Learn at your pace. Build your future.
            </p>

          </div>

        </Link>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-5
            md:flex
          "
        >

          {/* ================= USER ================= */}

          {user ? (

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <button
                  className="
                    flex
                    items-center
                    gap-3

                    rounded-2xl

                    border
                    border-blue-100

                    bg-white/80

                    px-2
                    py-2
                    pr-3

                    shadow-[0_4px_15px_rgba(37,99,235,0.07)]

                    outline-none

                    transition-all

                    hover:border-blue-200
                    hover:bg-white
                    hover:shadow-[0_6px_20px_rgba(37,99,235,0.12)]

                    focus-visible:ring-2
                    focus-visible:ring-blue-400

                    dark:border-border
                    dark:bg-muted/40
                    dark:hover:bg-muted
                    dark:hover:shadow-sm
                    dark:focus-visible:ring-ring
                  "
                >

                  <Avatar
                    className="
                      h-10
                      w-10

                      ring-2
                      ring-blue-100

                      dark:ring-transparent
                    "
                  >

                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        "https://github.com/shadcn.png"
                      }
                      alt={user?.name || "User"}
                    />

                    <AvatarFallback>
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </AvatarFallback>

                  </Avatar>


                  <div className="hidden text-left lg:block">

                    <p
                      className="
                        max-w-[120px]
                        truncate
                        text-sm
                        font-semibold

                        text-slate-900

                        dark:text-foreground
                      "
                    >
                      {user?.name || "User"}
                    </p>

                    <p
                      className="
                        text-[11px]
                        capitalize
                        text-muted-foreground
                      "
                    >
                      {user?.role || "student"}
                    </p>

                  </div>


                  <ChevronDown
                    className="
                      hidden
                      h-4
                      w-4
                      text-muted-foreground
                      lg:block
                    "
                  />

                </button>

              </DropdownMenuTrigger>


              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="
                  w-64
                  rounded-2xl
                  border-border
                  p-2
                  shadow-xl
                "
              >

                <DropdownMenuLabel className="px-3 py-3">

                  <div className="flex items-center gap-3">

                    <Avatar className="h-10 w-10">

                      <AvatarImage
                        src={
                          user?.photoUrl ||
                          "https://github.com/shadcn.png"
                        }
                      />

                      <AvatarFallback>

                        {user?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}

                      </AvatarFallback>

                    </Avatar>


                    <div className="min-w-0">

                      <p className="truncate font-semibold">
                        {user?.name || "User"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>

                    </div>

                  </div>

                </DropdownMenuLabel>


                <DropdownMenuSeparator />


                <DropdownMenuGroup>

                  <DropdownMenuItem
                    asChild
                    className="
                      cursor-pointer
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >

                    <Link
                      to="/my-learning"
                      className="flex items-center gap-3"
                    >

                      <BookOpen className="h-4 w-4" />

                      My Learning

                    </Link>

                  </DropdownMenuItem>


                  <DropdownMenuItem
                    asChild
                    className="
                      cursor-pointer
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >

                    <Link
                      to="/profile"
                      className="flex items-center gap-3"
                    >

                      <User className="h-4 w-4" />

                      Edit Profile

                    </Link>

                  </DropdownMenuItem>


                  {user?.role === "instructor" && (

                    <DropdownMenuItem
                      asChild
                      className="
                        cursor-pointer
                        rounded-xl
                        px-3
                        py-2.5
                      "
                    >

                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3"
                      >

                        <LayoutDashboard className="h-4 w-4" />

                        Dashboard

                      </Link>

                    </DropdownMenuItem>

                  )}

                </DropdownMenuGroup>


                <DropdownMenuSeparator />


                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="
                    cursor-pointer
                    rounded-xl
                    px-3
                    py-2.5

                    text-red-500

                    focus:bg-red-50
                    focus:text-red-600

                    dark:focus:bg-red-950/30
                  "
                >

                  <LogOut className="mr-3 h-4 w-4" />

                  Log Out

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          ) : (

            /* ================= LOGIN / SIGNUP ================= */

            <div className="flex items-center gap-4">

              <Button
                variant="ghost"
                className="
                  h-10
                  rounded-xl

                  px-5

                  text-sm
                  font-medium

                  text-slate-700

                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:text-foreground
                  dark:hover:bg-muted
                  dark:hover:text-foreground
                "
                onClick={() =>
                  navigate("/login?mode=login")
                }
              >
                Login
              </Button>


              <Button
                className="
                  h-10
                  rounded-xl

                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600

                  px-6

                  text-sm
                  font-semibold
                  text-white

                  shadow-[0_5px_15px_rgba(37,99,235,0.20)]

                  transition-all
                  duration-200

                  hover:from-blue-700
                  hover:to-indigo-700
                  hover:shadow-[0_7px_20px_rgba(37,99,235,0.28)]

                  dark:bg-primary
                  dark:from-primary
                  dark:to-primary
                  dark:hover:bg-primary/90
                "
                onClick={() =>
                  navigate("/login?mode=signup")
                }
              >
                Sign Up
              </Button>

            </div>

          )}


          {/* ================= THEME ================= */}

          <div
            className="
              border-l
              border-slate-200
              pl-5

              dark:border-border
            "
          >

            <DarkMode />

          </div>

        </div>


        {/* =================================================
            MOBILE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
            md:hidden
          "
        >

          <DarkMode />

          <MobileNavbar />

        </div>

      </div>

    </header>
  );
};


export default Navbar;