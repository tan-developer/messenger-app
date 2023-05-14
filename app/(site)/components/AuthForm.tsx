"use client";

import React, { useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { BsGithub, BsGoogle } from "react-icons/bs";

import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button/Button";

import { signIn, useSession } from "next-auth/react";

import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

export type Variant = "LOGIN" | "REGISTER";

const AuthForm: React.FC = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = React.useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if(session?.status === 'authenticated'){
      router.push("/users")
    }
  } , [session.status])

  const toggleVariant = React.useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => toast.success("Register successfully !"))
        .then(() => signIn('credentials' , data))
        
        .catch((err) => {
          console.log(err);
          toast.error("Some thing when wrong!");
        })
        .finally(async () => {
          await setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback.error) {
            toast.success("Login successfully !");
            router.push('/users')
          }
        })
        .finally(async () => {
          await setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }

        if (callback?.ok && !callback.error) {
          toast.success("Login successfully !");
        }
      })
      .finally(async () => {
        await setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disable={isLoading}
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            disable={isLoading}
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            disable={isLoading}
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disable={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              disable={isLoading}
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              disable={isLoading}
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messengers?"
              : "Already have an account?"}
          </div>

          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
