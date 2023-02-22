import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.jpg';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store.js';
import useFetch from '../hooks/fetch.hook.js';
import { verifyPassword } from '../helper/helper.js';

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({ username, password: values.password });
      toast.promise(loginPromise, {
        loading: 'Checking user data',
        success: <p> Login Successfull</p>,
        error: <p>Passwords do NOT match</p>,
      });
      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      });
    },
  });
  if (isLoading) return <p className="text-2xl font-bold">Loading</p>;
  if (serverError) return <p className="text-2xl text-red-500">{serverError.message}</p>;
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Hello {apiData?.firstName || apiData?.username}!</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Semangat ya! Perjuangan baru dimulai</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="password" placeholder="Password" />

              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?
                <Link className="text-red-500 px-3" to="/recovery">
                  Recovery Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
