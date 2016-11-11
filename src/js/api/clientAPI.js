import {
  findByEmail,
  changePassword,
} from '../db/model/user';
import { addContactWithConfirmation } from '../services/elasticemail';

export default function addClientAPI(app) {
  app.post('/add-contact', (req, res) => {
    const { email } = req.body;
    if (email) {
      addContactWithConfirmation(email);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: true });
    }
  });

  app.post('/change-password', (req, res) => {
    const {
      email,
      currentPass,
      newPass,
    } = req.body;

    findByEmail(email)
      .then(
        (user) => {
          if (user) {
            changePassword(`${user._id}`, currentPass, newPass)
              .then(
                (success) => {
                  res.json({ success, error: null });
                },
                () => {
                  res.status(500).json({ error: true });
                }
              );
          } else {
            res.status(500).json({ error: true });
          }
        },
        () => {
          res.status(500).json({ error: true });
        });
  });
}
