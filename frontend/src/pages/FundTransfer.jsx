import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountField } from "../components/SignupFields";
import { FormInput } from "../components/FormInput";
import { useState } from "react";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import apiClient from "../config.js/axiosConfig";
import API_ROUTES from "../config.js/apiRoutes";

const amountSchema = z.object({
    amount: z
      .string()
      .nonempty({ message: "Amount is required" })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Amount must be a positive number",
      }),
  });
  
export const FundTransfer = () => {
  useAuthRedirect("haha");
  const [searchParams] = useSearchParams();
  const toId = searchParams.get("id");
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(amountSchema) });
//   const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {

        data["to"] = toId;
      console.log(data);
      const result = await apiClient.post(API_ROUTES.FUNDTRANSFER, data)
      toast.success(result.data.msg);
      reset()

    } catch (error) {
        reset()
      toast.error(error.response.data.msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center ">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {amountField.map((field) => (
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
                  <Button
                    label={"Initiate Ammount"}
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
