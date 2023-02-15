import toast from 'react-hot-toast';

//validasi loginpage username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

// validasi username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required...!');
  } else if (values.username.include('')) {
    error.username = toast.error('Invalid Username...!');
  }

  return error;
}
