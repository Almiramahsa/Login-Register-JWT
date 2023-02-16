import React from 'react';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '50%' }}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Reset </h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Enter your new passsword</span>
          </div>
          <div className="input text-center pt-10">
            <span className="py-4 text-xs text-left text-gray-500">
              Enter a set of characters from which at least one <br /> of the characters must be in the password
            </span>
            <form className="py-4" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('password')} className={`${styles.input} w-3/4  border border-gray-300 p-2 rounded-md`} type="text" placeholder="New Password" />
                <input {...formik.getFieldProps('confirm_pwd')} className={`${styles.input} w-3/4  border border-gray-300 p-2 rounded-md`} type="text" placeholder="Repeat Password" />
                <button className={styles.btn} type="submit">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
