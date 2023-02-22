import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/landing_image.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store.js';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate('/password');
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center text-center h-screen">
        <div className={`${styles.glass} glass w-72 flex-shrink-0 rounded-2xl py-20 px-7`}>
          <div className="card" style={{ width: '72px' }}></div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <h5 className="text-xl font-bold"> Hello Again!</h5>
            <span className="py-4 text-regular w-2/3 text-center text-gray-400">Semangat ya! Perjuangan baru dimulai</span>
          </div>
          <form className="py-4 w-full" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={image} className="h-20 w-30 -left-3633 -top-5523 rounded-0" alt="avatar_blank" />{' '}
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
