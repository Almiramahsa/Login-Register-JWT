import toast from 'react-hot-toast';
import { authenticate } from './helper.js';
//validasi loginpage username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error('User does not exist!');
    }
  }

  return errors;
}

//validasi loginpage password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// Validate reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    errors.password = toast.error('Passwords do not match');
  }
  return errors;
}

// validate register form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}
// ------------------------------------//

// validasi password
function passwordVerify(errors = {}, values) {
  const specialChars = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/;

  if (!values.password) {
    errors.password = toast.error('Password Required!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Wrong Password!');
  } else if (values.password.length < 4) {
    errors.password = toast.error('Password must be more than 4 characters length');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character');
  }

  return errors;
}

// validasi username
function usernameVerify(errors = {}, values) {
  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username...!');
  }

  return errors;
}

// validate email
function emailVerify(errors = {}, values) {
  if (!values.email) {
    errors.email = toast.error('Email required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address');
  }

  return errors;
}
