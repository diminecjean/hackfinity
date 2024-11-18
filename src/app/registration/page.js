"use client";
import React, { useState } from "react";
import TopBanner from "@/components/custom/top-banner";
import ProgressBar from "./progress-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CountrySelect from "./country-select";

const formSchema = z.object({
//   firstName: z.string().min(1, 'First name is required'),
//   lastName: z.string().min(1, 'Last name is required'),
//   email: z.string().email('Invalid email address'),
//   phone: z.string().min(1, 'Phone number is required'),
//   country: z.string().min(1, 'Country is required'),
//   university: z.string().min(1, 'University is required'),

//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(1, 'Password is required'),

  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  university: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});

const FormFieldComponent = ({ control, name, label, description, placeholder, type = "text" }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-white text-lg">{label}<br/><span className="text-yellow-mid text-sm font-medium">{description}</span></FormLabel>
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

function PersonalInformation({ onNext }) {
    const [countryCode, setCountryCode] = useState("");
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        university: "",
        }
    });

    function onSubmit(values) {
        console.log(values);
        onNext();
    }

  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
      <h2 className="font-bold text-xl mb-6">
        Profile Information
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column */}
            <div className="space-y-6">
                <FormFieldComponent
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                />
                <FormFieldComponent
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                />
                <FormItem>
                    <FormLabel className="text-white text-lg pb-2">Country</FormLabel>
                    <Controller
                        name="country"
                        control={form.control}
                        render={({ field }) => (
                            <CountrySelect
                            {...field}
                            onChange={(value) => field.onChange(value)}
                            priorityOptions={["MY"]}
                            placeholder="Select your country"
                            />
                        )}
                    />
                </FormItem>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <FormFieldComponent
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
              <FormFieldComponent
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <FormFieldComponent
                control={form.control}
                name="university"
                label="University"
                placeholder="Enter your university"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" className="w-32 bg-blue-mid">
              Next →
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function CreateAccount({ onPrevious, onNext }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
      <h2 className="font-bold text-xl mb-6">
        Create Account
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <FormFieldComponent
              control={form.control}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <FormFieldComponent
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="email"
            />
            <FormFieldComponent
              control={form.control}
              name="password"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
          </div>
          {/* Add checkbox to agree to terms */}

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={onPrevious} className="w-32 bg-blue-light">
              Previous
            </Button>
            <Button type="submit" onClick={onNext} className="w-32 bg-blue-mid">
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function RegisterTeam(){
    const NEW_TEAM = "newTeam";
    const EXISTING_TEAM = "existingTeam";
    const NONE = "none";
    const [teamType, setTeamType] = useState("none");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        }
      });

      function onSubmit(values) {
        console.log(values);
      }
    
    return (
        <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
            <h2 className="font-bold text-xl mb-6">
                Team Information
            </h2>

            {
                teamType === NONE && (
                    <div className="space-y-6">
                        <Button onClick={() => setTeamType(NEW_TEAM)} className="text-xl p-8 w-full bg-yellow-dark">
                            Create a New Team
                        </Button>
                        <Button onClick={() => setTeamType(EXISTING_TEAM)} className="text-xl p-8 w-full bg-blue-mid">
                            Join an Existing Team
                        </Button>
                    </div>
                )
            }
            {
                teamType === NEW_TEAM && (
                    <>
                        <h2 className="font-bold text-xl text-yellow-dark mb-6">
                            Create a New Team
                        </h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 my-12">
                                <div className="grid grid-cols-4 justify-between items-end gap-4">
                                    <div className="col-span-3">
                                        <FormFieldComponent
                                        control={form.control}
                                        name="teamname"
                                        label="Team Name"
                                        placeholder="Enter your team name."
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Button type="button" className="w-full bg-yellow-dark">Generate Code </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 justify-between items-end gap-4">
                                    <div className="col-span-3">
                                        <FormFieldComponent
                                        control={form.control}
                                        name="teamcode"
                                        label="Team Code"
                                        placeholder="Team Code"
                                        description={"Share this code with your team members to join this team."}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Button type="button" className="w-full bg-blue-mid">Copy Code </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <Button type="button" onClick={() => setTeamType(NONE)} className="w-32 bg-blue-light">
                                Previous
                                </Button>
                                <Button type="submit" className="w-32 bg-blue-mid">
                                Sign Up
                                </Button>
                            </div>
                            </form>
                        </Form>
                    </>
                )
            }
            {
                teamType === EXISTING_TEAM && (
                    <>
                        <h2 className="font-bold text-xl text-blue-mid mb-6">
                            Join an Existing Team
                        </h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 my-12">
                                <div className="grid grid-cols-4 justify-between items-end gap-4">
                                <div className="col-span-3">
                                        <FormFieldComponent
                                        control={form.control}
                                        name="teamcode"
                                        label="Team Code"
                                        placeholder="Team Code"
                                        description={"Enter the team code provided by your team leader."}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Button type="button" className="w-full bg-blue-mid">Confirm</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <Button type="button" onClick={() => setTeamType(NONE)} className="w-32 bg-blue-light">
                                Previous
                                </Button>
                                <Button type="submit" className="w-32 bg-blue-mid">
                                Sign Up
                                </Button>
                            </div>
                            </form>
                        </Form>
                    </>
                )
            }

        </div>
    )
}

export default function Registration() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <TopBanner
        title="Registration"
        description="Each team can have up to 5 members"
      />
      <div className="container mx-auto px-4 min-h-[450px]">
        <div className="w-full mx-auto my-8">
          <ProgressBar progress={step} />
        </div>
        {step === 1 && <PersonalInformation onNext={handleNext} />}
        {step === 2 && <CreateAccount onPrevious={handlePrevious} onNext={handleNext} />}
        {step === 3 && <RegisterTeam />}
      </div>
    </div>
  );
}