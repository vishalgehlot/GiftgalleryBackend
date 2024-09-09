import ContactUs from '../model/contactus.model.js';

export const addContact = (req, res, next) => {
  ContactUs.create({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    message: req.body.message,
    userId: req.body.userId
  })
    .then(result => {
      return res.status(200).json({ message: "Message saved successfully...", contact: result });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Something went wrong saving contact information..." });
    });
};
