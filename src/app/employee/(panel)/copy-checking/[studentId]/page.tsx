import CopyCheckingStudentView from "@/features/employeePortal/components/CopyCheckingStudentView";
import { getStudentById, students } from "@/features/employeePortal/data/students";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export function generateStaticParams() {
  return students.map((student) => ({ studentId: student.id }));
}

export default async function EmployeeCopyCheckingStudentPage({
  params,
}: PageProps) {
  const { studentId } = await params;
  const student = getStudentById(studentId);
  const studentName = student?.name ?? "Student";

  return <CopyCheckingStudentView studentName={studentName} />;
}
