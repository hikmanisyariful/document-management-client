import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "./Notification.module.css";

export default function Notification({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  if (!open) return <></>;

  return createPortal(
    <div className={style.notification}>{children}</div>,
    document.getElementById("main-app") as HTMLElement
  );
}
