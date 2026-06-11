import {
  DUPLICATE_SIGNUP_MESSAGE,
  isCredentialAlreadyRegistered,
  registerAuthCredential,
} from "./registeredAuthCredentials";

export { DUPLICATE_SIGNUP_MESSAGE };

export type RegisteredStudent = {
  name: string;
  email: string;
  mobile: string;
  registeredAt: string;
};

export function isStudentAlreadyRegistered(input: {
  email: string;
  mobile: string;
}) {
  return isCredentialAlreadyRegistered(input);
}

export function registerStudent(student: {
  name: string;
  email: string;
  mobile: string;
}) {
  registerAuthCredential("student", student);
}
