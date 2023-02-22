import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/store.js';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { generateOTP, verifyOTP } from '../helper/helper.js';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      // console.log(OTP);
      if (OTP) {
        toast.success('OTP has been sent to your email');
      } else {
        toast.error('Problem while generating OTP');
      }
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Succesfullty');
        return navigate('/reset');
      }
    } catch (error) {
      return toast.error('Wrong OTP');
    }
  }
  //resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: 'Sending OTP..',
      success: <p>OTP has benn send to your email</p>,
      error: <p>Couldn't send the OTP</p>,
    });
    sendPromise.then((OTP) => {
      // console.log(OTP);
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h5 className="text-3xl font-bold">Recovery</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Enter OTP to recover password</span>
          </div>

          <form onSubmit={onSubmit} className="pt-10">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-xs text-left text-gray-500">Enter 6 digit OTP sent to your email address</span>
                <div>
                  <input onChange={(e) => setOTP(e.target.value)} className="placeholder-gray-500 placeholder-opacity-25 mt-4 border border-gray-300 p-2 rounded-md" type="text" placeholder="OTP" value={OTP} />
                </div>
              </div>
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Cant get OTP?</span>
            </div>
          </form>
          <button onClick={resendOTP} className="text-red-500 px-3" to="/recovery">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
