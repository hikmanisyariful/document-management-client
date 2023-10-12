import DocumentDetailLayout from "@/layouts/Document";
import LayoutApp from "@/layouts/LayoutApp";
import React from "react";

export default function Dashboard({ params }: { params: { slug: string } }) {
  return (
    <LayoutApp>
      <main>
        <DocumentDetailLayout documentId={params.slug} />
      </main>
    </LayoutApp>
  );
}
