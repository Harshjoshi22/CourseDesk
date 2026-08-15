
import {
    AvatarImage,
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Loader2,
    User,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
    Map,
    Globe,
    Camera,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
    useLoaduserQuery,
    useUpdateuserMutation,
} from "@/features/api/authapi";

import { toast } from "sonner";

const Profile = () => {
    // =========================
    // PROFILE FORM STATES
    // =========================

    const [name, setname] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [gender, setgender] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [pinCode, setpinCode] = useState("");
    const [country, setcountry] = useState("India");

    const [profilephoto, setprofilephoto] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // =========================
    // LOAD USER
    // =========================

    const {
        data,
        isLoading,
        refetch,
    } = useLoaduserQuery();

    // =========================
    // UPDATE USER
    // =========================

    const [
        updateuser,
        {
            data: updateuserdata,
            isLoading: updateuserisLoading,
            isError,
            error,
            isSuccess,
        },
    ] = useUpdateuserMutation();

    // =========================
    // USER DATA
    // =========================

    const user = data?.user;

    // =========================
    // LOAD USER DATA INTO FORM
    // =========================

    useEffect(() => {
        if (user) {
            setname(user.name || "");
            setphoneNumber(user.phoneNumber || "");

            // Convert date into YYYY-MM-DD for input type="date"
            if (user.dateOfBirth) {
                const date = new Date(user.dateOfBirth);

                if (!isNaN(date.getTime())) {
                    setdateOfBirth(
                        date.toISOString().split("T")[0]
                    );
                }
            } else {
                setdateOfBirth("");
            }

            setgender(user.gender || "");
            setaddress(user.address || "");
            setcity(user.city || "");
            setstate(user.state || "");
            setpinCode(user.pinCode || "");
            setcountry(user.country || "India");
        }
    }, [user]);

    // =========================
    // PROFILE PHOTO HANDLER
    // =========================

    const onchangehandler = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setprofilephoto(file);
        }
    };

    // =========================
    // UPDATE PROFILE
    // =========================

    const updateuserhandler = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("pinCode", pinCode);
        formData.append("country", country);

        // Only append photo if user selected a new one
        if (profilephoto) {
            formData.append("profilePhoto", profilephoto);
        }

        await updateuser(formData);
    };

    // =========================
    // UPDATE RESPONSE
    // =========================

    useEffect(() => {
        if (isSuccess) {
            refetch();

            toast.success(
                updateuserdata?.message ||
                "Profile updated successfully"
            );

            // Reset selected photo after successful update
            setprofilephoto("");
        }

        if (isError) {
            toast.error(
                error?.data?.message ||
                error?.message ||
                "Failed to update profile"
            );
        }
    }, [
        isSuccess,
        isError,
        updateuserdata,
        error,
        refetch,
    ]);

    // =========================
    // LOADING
    // =========================

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // =========================
    // PROFILE PAGE
    // =========================

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">

            {/* ================= HEADER ================= */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your personal information and profile settings.
                </p>
            </div>

            {/* ================= PROFILE CARD ================= */}

            <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">

                <div className="flex flex-col gap-8 md:flex-row md:items-start">

                    {/* ================= AVATAR ================= */}

                    <div className="flex flex-col items-center md:w-40">

                        <div className="relative">

                            <Avatar className="h-28 w-28 border-4 border-background shadow-md md:h-32 md:w-32">

                                <AvatarImage
                                    src={
                                        user?.photoUrl ||
                                        "https://github.com/shadcn.png"
                                    }
                                    alt={user?.name || "Profile"}
                                />

                                <AvatarFallback>
                                    {user?.name
                                        ?.split(" ")
                                        .map((word) => word[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase() || "U"}
                                </AvatarFallback>

                            </Avatar>

                            <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm">
                                <Camera className="h-4 w-4 text-muted-foreground" />
                            </div>

                        </div>

                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Profile photo
                        </p>

                    </div>

                    {/* ================= USER INFORMATION ================= */}

                    <div className="flex-1">

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* NAME */}

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Full Name
                                </p>

                                <p className="font-medium">
                                    {user?.name || "Not provided"}
                                </p>
                            </div>

                            {/* EMAIL */}

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-medium break-all">
                                    {user?.email || "Not provided"}
                                </p>
                            </div>

                            {/* PHONE */}

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Phone
                                </p>

                                <p className="font-medium">
                                    {user?.phoneNumber || "Not provided"}
                                </p>
                            </div>

                            {/* ROLE */}

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Role
                                </p>

                                <p className="font-medium">
                                    {user?.role?.toUpperCase() || "STUDENT"}
                                </p>
                            </div>

                        </div>

                        {/* EDIT BUTTON */}

                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={(open) => {
                                if (!updateuserisLoading) {
                                    setIsDialogOpen(open);
                                }
                            }}
                        >

                            <DialogTrigger asChild>
                                <Button className="mt-6">
                                    Edit Profile
                                </Button>
                            </DialogTrigger>

                            {/* ================= EDIT PROFILE DIALOG ================= */}

                            <DialogContent onPointerDownOutside={(e) => {
                                if (updateuserisLoading) {
                                    e.preventDefault();
                                }
                            }}
                                onEscapeKeyDown={(e) => {
                                    if (updateuserisLoading) {
                                        e.preventDefault();
                                    }
                                }}
                                className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">

                                <DialogHeader>

                                    <DialogTitle className="text-xl">
                                        Edit Profile
                                    </DialogTitle>

                                    <DialogDescription>
                                        Update your personal information and profile
                                        photo. Click save when you're done.
                                    </DialogDescription>

                                </DialogHeader>

                                <div className="space-y-7 py-4">

                                    {/* ================= PROFILE PHOTO ================= */}

                                    <div className="flex flex-col items-center gap-3">

                                        <Avatar className="h-24 w-24 border shadow-sm">

                                            <AvatarImage
                                                src={
                                                    profilephoto
                                                        ? URL.createObjectURL(profilephoto)
                                                        : user?.photoUrl ||
                                                        "https://github.com/shadcn.png"
                                                }
                                                alt={user?.name || "Profile"}
                                            />

                                            <AvatarFallback>
                                                {user?.name
                                                    ?.split(" ")
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase() || "U"}
                                            </AvatarFallback>

                                        </Avatar>

                                        <div className="flex flex-col items-center gap-2">

                                            <Label
                                                htmlFor="profilePhoto"
                                                className="cursor-pointer"
                                            >
                                                <span className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                                                    <Camera className="h-4 w-4" />
                                                    Change Photo
                                                </span>
                                            </Label>

                                            <Input
                                                id="profilePhoto"
                                                type="file"
                                                disabled={updateuserisLoading}
                                                onChange={onchangehandler}
                                                accept="image/*"
                                                className="hidden"
                                            />

                                            {profilephoto && (
                                                <p className="max-w-xs truncate text-xs text-muted-foreground">
                                                    {profilephoto.name}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                    {/* ================= PERSONAL INFORMATION ================= */}

                                    <div className="space-y-4">

                                        <div>
                                            <h3 className="font-semibold">
                                                Personal Information
                                            </h3>

                                            <p className="text-xs text-muted-foreground">
                                                Update your basic personal details.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">

                                            {/* FULL NAME */}

                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Full Name
                                                </Label>

                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <Input
                                                        id="name"
                                                        disabled={updateuserisLoading}
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setname(e.target.value)
                                                        }
                                                        placeholder="Full name"
                                                        className="pl-10"
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
                                                        disabled={updateuserisLoading}
                                                        type="tel"
                                                        inputMode="numeric"
                                                        maxLength={10}
                                                        value={phoneNumber}
                                                        onChange={(e) =>
                                                            setphoneNumber(e.target.value)
                                                        }
                                                        placeholder="9876543210"
                                                        className="pl-10"
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
                                                        type="date"
                                                        disabled={updateuserisLoading}
                                                        value={dateOfBirth}
                                                        onChange={(e) =>
                                                            setdateOfBirth(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                            {/* GENDER */}

                                            <div className="space-y-2">
                                                <Label>
                                                    Gender
                                                </Label>

                                                <Select
                                                    value={gender}
                                                    disabled={updateuserisLoading}
                                                    onValueChange={(value) =>
                                                        setgender(value)
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>

                                                    <SelectContent>
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

                                    {/* ================= ADDRESS ================= */}

                                    <div className="space-y-4">

                                        <div>
                                            <h3 className="font-semibold">
                                                Address
                                            </h3>

                                            <p className="text-xs text-muted-foreground">
                                                Update your location details.
                                            </p>
                                        </div>

                                        {/* ADDRESS */}

                                        <div className="space-y-2">
                                            <Label htmlFor="address">
                                                Address
                                            </Label>

                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                                <Input
                                                    id="address"
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) =>
                                                        setaddress(e.target.value)
                                                    }
                                                    placeholder="House number, street, locality"
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">

                                            {/* CITY */}

                                            <div className="space-y-2">
                                                <Label htmlFor="city">
                                                    City
                                                </Label>

                                                <div className="relative">
                                                    <Map className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <Input
                                                        id="city"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) =>
                                                            setcity(e.target.value)
                                                        }
                                                        placeholder="City"
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                            {/* STATE */}

                                            <div className="space-y-2">
                                                <Label htmlFor="state">
                                                    State
                                                </Label>

                                                <Input
                                                    id="state"
                                                    type="text"
                                                    value={state}
                                                    onChange={(e) =>
                                                        setstate(e.target.value)
                                                    }
                                                    placeholder="State"
                                                />
                                            </div>

                                            {/* PIN CODE */}

                                            <div className="space-y-2">
                                                <Label htmlFor="pinCode">
                                                    PIN Code
                                                </Label>

                                                <Input
                                                    id="pinCode"
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={6}
                                                    value={pinCode}
                                                    onChange={(e) =>
                                                        setpinCode(e.target.value)
                                                    }
                                                    placeholder="263139"
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
                                                        type="text"
                                                        value={country}
                                                        onChange={(e) =>
                                                            setcountry(e.target.value)
                                                        }
                                                        placeholder="India"
                                                        className="pl-10"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    {/* ================= ACCOUNT INFO ================= */}

                                    <div className="space-y-4">

                                        <div>
                                            <h3 className="font-semibold">
                                                Account Information
                                            </h3>

                                            <p className="text-xs text-muted-foreground">
                                                Some account information cannot be changed
                                                here.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">

                                            {/* EMAIL - READ ONLY */}

                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>

                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={user?.email || ""}
                                                        disabled
                                                        className="pl-10"
                                                    />
                                                </div>

                                                <p className="text-xs text-muted-foreground">
                                                    Email cannot be changed here.
                                                </p>
                                            </div>

                                            {/* ROLE - READ ONLY */}

                                            <div className="space-y-2">
                                                <Label htmlFor="role">
                                                    Role
                                                </Label>

                                                <Input
                                                    id="role"
                                                    value={
                                                        user?.role?.toUpperCase() ||
                                                        "STUDENT"
                                                    }
                                                    disabled
                                                />

                                                <p className="text-xs text-muted-foreground">
                                                    Role is managed by the administrator.
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* ================= FOOTER ================= */}

                                <DialogFooter>

                                    <Button
                                        disabled={updateuserisLoading}
                                        onClick={updateuserhandler}
                                    >
                                        {updateuserisLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>

                                </DialogFooter>

                            </DialogContent>

                        </Dialog>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;

