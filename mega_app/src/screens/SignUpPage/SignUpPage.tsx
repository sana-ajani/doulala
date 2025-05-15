import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useUser } from "../../context/UserContext";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const ethnicities = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "Middle Eastern or North African",
  "Native Hawaiian or Pacific Islander",
  "White"
];

const preExistingConditions = [
  "None",
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Asthma",
  "Thyroid Disorder",
  "Anxiety",
  "Depression",
  "Other"
];

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  ethnicity: z.string().min(1, "Please select your ethnicity"),
  location: z.string().min(1, "Please select your location"),
  income: z.string().optional(),
  preExistingConditions: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign up data:", data);
    setUserName(data.name);
    navigate("/home");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-[402px] relative">
        {/* Status bar */}
        <header className="flex flex-col w-full h-[50px] items-start pt-[21px] pb-0 px-0 bg-white">
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center justify-center gap-2.5 pl-4 pr-1.5 py-0 relative flex-1">
              <div className="relative w-fit mt-[-1.00px] font-semibold text-black text-[17px] text-center tracking-[0] leading-[22px]">
                9:41
              </div>
            </div>
            <div className="flex items-center justify-center gap-[7px] pl-1.5 pr-4 py-0 relative flex-1">
              <img
                className="relative w-[19.2px] h-[12.23px]"
                alt="Cellular connection"
                src="/cellular-connection.svg"
              />
              <img
                className="relative w-[17.14px] h-[12.33px]"
                alt="Wifi"
                src="/wifi.svg"
              />
              <div className="relative w-[27.33px] h-[13px]">
                <div className="absolute w-[25px] h-[13px] top-0 left-0 rounded-[4.3px] border border-solid border-[#00000059]">
                  <div className="relative w-[21px] h-[9px] top-px left-px bg-black rounded-[2.5px]" />
                </div>
                <img
                  className="absolute w-px h-1 top-[5px] left-[26px]"
                  alt="Cap"
                  src="/cap.svg"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Back button */}
        <Button
          variant="ghost"
          className="absolute top-16 left-4"
          onClick={() => navigate("/")}
        >
          ← Back
        </Button>

        {/* Sign Up Form */}
        <Card className="w-[350px] mx-auto mt-24 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#082154]">
              Sign Up
            </CardTitle>
            <p className="text-center text-[#082154] mt-2">
              Provide us with a few additional details to help customize your experience
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Race / Ethnicity
                </label>
                <select
                  {...register("ethnicity")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                >
                  <option value="">Select your ethnicity</option>
                  {ethnicities.map((ethnicity) => (
                    <option key={ethnicity} value={ethnicity}>
                      {ethnicity}
                    </option>
                  ))}
                </select>
                {errors.ethnicity && (
                  <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Location
                </label>
                <select
                  {...register("location")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Income
                </label>
                <select
                  {...register("income")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                >
                  <option value="">Select your income range</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#082154]">
                  Pre-existing Conditions
                </label>
                <select
                  {...register("preExistingConditions")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#082154]"
                >
                  <option value="">Select condition</option>
                  {preExistingConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#082154] text-white hover:bg-[#082154]/90"
              >
                Sign Up
              </Button>
            </form>

            {/* Doulala Logo */}
            <div className="mt-8 flex justify-center">
              <img
                src="/image-3.png"
                alt="Doulala Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
          </CardContent>
        </Card>

        {/* Home indicator */}
        <div className="absolute w-full h-[34px] bottom-0">
          <div className="relative w-36 h-[5px] mx-auto mt-[21px] bg-black rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};