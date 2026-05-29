import AttendanceView from "@/features/studentPortal/components/AttendanceView";
import StudentDetailHeader from "@/features/employeePortal/components/StudentDetailHeader";
import { getStudentById } from "@/features/employeePortal/data/students";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default async function EmployeeStudentAttendancePage({
  params,
}: PageProps) {
  const { studentId } = await params;
  const student = getStudentById(studentId);
  const studentName = student?.name ?? "Darshan Kotla";

  return (
    <div className="space-y-8">
      <StudentDetailHeader
        studentName={studentName}
        backHref="/employee/attendance"
      />
      <AttendanceView showCheckButtons={false} />
    </div>
  );
}
