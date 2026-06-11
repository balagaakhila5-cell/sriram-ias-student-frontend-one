import PortalProfilePage from "@/features/studentPortal/components/PortalProfilePage";

export default function EmployeeProfilePage() {
  return (
    <PortalProfilePage
      showParentFields={false}
      storageKeyPrefix="employee-profile"
      fallbackDisplayName="Faculty"
    />
  );
}
