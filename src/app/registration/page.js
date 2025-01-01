"use client";
import React, { useState } from "react";
import Link from "next/link";
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
import { createClient } from "@/utils/supabase/component";

const NEW_TEAM = "newTeam";
const EXISTING_TEAM = "existingTeam";
const NONE = "none";

const formSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    country: z.string().min(1, 'Country is required'),
    university: z.string().min(1, 'University is required'),
    // Password requirements validation to ensure password conforms to supabase auth requirements
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),,
    teamname: z.string(),
    teamcode: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

const styles = {
    previousButton: "px-6 py-4 font-semibold bg-white text-blue-dark",
    nextButton: "px-6 py-4 font-semibold bg-blue-mid text-white",
};

const FormFieldComponent = ({ control, name, label, description, placeholder, type = "text", disabled}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className={`text-white text-lg`}>{label} <span className="text-[#ff0000]">*</span><br/><span className="text-yellow-mid text-sm font-medium">{description}</span></FormLabel>
        <FormControl>
          <Input placeholder={placeholder} disabled={disabled} type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

function PersonalInformation({ control }) {
  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
      <h2 className="font-bold text-xl mb-6">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-6">
          <FormFieldComponent
            control={control}
            name="first_name"
            label="First Name"
            placeholder="Enter your first name"
          />
          <FormFieldComponent
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <FormFieldComponent
            control={control}
            name="country"
            label="Country"
            placeholder="Enter your country"
          />
        </div>

        {/* Second Column */}
        <div className="space-y-6">
          <FormFieldComponent
            control={control}
            name="last_name"
            label="Last Name"
            placeholder="Enter your last name"
          />
          <FormFieldComponent
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
          />
          <FormFieldComponent
            control={control}
            name="university"
            label="University"
            placeholder="Enter your university"
          />
        </div>
      </div>
    </div>
  );
}

function CreateAccount({ control }) {
  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
      <h2 className="font-bold text-xl mb-6">
        Create Account
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <FormFieldComponent
          control={control}
          name="email"
          label="Email"
        //   placeholder="Enter your username"
        />
        <FormFieldComponent
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <FormFieldComponent
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
      </div>
    </div>
  );
}

function RegisterTeam({ control, generateCode, copyCode, teamType, setTeam, codeGenerated }) {
  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input text-white">
      <h2 className="font-bold text-xl mb-6">
        Team Information
      </h2>

      {teamType === NONE && (
        <>
          <div className="space-y-6">
            <Button onClick={() => setTeam(NEW_TEAM)} className="text-xl p-8 w-full bg-yellow-dark">
              Create a New Team
            </Button>
            <Button onClick={() => setTeam(EXISTING_TEAM)} className="text-xl p-8 w-full bg-blue-mid">
              Join an Existing Team
            </Button>
          </div>
        </>
      )}

      {teamType === NEW_TEAM && (
        <>
          <h2 className="font-bold text-xl text-yellow-dark mb-6">
            Create a New Team
          </h2>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div className="grid grid-cols-4 justify-between items-end gap-4">
              <div className="col-span-3">
                <FormFieldComponent
                  control={control}
                  name="team_name"
                  label="Team Name"
                  placeholder="Enter your team name."
                />
              </div>
              <div className="col-span-1">
                <Button onClick={generateCode} disabled={codeGenerated} type="button" className="w-full bg-yellow-dark">Generate Code</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 justify-between items-end gap-4">
              <div className="col-span-3">
                <FormFieldComponent
                  control={control}
                  name="team_code"
                  label="Team Code"
                  placeholder="Team Code"
                  description={"Share this code with your team members to join this team."}
                  disabled={true}
                />
              </div>
              <div className="col-span-1">
                <Button onClick={copyCode} type="button" className="w-full bg-blue-mid">Copy Code</Button>
              </div>
            </div>
          </div>
        </>
      )}

      {teamType === EXISTING_TEAM && (
        <>
          <h2 className="font-bold text-xl text-blue-mid mb-6">
            Join an Existing Team
          </h2>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div className="grid grid-cols-4 justify-between items-end gap-4">
              <div className="col-span-4">
                <FormFieldComponent
                  control={control}
                  name="team_code"
                  label="Team Code"
                  placeholder="Team Code"
                  description={"Enter the team code provided by your team leader."}
                />
              </div>
              {/* <div className="col-span-1">
                <Button type="button" className="w-full bg-blue-mid">Confirm</Button>
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ConfirmRegistration({ form }) {
  return (
    <div className="flex flex-col justify-center items-center text-white gap-6 pt-20">
      <div><h1 className="font-bold text-5xl">Congratulations!</h1></div>
      <div><p className="font-semibold text-lg">Thank you for registering for BizMaker!</p></div>
      <div><p className="font-medium text-lg"><br />A confirmation email has been sent to {form.getValues("email")}.</p></div>
      <div className="p-8">
        {/* TODO:  Need to register current page as homepage page so that it reflects on the navbar*/}
        <Link href='/'>
            <p className="rounded-full px-6 py-4 bg-blue-mid text-white font-semibold">Return to Home Page</p>
        </Link>
      </div>
    </div>
  );
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [teamType, setTeamType] = useState(NONE);
  const [codeGenerated, setCodeGenerated] = useState(false);
  const supabase = createClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "Wei En",
      last_name: "Looi",
      email: "looi.weien02@gmail.com",
      phone: "0135883813",
      country: "Malaysia",
      university: "shit",
      // password: "P@ssw0rd",
      // confirmPassword: "P@ssw0rd",
      password: "sdf",
      confirmPassword: "sdf",
      team_name: "",
      team_code: "",
      role: "",
    }
  });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  function setTeam(teamType) {
    setTeamType(teamType);
    if (teamType === NEW_TEAM){
      form.role = "leader"
    } else if (teamType === EXISTING_TEAM) {
      form.role = "member"
    } else {
      form.role = ""
    }
  }

  function generateCode() {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    form.setValue("team_code", newCode);
    setCodeGenerated(true);
  }

  function copyCode() {
    const code = form.getValues("team_code");
    navigator.clipboard.writeText(code).then(() => {
      alert("Team code copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy team code: ", err);
    });
  }

  async function insertParticipant(user, values) {
    const { data, error } = await supabase
      .from('Participants')
      .insert([{
        participant_id: user.id,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        country: values.country,
        university: values.university,
        team_code: values.team_code,
        role: values.role
      }]);
  
    if (error){
      console.error('Failed to create participant profile:', error);
      throw new Error('Failed to create participant profile');
    } 
    return data;
  }
  
  async function insertTeam(values) {
    const { data, error } = await supabase
      .from('Team')
      .insert([{
        team_name: values.team_name,
        team_code: values.team_code
      }]);
  
    if (error) {
      console.log('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
    return data;
  }
  
  async function onSubmit(values) {
    if (step !== 3) {
      handleNext();
      return;
    }
  
    try {
      // Step 1: Create auth user
      const { error, user } = await supabase.auth.signUp({ 
        email: values.email, 
        password: values.password 
      });
      if (error) throw new Error('Failed to create user account');
  
      // Step 2: Create participant profile
      await insertParticipant(user, values);
  
      // Step 3: Create team if leader, leader indicates new team
      if (values.role === "leader") {
        await insertTeam(values);
      }
  
      // Success - move to next step
      handleNext();
  
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.message || 'Registration failed. Please try again.');
    }
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <TopBanner
        title="Registration"
        description="Each team can have up to 5 members"
      />
      <div className="container mx-auto p-8 min-h-[640px] flex flex-col justify-between">
        <div className="w-full mx-auto my-6">
          {step === 4 ? "" : <ProgressBar progress={step} />}
        </div>
        <Form {...form} className="flex">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
            <div className="grow">
              {step === 1 && <PersonalInformation control={form.control} />}
              {step === 2 && <CreateAccount control={form.control} />}
              {step === 3 && <RegisterTeam control={form.control} generateCode={generateCode} copyCode={copyCode} teamType={teamType} setTeam={setTeam} form={form} codeGenerated={codeGenerated}/>}
              {step === 4 && <ConfirmRegistration form={form} />}
            </div>
            <div className="max-w-4xl w-full mx-auto p-4 md:p-8 flex justify-between">
              {step > 1 && (step < 4) && (
                <Button type="button" onClick={teamType === NONE ? handlePrevious : () => setTeam(NONE)} className={styles.previousButton}>
                  Previous
                </Button>
              )}
              {step < 4 && (step !== 3 || teamType !== NONE) && (
                <Button
                  type={step === 3 ? "submit" : "button"} 
                  onClick={step === 3 ? undefined : handleNext}
                  className={styles.nextButton}>
                  {step === 3 ? "Sign Up" : "Next →"}
                </Button>
              )}            
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
