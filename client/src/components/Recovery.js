import React from 'react';

import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';

export default function Recovery() {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold"> Recovery</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Enter OTP to recover password</span>
          </div>

          <form className="pt-10">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-xs text-left text-gray-500">Enter 6 digit OTP sent to your email address</span>
                <div>
                  <input className="placeholder-gray-500 placeholder-opacity-25 mt-4 border border-gray-300 p-2 rounded-md" type="text" placeholder="OTP" />
                </div>
              </div>
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?
                <button className="text-red-500 px-3" to="/recovery">
                  Resend OTP
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
