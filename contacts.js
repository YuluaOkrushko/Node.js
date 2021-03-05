const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

exports.listContacts = () =>
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });

exports.getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contactFromId = JSON.parse(data).find(
      (item) => item.id === contactId
    );
    console.table(contactFromId);
  });
};

exports.removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const contacts = JSON.parse(data);
    if (err) throw err;
    const contactFromId = contacts.find((item) => item.id === contactId);
    console.log("You are deleting this item: ");
    console.table(contactFromId);
    const editList = contacts.filter((item) => item.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(editList), (err) => {
      if (err) throw err;
      console.log("New list will be: ");
      console.table(editList);
    });
  });
};

exports.addContact = (name, email, phone) => {
  const id = shortid.generate();
  const newContact = { id, name, email, phone };
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const editList = JSON.stringify(
      data ? [...JSON.parse(data), newContact] : [newContact]
    );
    fs.writeFile(contactsPath, editList, (err) => {
      if (err) throw err;
      console.log("You have added new contact: ");
      console.table(newContact);
    });
  });
};
