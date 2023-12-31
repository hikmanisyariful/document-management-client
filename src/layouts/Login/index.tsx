"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import loginStyle from "./Login.module.css";
import Background from "@/components/Background";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, selectLogin, setSession } from "@/redux/reducer/login";
import { useRouter } from "next/navigation";
import { FetchState } from "@/interface/Fetch";

type FormValues = {
  email: string;
  password: string;
};

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginData = useAppSelector(selectLogin);
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { ...defaultValues },
  });

  const { handleSubmit, reset } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    dispatch(login(data))
      .unwrap()
      .then((res: any) => {
        reset();
        dispatch(setSession(res.data));
        router.push("/dashboard");
      });
  };

  return (
    <Background>
      <div className={loginStyle.formSection}>
        <FormProvider {...methods}>
          <h1>Hello</h1>
          <p>Enter your email and password to login.</p>
          <form
            className={loginStyle.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField name="email" label="Email" type="email" required />
            <InputField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              toggleEye={(e) => {
                setShowPassword(e);
              }}
            />
            <div className={loginStyle.buttonSubmit}>
              <Button
                type="submit"
                variant="primary"
                className={loginStyle.fullWidth}
                loading={loginData.status === FetchState.LOADING}
              >
                Login
              </Button>
            </div>

            <div className="divider">
              <span>Do not have account? </span>
              <Button href="/register">Register</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Background>
  );
}
