import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarBlank from '../assets/profile_blank.png';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Creating new user',
        success: <p>Register Success</p>,
        error: <p>Couldn register the user</p>,
      });
      registerPromise.then(function () {
        navigate('/');
      });
    },
  });

  // formik file doesn't support
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '40%' }}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Register</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Register now and find the best version of you!</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile" className={styles.profile_label}>
                <img src={file || avatarBlank} className={styles.profile_img} alt="avatar_blank" />
                {file && (
                  <button className={styles.remove_btn} type="button" onClick={handleRemove}>
                    -
                  </button>
                )}
                {!file && <div className={styles.plus}>+</div>}
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="email" placeholder="Email*" />
              <input {...formik.getFieldProps('username')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="username" placeholder="Username*" />
              <input {...formik.getFieldProps('password')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="password" placeholder="Password" />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Registered?
                <Link className="text-red-500 px-3" to="/recovery">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
