"use client";

import PortalSidebar from "./PortalSidebar";
import { studentNavItems } from "../nav";

export default function StudentSidebar() {
  return <PortalSidebar items={studentNavItems} />;
}
