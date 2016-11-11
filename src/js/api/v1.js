import passwordGenerator from 'random-password-generator';
import {
  findById,
  findByLogin,
  findByEmail,
  findAll,
  register,
  auth,
  resetPassword,
  changePassword,
  updateData,
  getData,
} from '../db/model/user';
import { sendEmailAboutPassReset } from '../services/elasticemail';

const API_KEY = '715be005-cc41-4d6b-a85f-46056c2f8629';

function addCORSheaders(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}

export default function addAPIv1(app) {
  app.use('/api/v1/', addCORSheaders);

  app.post('/api/v1/finduser', (req, res) => {
    const {
      apikey,
      userId,
      login,
      email,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      if (userId) {
        findById(userId)
          .then(
            (user) => {
              res.json({
                success: true,
                error: null,
                user,
              });
            },
            (error) => {
              res.json({
                success: false,
                error: {
                  name: error.name,
                  msg: error.msg,
                },
                user: null,
              });
            });
      } else if (login) {
        findByLogin(login)
          .then(
            (user) => {
              res.json({
                success: true,
                error: null,
                user,
              });
            },
            (error) => {
              res.json({
                success: false,
                error: {
                  name: error.name,
                  msg: error.msg,
                },
                user: null,
              });
            });
      } else if (email) {
        findByEmail(email)
          .then(
            (user) => {
              res.json({
                success: true,
                error: null,
                user,
              });
            },
            (error) => {
              res.json({
                success: false,
                error: {
                  name: error.name,
                  msg: error.msg,
                },
                user: null,
              });
            });
      } else {
        res.status(400).end();
      }
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/findall', (req, res) => {
    const { apikey } = req.body;

    if (apikey && apikey === API_KEY) {
      findAll()
        .then(
          (users) => {
            res.json({
              users,
              error: null,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/register', (req, res) => {
    const {
      apikey,
      email,
      login,
      pass,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      register(email, login, pass)
        .then(
          (newUser) => {
            res.json({
              success: true,
              error: null,
              user: newUser,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
                original: error.originalError,
              },
              user: null,
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/auth', (req, res) => {
    const {
      apikey,
      login,
      pass,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      auth(login, pass)
        .then(
          (user) => {
            res.json({
              success: true,
              error: null,
              user,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
              user: null,
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/resetpassword', (req, res) => {
    const {
      apikey,
      email,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      const newPassword = passwordGenerator.generate();
      resetPassword(email, newPassword)
        .then(
          (success) => {
            res.json({
              success,
              error: null,
            });

            sendEmailAboutPassReset(email, newPassword);
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/changepassword', (req, res) => {
    const {
      apikey,
      userId,
      oldPass,
      newPass,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      changePassword(userId, oldPass, newPass)
        .then(
          (success) => {
            res.json({
              success,
              error: null,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/updateuserdata', (req, res) => {
    const {
      apikey,
      userId,
      data,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      updateData(userId, data)
        .then(
          (success) => {
            res.json({
              success,
              error: null,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
            });
          });
    } else {
      res.status(401).end();
    }
  });

  app.post('/api/v1/getuserdata', (req, res) => {
    const {
      apikey,
      userId,
    } = req.body;

    if (apikey && apikey === API_KEY) {
      getData(userId)
        .then(
          (data) => {
            res.json({
              success: true,
              error: null,
              data,
            });
          },
          (error) => {
            res.json({
              success: false,
              error: {
                name: error.name,
                msg: error.msg,
              },
              data: '',
            });
          });
    } else {
      res.status(401).end();
    }
  });
}
