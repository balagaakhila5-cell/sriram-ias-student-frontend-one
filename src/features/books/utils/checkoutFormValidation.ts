export type CheckoutFormFields = {
  name: string;
  mobile: string;
  email: string;
  address: string;
  pincode: string;
};

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormFields, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckoutForm(form: CheckoutFormFields): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  const name = form.name.trim();
  if (!name) {
    errors.name = 'Please enter your name';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  const mobile = form.mobile.trim();
  if (!mobile) {
    errors.mobile = 'Please enter mobile number';
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Mobile number must be exactly 10 digits';
  }

  const email = form.email.trim();
  if (!email) {
    errors.email = 'Please enter email address';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  const address = form.address.trim();
  if (!address) {
    errors.address = 'Please enter address';
  } else if (address.length < 10) {
    errors.address = 'Address must be at least 10 characters';
  }

  const pincode = form.pincode.trim();
  if (!pincode) {
    errors.pincode = 'Please enter pin code';
  } else if (!/^\d{6}$/.test(pincode)) {
    errors.pincode = 'Pin code must be exactly 6 digits';
  }

  return errors;
}

export function hasCheckoutFormErrors(errors: CheckoutFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
