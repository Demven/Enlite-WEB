import mongoose from 'mongoose';
import Promise from 'bluebird';
import validator from 'validator';
import { isPassword, isLogin } from '../../services/validators';
import { sendError, ERROR } from '../errors';

const userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true },
  login: String,
  pass: String,
  registerDate: { type: Date, default: Date.now },
  generatedNewPass: Boolean,
  deleted: Boolean,
  data: String,
});

const User = mongoose.model('User', userSchema);

/**
 * @return Array [User]
 */
export function findAll() {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) {
        reject(err);
      }
      resolve(users);
      return users;
    });
  });
}

/**
 * @return Array [User]
 */
export function removeAllPermanently() {
  return new Promise((resolve, reject) => {
    User.remove((err, users) => {
      if (err) {
        reject(err);
      }
      resolve(users);
      return users;
    });
  });
}

/**
 * @param userId
 * @return User
 */
export function findById(userId) {
  return new Promise((resolve, reject) => {
    if (!validator.isMongoId(userId)) {
      reject(sendError(ERROR.NO_SUCH_USER, ''));
    } else {
      User.findById(userId, (err, user) => {
        if (err) {
          reject(sendError(ERROR.INTERNAL, 'could not find such user', err));
        }

        resolve(user);
      });
    }
  });
}

/**
 * @param email
 * @return User
 */
export function findByEmail(email) {
  return new Promise((resolve, reject) => {
    if (!validator.isEmail(email)) {
      reject(sendError(ERROR.EMAIL_INCORRECT, ''));
    } else {
      User.findOne({ email }, (err, user) => {
        if (err) {
          reject(sendError(ERROR.INTERNAL, 'could not find such user', err));
        }

        resolve(user);
      });
    }
  });
}

/**
 * @param login
 * @return User
 */
export function findByLogin(login) {
  return new Promise((resolve, reject) => {
    if (!isLogin(login)) {
      reject(sendError(ERROR.LOGIN_INCORRECT, ''));
    } else {
      User.findOne({ login }, (err, user) => {
        if (err) {
          reject(sendError(ERROR.INTERNAL, 'could not find such user', err));
        }

        resolve(user);
      });
    }
  });
}

/**
 * @param email
 * @param login
 * @param pass
 * @return User
 */
export function register(email, login, pass) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    if (!validator.isEmail(email)) {
      reject(sendError(ERROR.EMAIL_INCORRECT, ''));
      return;
    }
    if (!isLogin(login)) {
      reject(sendError(ERROR.LOGIN_INCORRECT, ''));
      return;
    }
    if (!isPassword(pass)) {
      reject(sendError(ERROR.PASS_INCORRECT, ''));
      return;
    }

    findByEmail(email)
      .then(
        (user) => {
          if (user) {
            rejected = true;
            reject(sendError(ERROR.EMAIL_EXISTS, 'user with such email already exists'));
          }
          return user;
        },
        (err) => {
          rejected = true;
          reject(sendError(ERROR.INTERNAL, 'could not find a user by email', err));
          return err;
        }
      )
      .then(() => {
        if (rejected) {
          return;
        }
        findByLogin(login)
          .then(
            (user) => {
              if (user) {
                rejected = true;
                reject(sendError(ERROR.LOGIN_EXISTS, 'user with such login already exists'));
              }
              return user;
            },
            (err) => {
              rejected = true;
              reject(sendError(ERROR.INTERNAL, 'could not find a user by login', err));
              return err;
            }
          )
          .then(() => {
            if (rejected) {
              return;
            }
            // save new user
            const newUser = new User({
              email,
              login,
              pass,
              generatedNewPass: false,
              deleted: false,
              data: '',
            });

            newUser.save(err => {
              if (err) {
                reject(sendError(ERROR.INTERNAL, 'could not save the new user', err));
              } else {
                resolve(newUser);
              }
            });
          });
      });
  });
}

/**
 * @param login
 * @param pass
 * @return User
 */
export function auth(login, pass) {
  return new Promise((resolve, reject) => {
    if (!isLogin(login)) {
      reject(sendError(ERROR.LOGIN_INCORRECT, ''));
      return;
    }
    if (!isPassword(pass)) {
      reject(sendError(ERROR.PASS_INCORRECT, ''));
      return;
    }

    User.findOne({ login, pass, deleted: false }, (err, user) => {
      if (err) {
        reject(sendError(ERROR.INTERNAL, 'error while authentication user', err));
      }
      if (user) {
        resolve(user);
      } else {
        reject(sendError(ERROR.NO_SUCH_USER, 'could not find such user', err));
      }
    });
  });
}

/**
 * @param email
 * @return success - boolean
 */
export function resetPassword(email, newPassword) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    if (!validator.isEmail(email)) {
      reject(sendError(ERROR.EMAIL_INCORRECT, ''));
      return;
    }
    if (!isPassword(newPassword)) {
      reject(sendError(ERROR.PASS_INCORRECT, ''));
      return;
    }

    findByEmail(email)
      .then(
        (user) => {
          if (!user || user.deleted) {
            rejected = true;
            reject(sendError(ERROR.NO_SUCH_USER, 'user with such email does not exist'));
          }
          return user;
        },
        (err) => {
          rejected = true;
          reject(sendError(ERROR.INTERNAL, 'could not find a user by email', err));
          return err;
        }
      )
      .then((user) => {
        if (rejected || !user) {
          return;
        }

        // reset password for this user
        User.update({ _id: user._id }, { pass: newPassword, generatedNewPass: true }, (err, resultOfUpdate) => {
          if (err) {
            reject(sendError(ERROR.INTERNAL, 'could not reset user password', err));
          } else {
            resolve(resultOfUpdate.ok === 1);
          }
        });
      });
  });
}

/**
 * @param userId
 * @param oldPass
 * @param newPass
 * @return success - boolean
 */
export function changePassword(userId, oldPass, newPass) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    if (!validator.isMongoId(userId)) {
      reject(sendError(ERROR.USER_ID_INCORRECT, ''));
      return;
    }

    if (!isPassword(oldPass)) {
      reject(sendError(ERROR.PASS_INCORRECT, ''));
      return;
    }

    if (!isPassword(newPass)) {
      reject(sendError(ERROR.PASS_INCORRECT, ''));
      return;
    }

    findById(userId)
      .then(
        (user) => {
          if (!user || user.deleted) {
            rejected = true;
            reject(sendError(ERROR.NO_SUCH_USER, 'user with such userId does not exist'));
          } else if (user.pass !== oldPass) {
            rejected = true;
            reject(sendError(ERROR.PASS_INCORRECT, 'the old password is wrong'));
          }
          return user;
        },
        (err) => {
          rejected = true;
          reject(sendError(ERROR.INTERNAL, 'could not find a user by userId', err));
          return err;
        }
      )
      .then((user) => {
        if (rejected || !user) {
          return;
        }

        // save new password
        User.update({ _id: user._id }, { pass: newPass, generatedNewPass: false }, (err, resultOfUpdate) => {
          if (err) {
            reject(sendError(ERROR.INTERNAL, 'could not save new password', err));
          } else {
            resolve(resultOfUpdate.ok === 1);
          }
        });
      });
  });
}

/**
 * @param userId
 * @param data
 * @return success - boolean
 */
export function updateData(userId, data) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    if (!validator.isMongoId(userId)) {
      reject(sendError(ERROR.USER_ID_INCORRECT, ''));
      return;
    }

    if (!validator.isJSON(data)) {
      reject(sendError(ERROR.USER_DATA_INCORRECT, ''));
      return;
    }

    findById(userId)
      .then(
        (user) => {
          if (!user || user.deleted) {
            rejected = true;
            reject(sendError(ERROR.NO_SUCH_USER, 'user with such userId does not exist'));
          }
          return user;
        },
        (err) => {
          rejected = true;
          reject(sendError(ERROR.INTERNAL, 'could not find a user by userId', err));
          return err;
        }
      )
      .then((user) => {
        if (rejected || !user) {
          return;
        }

        // save updated data
        User.update({ _id: user._id }, { data }, (err, resultOfUpdate) => {
          if (err) {
            reject(sendError(ERROR.INTERNAL, 'could not update user data', err));
          } else {
            resolve(resultOfUpdate.ok === 1);
          }
        });
      });
  });
}

/**
 * @param userId
 * @return data - string
 */
export function getData(userId) {
  return new Promise((resolve, reject) => {
    if (!validator.isMongoId(userId)) {
      reject(sendError(ERROR.USER_ID_INCORRECT, ''));
      return;
    }

    findById(userId)
      .then(
        (user) => {
          if (!user || user.deleted) {
            reject(sendError(ERROR.NO_SUCH_USER, 'user with such userId does not exist'));
          } else {
            resolve(user.data);
          }
          return user;
        },
        (err) => {
          reject(sendError(ERROR.INTERNAL, 'could not find a user by userId', err));
          return err;
        }
      );
  });
}

/**
 * @param userId
 * @return success - boolean
 */
export function removeById(userId) {
  let rejected = false;
  return new Promise((resolve, reject) => {
    if (!validator.isMongoId(userId)) {
      reject(sendError(ERROR.USER_ID_INCORRECT, ''));
      return;
    }

    findById(userId)
      .then(
        (user) => {
          if (!user || user.deleted) {
            rejected = true;
            reject(sendError(ERROR.NO_SUCH_USER, 'user with such userId does not exist'));
          }
          return user;
        },
        (err) => {
          rejected = true;
          reject(sendError(ERROR.INTERNAL, 'could not find a user by userId', err));
          return err;
        }
      )
      .then((user) => {
        if (rejected || !user) {
          return;
        }

        // mark user as 'deleted'
        User.update({ _id: user._id }, { deleted: true }, (err, resultOfUpdate) => {
          if (err) {
            reject(sendError(ERROR.INTERNAL, 'could not remove user', err));
          } else {
            resolve(resultOfUpdate.ok === 1);
          }
        });
      });
  });
}
