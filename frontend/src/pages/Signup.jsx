
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { FormInput } from "../components/FormInput";
import { signupFields } from "../components/SignupFields";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_ROUTES from "../config.js/apiRoutes";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import apiClient from "../config.js/axiosConfig";

const userSchema = z.object({
  userName: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .email("Username must be a valid email address"),
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(3, "Last name must be at least 3 characters long")
    .max(50, "Last name must be at most 50 characters long"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const Signup = () => {
  useAuthRedirect("signup.jsx");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await apiClient.post(API_ROUTES.SIGNUP, data);
      toast.success(result.data.msg);
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-96 text-center p-6 shadow-md">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {signupFields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              register={register}
              error={errors[field.name]?.message}
            />
          ))}
          <div className="pt-4">
            <Button label="Sign up" type="submit" disabled={loading} />
          </div>
        </form>
        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
};
