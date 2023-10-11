"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import registerStyles from "./Register.module.css";
import Background from "@/components/Background";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FetchState } from "@/interface/Fetch";
import Dropdwon from "@/components/Dropdown";
import { register, selectRegister } from "@/redux/reducer/register";

type FormValues = {
  username: string;
  email: string;
  password: string;
  roleId?: number;
};

const options = [
  {
    id: 1,
    name: "User",
  },
  {
    id: 2,
    name: "SPV",
  },
];

const defaultValues: FormValues = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterLayout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const registerData = useAppSelector(selectRegister);
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { ...defaultValues },
  });

  const { handleSubmit, reset, setValue } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    dispatch(register(data))
      .unwrap()
      .then((res: any) => {
        reset();
        router.push("/login");
      });
  };

  return (
    <Background>
      <div className={registerStyles.formSection}>
        <FormProvider {...methods}>
          <h1>Welcome</h1>
          <p>Register your accout to get access.</p>
          <form
            className={registerStyles.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField name="username" label="Username" type="text" required />
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
            <Dropdwon
              name="role"
              label="Role"
              options={options}
              onChange={(e) => {
                setValue("roleId", e.id);
              }}
            />
            <div className={registerStyles.buttonSubmit}>
              <Button
                type="submit"
                variant="primary"
                className={registerStyles.fullWidth}
                loading={registerData.status === FetchState.LOADING}
              >
                Register
              </Button>
            </div>

            <div className="divider">
              <span>Do have account? </span>
              <Button href="/login">Login</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Background>
  );
}
