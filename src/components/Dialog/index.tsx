"use-client";

import React, { ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import style from "./Dialog.module.css";

export default function Dialog({
  children,
  open = false,
  dismiss = true,
  onClose,
  disabled,
}: {
  children: ReactNode;
  open?: boolean;
  dismiss?: boolean;
  onClose: () => void;
  disabled?: boolean;
}) {
  const dialogId = useId();

  useEffect(() => {
    if (disabled) return;
    const handleClose = (e: any) => {
      const id: string = e.target.id;
      if (id === dialogId && dismiss) {
        onClose();
      }
    };

    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [dialogId, disabled, dismiss, onClose]);

  if (!open) return <></>;

  return createPortal(
    <div id={dialogId} className={style.modal}>
      <div className={style.modalContent}>{children}</div>
    </div>,
    document.getElementById("main-app") as HTMLElement
  );
}
