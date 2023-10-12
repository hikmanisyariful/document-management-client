import React, { useEffect, useRef, useState } from "react";
import tableStyle from "./Table.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Document } from "@/redux/reducer/document";
import { capitalizeFirstLetter, formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { FaTrashRestoreAlt } from "react-icons/fa";

export default function Table({ data }: { data: Document[] }) {
  const [optionActive, setOptionActive] = useState<number | undefined>();

  return (
    <div className={tableStyle.container}>
      <table className={tableStyle.table}>
        <colgroup>
          <col className={tableStyle.columnWidth} />
          <col className={tableStyle.columnWidth} />
          <col className={tableStyle.columnWidth} />
          <col className={tableStyle.columnWidth} />
          <col className={tableStyle.columnWidth} />
        </colgroup>
        <thead>
          <tr>
            <th>Date</th>
            <th>File name</th>
            <th>Upload by</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((document, index) => {
              const date = new Date(document.createdAt);
              const strDate = formatDate(date);

              return (
                <tr key={`${document.id}-${index}`}>
                  <td className={tableStyle.date}>{strDate}</td>
                  <td>{document.fileName}</td>
                  <td>{document.User.username}</td>
                  <td>
                    <span
                      className={tableStyle.status}
                      data-value={document.status}
                      // data-value="APPROVED"
                    >
                      {capitalizeFirstLetter(document.status)}
                    </span>
                  </td>
                  <td>
                    <ActionComponent
                      onClick={() => setOptionActive(document.id)}
                      isActive={optionActive === document.id}
                      name={`${document.id}-${document.fileId}`}
                      documentId={document.id}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={tableStyle.emptyContainer}>
          <div className={tableStyle.emptyIcon}>
            <FaTrashRestoreAlt
              style={{
                width: "100%",
                height: "100%",
                color: "rgb(125 211 252)",
              }}
            />
          </div>
          <div className={tableStyle.emptyTitle}>No uploaded file.</div>
          <p>
            Please upload pdf file, with maximun size is 1mb. Status consists of
            Submitted, Review, Approved, Rejected
          </p>
        </div>
      )}
    </div>
  );
}

const ActionComponent = ({
  onClick,
  isActive,
  name,
  documentId,
}: {
  onClick: VoidFunction;
  isActive: boolean;
  name: string;
  documentId: number;
}) => {
  const router = useRouter();
  const actionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isActive) return;
    setOpen(false);
  }, [isActive]);

  return (
    <>
      <div
        className={tableStyle.actionIcon}
        onClick={() => {
          if (!open) {
            onClick();
          }
          setOpen(!open);
        }}
      >
        <BsThreeDotsVertical />
        <div
          id={name}
          ref={actionRef}
          className={tableStyle.popup}
          data-open={open}
        >
          <div className={tableStyle.actionOptions}>
            <div
              className={tableStyle.actionOption}
              onClick={() => router.push(`/document/${documentId}`)}
            >
              View
            </div>
            <div className={tableStyle.actionOption}>Edit</div>
          </div>
        </div>
      </div>
    </>
  );
};
