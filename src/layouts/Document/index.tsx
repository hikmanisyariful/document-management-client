"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import style from "./Document.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getDetailDocument,
  selectDetailDocument,
} from "@/redux/reducer/detailDocument";
import { FetchState } from "@/interface/Fetch";
import { formatDate } from "@/utils/helpers";

export default function DocumentDetailLayout({
  documentId,
}: {
  documentId: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isReview, setIsReview] = useState(false);
  const dataDetailDocument = useAppSelector(selectDetailDocument);

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
            <Button onClick={() => router.push("/dashboard")}>Back</Button>
            <div className={style.controlDocument}>
              <div className={style.title}>Document Control</div>
              <div className={style.detailWrapper}>
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
    </div>
  );
}
