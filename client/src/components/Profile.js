import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarBlank from '../assets/profile_blank.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

export default function Profile() {
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
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
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: '40%' }}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Profile</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Update your personal information here</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile" className={styles.profile_label}>
                <img src={file || avatarBlank} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar_blank" />
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
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="text" placeholder="First Name" />
                <input {...formik.getFieldProps('lastName')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="text" placeholder="Last Name" />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('email')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="email" placeholder="Email*" />
                <input {...formik.getFieldProps('mobile')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="number" placeholder="Mobile Phone" />
              </div>

              <input {...formik.getFieldProps('address')} className={`${styles.input} w-3/4 mt-4 border border-gray-300 p-2 rounded-md`} type="text" placeholder="Address" />

              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Comeback Later?
                <Link className="text-red-500 px-3" to="/recovery">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
