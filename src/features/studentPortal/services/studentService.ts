import { http } from '@/lib/http';
import type { ApiEnvelope } from '@/lib/apiResult';
import type { AuthUser } from '@/features/auth/types';

export interface StudentProfileDetails {
  id: string;
  studentId: string | null;
  studentName: string;
  email: string;
  mobileNumber: string;
  parentName: string | null;
  parentMobile: string | null;
  parentEmail: string | null;
}

export interface StudentCourseEnrollment {
  id: string;
  title: string;
  validUpto: string;
  progressPercent: number;
  status: 'Active' | 'Expired';
}

export interface StudentDetailsPayload {
  user: AuthUser & { center?: { centerName?: string } | null };
  profile: StudentProfileDetails;
  courseEnrollments: StudentCourseEnrollment[];
}

interface StudentDetailsApiData {
  student: {
    user: {
      id: string;
      name: string;
      email?: string;
      mobile?: string;
      role: AuthUser['role'];
      center?: { centerName?: string } | null;
    };
    profile: {
      id: string;
      studentId?: string | null;
      studentName: string;
      email?: string;
      mobileNumber?: string;
      parentName?: string | null;
      parentMobile?: string | null;
      parentEmail?: string | null;
    };
    courseEnrollments?: Array<{
      _id?: string;
      courseId?: {
        _id?: string;
        courseId?: string;
        courseName?: string;
        title?: string;
      };
      validUntil?: string;
      expiresAt?: string;
      status?: string;
      progressPercent?: number;
    }>;
    batchEnrollments?: Array<{
      _id?: string;
      enrollmentId?: string;
      batchName?: string;
      courseName?: string;
      progressPercentage?: number;
      courseProgressPercentage?: number;
      status?: string;
      enrollmentDate?: string;
    }>;
  };
}

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  mobile?: string;
  parentName?: string;
  parentMobile?: string;
  parentEmail?: string;
}

function mapCourseEnrollments(
  rows: StudentDetailsApiData['student']['courseEnrollments'],
): StudentCourseEnrollment[] {
  if (!rows?.length) return [];

  return rows.map((row, index) => {
    const course = row.courseId;
    const id = course?._id ?? course?.courseId ?? row._id ?? `course-${index}`;
    const title = course?.courseName ?? course?.title ?? 'Enrolled course';
    const validUpto = row.validUntil ?? row.expiresAt ?? '—';
    const status =
      row.status?.toLowerCase() === 'expired' ? 'Expired' : 'Active';

    return {
      id: String(id),
      title,
      validUpto,
      progressPercent: row.progressPercent ?? 0,
      status,
    };
  });
}

function mapBatchEnrollments(
  rows: StudentDetailsApiData['student']['batchEnrollments'],
): StudentCourseEnrollment[] {
  if (!rows?.length) return [];

  return rows.map((row, index) => {
    const id = row._id ?? row.enrollmentId ?? `batch-${index}`;
    const title = row.courseName || row.batchName || 'Enrolled course';
    const status =
      row.status?.toUpperCase() === 'EXPIRED' ||
      row.status?.toUpperCase() === 'INACTIVE'
        ? 'Expired'
        : 'Active';

    return {
      id: String(id),
      title,
      validUpto: row.enrollmentDate
        ? new Date(row.enrollmentDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : '—',
      progressPercent:
        row.progressPercentage ?? row.courseProgressPercentage ?? 0,
      status,
    };
  });
}

function mapStudentDetails(data: StudentDetailsApiData): StudentDetailsPayload {
  const { user, profile, courseEnrollments, batchEnrollments } = data.student;
  const enrollments =
    mapBatchEnrollments(batchEnrollments).length > 0
      ? mapBatchEnrollments(batchEnrollments)
      : mapCourseEnrollments(courseEnrollments);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      center: user.center?.centerName ?? undefined,
    },
    profile: {
      id: profile.id,
      studentId: profile.studentId ?? null,
      studentName: profile.studentName,
      email: profile.email ?? user.email ?? '',
      mobileNumber: profile.mobileNumber ?? user.mobile ?? '',
      parentName: profile.parentName ?? null,
      parentMobile: profile.parentMobile ?? null,
      parentEmail: profile.parentEmail ?? null,
    },
    courseEnrollments: enrollments,
  };
}

export const studentService = {
  getStudentDetails: async (): Promise<StudentDetailsPayload> => {
    const { data } = await http.get<ApiEnvelope<StudentDetailsApiData>>(
      '/user/student-details',
    );
    return mapStudentDetails(data.data);
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<StudentDetailsPayload['user']> => {
    const { data } = await http.put<
      ApiEnvelope<{
        user: {
          id: string;
          name: string;
          email?: string;
          mobile?: string;
        };
      }>
    >('/user/profile', payload);

    const user = data.data.user;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: 'student',
    };
  },
};

export type { UpdateProfilePayload };
