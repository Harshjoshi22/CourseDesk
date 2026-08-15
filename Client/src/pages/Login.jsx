import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useLoginuserMutation,
  useRegisteruserMutation,
} from "@/features/api/authapi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Lock,
  Globe,
  Check,
  Circle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate ,useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // ================= LOGIN INPUT =================
  const [logininput, setlogininput] = useState({
    email: "",
    password: "",
  });

  // ================= SIGNUP INPUT =================
  const [signupinput, setsignupinput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
  });

  // ================= FORM STATE =================
  
  const [searchParams, setSearchParams] = useSearchParams();
const activeTab =
  searchParams.get("mode") === "signup"
    ? "SignUp"
    : "Login";
  // ================= PASSWORD VISIBILITY =================
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // ================= API =================
  const [
    registerUser,
    {
      isLoading: registerisLoading,
    },
  ] = useRegisteruserMutation();

  const [
    loginUser,
    {
      isLoading: loginisLoading,
    },
  ] = useLoginuserMutation();

  // ================= INPUT HANDLER =================
  const changeinputhandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "SignUp") {
      setsignupinput((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setlogininput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordRequirements = [
  {
    label: "Minimum 8 characters",
    valid: signupinput.password.length >= 8,
  },
  {
    label: "One uppercase letter",
    valid: /[A-Z]/.test(signupinput.password),
  },
  {
    label: "One lowercase letter",
    valid: /[a-z]/.test(signupinput.password),
  },
  {
    label: "One number",
    valid: /\d/.test(signupinput.password),
  },
  {
    label: "One special character",
    valid: /[@$!%*?&]/.test(signupinput.password),
  },
];
  // ================= LOGIN / SIGNUP =================
  const handleregistration = async (type) => {
    const inputhandle =
      type === "SignUp" ? signupinput : logininput;

    const action =
      type === "SignUp" ? registerUser : loginUser;

      if (
    type === "SignUp" &&
    !passwordRegex.test(signupinput.password)
  ) {
    toast.error("Password does not meet all requirements");
    return;
  }
    // Check confirm password
    if (
      type === "SignUp" &&
      signupinput.password !== signupinput.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      const response = await action(inputhandle).unwrap();

      if (type === "Login") {
        toast.success(response.message || "Login Successful");

        navigate("/");
      }

      if (type === "SignUp") {
        toast.success(response.message || "SignUp Successful");
        
        setsignupinput({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          country: "India",
        });
        navigate("/login?mode=login")
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          (type === "Login"
            ? "Login Failed"
            : "SignUp Failed")
      );
    }
  };

  return (
    <div
  className={`min-h-[calc(100vh-80px)] flex justify-center px-4 ${
    activeTab === "Login"
      ? "items-start pt-30"
      : "items-start pt-10"
  }`}
>
      <div className={`w-full ${
  activeTab === "SignUp" ? "max-w-4xl" : "max-w-md"
}`}>

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {activeTab === "SignUp"
              ? "Create your account"
              : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {activeTab === "SignUp"
              ? "Create an account and start your learning journey."
              : "Sign in to continue your learning journey."}
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="rounded-2xl border bg-card p-5 shadow-xl sm:p-8">

          {/* ================================================= */}
          {/* ==================== SIGNUP ===================== */}
          {/* ================================================= */}

          {activeTab === "SignUp" && (
            <div className="space-y-8">

              {/* PERSONAL INFORMATION */}
              <div>

                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Tell us a little about yourself.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* FULL NAME */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name
                    </Label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="name"
                        name="name"
                        value={signupinput.name}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        className="pl-10"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={signupinput.phoneNumber}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        className="pl-10"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* DATE OF BIRTH */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth
                    </Label>

                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={signupinput.dateOfBirth}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        className="pl-10"
                        type="date"
                      />
                    </div>
                  </div>

                  {/* GENDER */}
                  <div className="space-y-2">
  <Label htmlFor="gender">
    Gender
  </Label>

  <Select
    value={signupinput.gender}
    onValueChange={(value) =>
      setsignupinput((prev) => ({
        ...prev,
        gender: value,
      }))
    }
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>

    <SelectContent className="mt-9">
      <SelectItem value="male">
        Male
      </SelectItem>

      <SelectItem value="female">
        Female
      </SelectItem>

      <SelectItem value="other">
        Other
      </SelectItem>

      <SelectItem value="prefer-not-to-say">
        Prefer not to say
      </SelectItem>
    </SelectContent>
  </Select>
</div>

                </div>
              </div>

              {/* ADDRESS */}
              <div>

                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    Address
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Add your location details.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* ADDRESS */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address
                    </Label>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <Input
                        id="address"
                        name="address"
                        value={signupinput.address}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        className="pl-10"
                        placeholder="House number, street, locality"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* CITY */}
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City
                      </Label>

                      <Input
                        id="city"
                        name="city"
                        value={signupinput.city}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        placeholder="Enter your city"
                      />
                    </div>

                    {/* STATE */}
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State
                      </Label>

                      <Input
                        id="state"
                        name="state"
                        value={signupinput.state}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        placeholder="Enter your state"
                      />
                    </div>

                    {/* PIN CODE */}
                    <div className="space-y-2">
                      <Label htmlFor="pinCode">
                        PIN Code
                      </Label>

                      <Input
                        id="pinCode"
                        name="pinCode"
                        value={signupinput.pinCode}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter PIN code"
                      />
                    </div>

                    {/* COUNTRY */}
                    <div className="space-y-2">
                      <Label htmlFor="country">
                        Country
                      </Label>

                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id="country"
                          name="country"
                          value={signupinput.country}
                          onChange={(e) =>
                            changeinputhandler(e, "SignUp")
                          }
                          className="pl-10"
                          placeholder="Select country"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* ACCOUNT INFORMATION */}
              <div>

                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    Account Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Create your login credentials.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">
                      Email
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="signup-email"
                        name="email"
                        value={signupinput.email}
                        onChange={(e) =>
                          changeinputhandler(e, "SignUp")
                        }
                        className="pl-10"
                        type="email"
                        placeholder="abc@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* PASSWORD */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">
                        Password
                      </Label>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id="signup-password"
                          name="password"
                          value={signupinput.password}
                          onChange={(e) =>
                            changeinputhandler(e, "SignUp")
                          }
                          className="pl-10 pr-10"
                          type={
                            showSignupPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Create a strong password"
                          required
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                          title="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowSignupPassword(
                              !showSignupPassword
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password
                      </Label>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          value={signupinput.confirmPassword}
                          onChange={(e) =>
                            changeinputhandler(e, "SignUp")
                          }
                          className="pl-10 pr-10"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm your password"
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* PASSWORD REQUIREMENTS */}
                 <div className="rounded-lg border bg-muted/40 p-4">
  <p className="mb-3 text-sm font-medium">
    Password requirements
  </p>

  <div className="grid gap-2 text-xs sm:grid-cols-2">
    {passwordRequirements.map((requirement) => (
      <div
        key={requirement.label}
        className={`flex items-center gap-2 ${
          requirement.valid
            ? "text-green-500"
            : "text-muted-foreground"
        }`}
      >
        {requirement.valid ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-3 w-3" />
        )}

        <span>{requirement.label}</span>
      </div>
    ))}
  </div>
</div>

                </div>
              </div>

              {/* SIGNUP BUTTON */}
              <Button
                type="button"
                disabled={registerisLoading}
                onClick={() =>
                  handleregistration("SignUp")
                }
                className="h-11 w-full rounded-xl"
              >
                {registerisLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* SIGNUP FOOTER */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                    onClick={() => setSearchParams({ mode: "login" })}
                  className="font-semibold text-primary hover:underline"
                >
                  Log in
                </button>
              </p>

            </div>
          )}

          {/* ================================================= */}
          {/* ===================== LOGIN ==================== */}
          {/* ================================================= */}

          {activeTab === "Login" && (
            <div className="mx-auto max-w-md space-y-6">

              <div className="space-y-5">

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="login-email">
                    Email
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="login-email"
                      name="email"
                      value={logininput.email}
                      onChange={(e) =>
                        changeinputhandler(e, "Login")
                      }
                      className="pl-10"
                      type="email"
                      placeholder="abc@gmail.com"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    Password
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="login-password"
                      name="password"
                      value={logininput.password}
                      onChange={(e) =>
                        changeinputhandler(e, "Login")
                      }
                      className="pl-10 pr-10"
                      type={
                        showLoginPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowLoginPassword(
                          !showLoginPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* LOGIN BUTTON */}
              <Button
                type="button"
                disabled={loginisLoading}
                onClick={() =>
                  handleregistration("Login")
                }
                className="h-11 w-full rounded-xl"
              >
                {loginisLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* LOGIN FOOTER */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account yet?{" "}
                <button
                  type="button"
                   onClick={() => setSearchParams({ mode: "signup" })}
                  className="font-semibold text-primary hover:underline"
                >
                 Register
                </button>
              </p>

            </div>
          )}

        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our terms and conditions.
        </p>

      </div>
    </div>
  );
};

export default Login;