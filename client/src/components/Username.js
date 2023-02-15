import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.jpg';
import styles from '../styles/Username.module.css';

export default function Username() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div classname={styles.glass}>
          <div className="title flex flex-col items-center">
            <h5 className="text-xl font-bold"> Hello Mira!</h5>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">Semangat ya! Perjuangan baru dimulai</span>
          </div>

          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input className={styles.textbox} type="text" placeholder="Username" />
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
