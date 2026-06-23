import { Outlet } from "react-router-dom";
import StudentPanelLayout from "@/pages/student/(panel)/layout";
import EmployeePanelLayout from "@/pages/employee/(panel)/layout";
import ParentPanelLayout from "@/pages/parent/(panel)/layout";

export function StudentPortalLayout() {
  return (
    <StudentPanelLayout>
      <Outlet />
    </StudentPanelLayout>
  );
}

export function EmployeePortalLayout() {
  return (
    <EmployeePanelLayout>
      <Outlet />
    </EmployeePanelLayout>
  );
}

export function ParentPortalLayout() {
  return (
    <ParentPanelLayout>
      <Outlet />
    </ParentPanelLayout>
  );
}
