import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import uploadStyle from "./Upload.module.css";
import { useAppSelector } from "@/redux/hooks";
import { selectDocuments } from "@/redux/reducer/document";
import { FetchState } from "@/interface/Fetch";
import { AiOutlinePlus } from "react-icons/ai";

export default function UploadFile({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const dataDocuments = useAppSelector(selectDocuments);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>(
    "File format must be in pdf format."
  );

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file.size <= 1048576 && file.type === "application/pdf") {
      onChange(e);
      return;
    }

    if (file.size > 1048576) {
      setError("File size is more than 1mb.");
    }

    if (file.type !== "application/pdf") {
      setError("File format must be in pdf format.");
    }

    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      setError(undefined);
    };
  }, []);

  return (
    <>
      {error && <div className={uploadStyle.error}>{error}</div>}
      <div className={uploadStyle.card}>
        {dataDocuments.statusUpload === FetchState.LOADING ? (
          <div>Loading</div>
        ) : (
          <>
            <input
              type="file"
              className={uploadStyle.formControl}
              onChange={handleOnChange}
              accept="pdf, application/pdf"
              ref={inputRef}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <div
              className={uploadStyle.icon}
              onClick={(e) => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                  inputRef.current.click();
                }
              }}
            >
              <AiOutlinePlus />
            </div>
          </>
        )}
      </div>
    </>
  );
}
