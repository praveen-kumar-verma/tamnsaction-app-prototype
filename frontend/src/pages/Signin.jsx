import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { z } from "zod";
import { FormInput } from "../components/FormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinFields } from "../components/SignupFields";
import API_ROUTES from "../config.js/apiRoutes";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import apiClient from "../config.js/axiosConfig";

const userSchema = z.object({
  userName: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .email("Username must be a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
export const Signin = () => {
  useAuthRedirect("sigin.jsx");
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
      console.log(data);

      const result = await apiClient.post(API_ROUTES.LOGIN,data);     
      toast.success(result.data.msg);
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");

    } catch (error) {
      console.log(error)

      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {signinFields.map((field) => (
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
            <Button label={"Sign in"} type="submit" disabled={loading} />
          </div>
          </form>



          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
