import DashboardLayout from "@/layouts/Dashboard";
import LayoutApp from "@/layouts/LayoutApp";
import React from "react";

export default function Dashboard() {
  return (
    <LayoutApp>
      <main>
        <DashboardLayout />
      </main>
    </LayoutApp>
  );
}
