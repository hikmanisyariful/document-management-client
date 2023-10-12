"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import style from "./Document.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteDocument,
  getDetailDocument,
  selectDetailDocument,
} from "@/redux/reducer/detailDocument";
import { FetchState } from "@/interface/Fetch";
import { formatDate } from "@/utils/helpers";
import { BsTrashFill } from "react-icons/bs";
import Dialog from "@/components/Dialog";
import Notification from "@/components/Notification";

export default function DocumentDetailLayout({
  documentId,
}: {
  documentId: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isReview, setIsReview] = useState(false);
  const dataDetailDocument = useAppSelector(selectDetailDocument);
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    const promise = dispatch(getDetailDocument(documentId));

    promise.unwrap().catch((error) => {
      console.log(error);
    });
    return () => {
      promise.abort();
    };
  }, [dispatch, documentId]);

  return (
    <div className={style.container}>
      <Header />

      {dataDetailDocument.status === FetchState.LOADING ? (
        <div>Loading</div>
      ) : (
        <div className={style.section}>
          <div className={style.documentWrapper}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={dataDetailDocument.data?.fileURL}
            />
          </div>
          <div className={style.control}>
            <div className={style.actionWrapper}>
              <Button
                variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                <span>Back</span>
              </Button>
              <div
                className={style.deleteIcon}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <BsTrashFill style={{ width: "40%", height: "40%" }} />
                <span>Delete</span>
              </div>
            </div>

            <div className={style.controlDocument}>
              <div className={style.title}>Document Control</div>
              <div className={style.detailWrapper}>
                <div className={style.detail}>
                  <span className={style.titleName}>File ID</span>
                  <span>{dataDetailDocument.data?.fileId}</span>
                </div>
                <div className={style.detail}>
                  <span className={style.titleName}>File name</span>
                  <span>{dataDetailDocument.data?.fileName}</span>
                </div>
                <div className={style.detail}>
                  <span className={style.titleName}>File Size</span>
                  <span>{dataDetailDocument.data?.fileSize} bytes</span>
                </div>
                <div className={style.detail}>
                  <span className={style.titleName}>Upload by</span>
                  <span>{dataDetailDocument.data?.User.username}</span>
                </div>
                <div className={style.detail}>
                  <span className={style.titleName}>Upload on</span>
                  {dataDetailDocument.data?.createdAt && (
                    <span>
                      {formatDate(new Date(dataDetailDocument.data.createdAt))}
                    </span>
                  )}
                </div>
              </div>
              <div className={style.reviewControl}>
                <div className={style.switchTitle}>Review</div>
                <div className={style.statusReview}>
                  <ToggleSwitch
                    checked={isReview}
                    onChange={(e) => {
                      setIsReview(e);
                    }}
                    disabled={isReview}
                  />
                  {isReview && <span>On review progress</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className={style.modalConfirmation}>
          <p className={style.title}>Confirm Delete</p>
          <p>
            You are able to delete the document. It be deleted permanently. Are
            you sure to delete this?
          </p>
          <div className={style.modalActions}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="small"
              loading={
                openNotification ||
                dataDetailDocument.status === FetchState.LOADING
              }
              disabled={
                openNotification ||
                dataDetailDocument.status === FetchState.LOADING
              }
              onClick={() => {
                dispatch(deleteDocument(documentId))
                  .unwrap()
                  .then(() => {
                    setOpenNotification(true);

                    setTimeout(() => {
                      setOpenNotification(false);
                      setOpenModal(false);
                      router.push("/dashboard");
                    }, 3000);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Yes, I am sure.
            </Button>
          </div>
        </div>
      </Dialog>
      <Notification open={openNotification}>
        <div className={style.successNotif}>
          Deleted document is successfully.
        </div>
      </Notification>
    </div>
  );
}
