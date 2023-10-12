import React from "react";
import Button from "../Button";
import dashboardStyle from "../../layouts/Dashboard/Dashboard.module.css";

import { useAppDispatch } from "@/redux/hooks";
import { clearSession } from "@/redux/reducer/login";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className={dashboardStyle.header}>
      <h1 className={dashboardStyle.title}>Title</h1>
      <Button
        size="small"
        onClick={() => {
          dispatch(clearSession());
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
