"use client";

import { useAppDispatch } from "@/redux/hooks";
import { clearSession } from "@/redux/reducer/login";
import { useRouter } from "next/navigation";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          dispatch(clearSession());
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
