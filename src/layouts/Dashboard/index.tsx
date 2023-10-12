"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import dashboardStyle from "./Dashboard.module.css";
import Table from "@/components/Table";
import Button from "@/components/Button";
import UploadFile from "@/components/UploadFile";
import {
  getDocuments,
  selectDocuments,
  uploadFile,
} from "@/redux/reducer/document";
import { ChangeEventHandler, useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import { AiOutlineClose } from "react-icons/ai";
import Header from "@/components/Header";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const dataDocuments = useAppSelector(selectDocuments);
  const [openModal, setOpenModal] = useState(false);

  const handelOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    dispatch(uploadFile(file))
      .unwrap()
      .then((_) => {
        dispatch(getDocuments()).unwrap();
      })
      .then((_) => {
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const promise = dispatch(getDocuments());

    promise.unwrap().catch((error) => {
      console.log(error);
    });
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <div className={dashboardStyle.container}>
        <Header />

        <div className={dashboardStyle.content}>
          <div className={dashboardStyle.info}>
            <span className={dashboardStyle.welcome}>
              Welcome <span className={dashboardStyle.username}>Username</span>
            </span>
            <span className={dashboardStyle.description}>
              Upload, Manage and Verified your document
            </span>

            <div className={dashboardStyle.note}>
              Note: Only role as SPV which can update status document. Make sure
              your role!
            </div>

            <div className={dashboardStyle.uploadWrapper}>
              <Button
                className={dashboardStyle.buttonFullWidth}
                onClick={() => setOpenModal(true)}
              >
                Upload File
              </Button>
              <Dialog
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
              >
                <div className={dashboardStyle.uploadCard}>
                  <div className={dashboardStyle.modalClose}>
                    <AiOutlineClose onClick={() => setOpenModal(false)} />
                  </div>

                  <div className={dashboardStyle.uploadInfo}>
                    <div className={dashboardStyle.title}>Upload File</div>
                    <p>
                      Your data will be saved automatically. Please upload the
                      valid document.
                    </p>
                    <p>File format must be in pdf format.</p>
                    <p>Maximum of 1MB in file size.</p>
                  </div>
                  <div className={dashboardStyle.uploadInput}>
                    <UploadFile onChange={handelOnChange} />
                    <span>Upload here</span>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>

          <div className={dashboardStyle.tableWrapper}>
            {dataDocuments.data ? (
              <Table data={dataDocuments.data} />
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
