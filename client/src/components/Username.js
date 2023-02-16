import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.jpg';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';

export default function Username() {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Hello Again!</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Semangat ya! Perjuangan baru dimulai</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className="placeholder-gray-500 placeholder-opacity-25 w-3/4 mt-4 border border-gray-300 p-2 rounded-md" type="text" placeholder="Username" />
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Belum Punya Akun?
                <Link className="text-red-500 px-3" to="/register">
                  Daftar Sekarang
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
