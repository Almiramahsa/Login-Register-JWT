import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

//middleware for verify uset
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    //check user existing
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find user" });
    next();
  } catch (error) {
    return res.status(404).send({ error: 'Authentication Error' });
  }
}

/*Contoh POST http://localhost:5000/api/register
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
// Register
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
                .then((result) => res.status(201).send({ message: 'User Register Successfully' }))
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
/* POST http://localhost:5000/api/login
* @param:{
    "username" : "example123",
    "password" : "admin123"
}
 */
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) return res.status(400).send({ error: "Don't have Password " });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              'ENV.JWT_SECRET',
              { expiresIn: '24h' }
            );
            return res.status(200).send({
              message: 'Login Succesfull',
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: 'Password do not match' });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: 'Username not found' });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
/* GET http://localhost:5000/api/user/example123
* @param:{
    "username" : "example123",
    "password" : "admin123"
}
 */
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) return res.status(501).send({ error: 'Invalid username' });
    UserModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(501).send({ error: "Couldn't find user" });

      // mongoose return unnecessary data with object and convert to JSON
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: 'Cannot find user data' });
  }
}

/* PUT http://localhost:5000/api/updateuser
* @param:{
    "id" : "<userid>"
}
body : {
  firstName : '',
  address : '',
  profile : ''
}
 */
export async function updateUser(req, res) {
  const { username } = req.params;

  try {
    const id = req.query.id;
    if (id) {
      const body = req.body;

      try {
        // update data
        await UserModel.updateOne({ _id: id }, body);
        return res.status(201).send({ msg: 'Record data updated' });
      } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    } else {
      return res.status(401).send({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }
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
