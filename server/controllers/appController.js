import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

/*
  Contoh POST http://localhost:5000/api/register
  @param :
  {
    "username" : "example123",
    "password" : "admin123",
    "email" : "admin@mail.com",
    "firstName" : "admin",
    "lastName" : "example",
    "mobile" : 0856676464,
    "address" : "awkwkland",
    "profile" : ""
  }
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'Please use unique username' });

        resolve();
      });
    });
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'Please use unique email' });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email,
              });

              user
                .save()
                .then((result) => res.status(201).send({ msg: 'User Register Successfully' }))
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Enable to hashed password',
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
}

export async function login(req, res) {
  res.json('login route');
}

export async function getUser(req, res) {
  res.json('getUser route');
}

export async function updateUser(req, res) {
  res.json('updateUser route');
}
export async function generateOTP(req, res) {
  res.json('generateOTP route');
}
export async function verifyOTP(req, res) {
  res.json('verifyOTP route');
}
export async function createResetSession(req, res) {
  res.json('createResetSession route');
}
export async function resetPassword(req, res) {
  res.json('resetPassword route');
}
