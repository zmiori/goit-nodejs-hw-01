const fs = require("fs/promises");

const path = require("path");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

const contactsPath = path.join(__dirname, "/db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    console.log(`list2`);
    if (err) {
      console.log(err.message);
      return;
    }
    return data;
  })
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  const id = Number(contactId);
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    return data;
  })
    .then((data) => {
      const parsedData = JSON.parse(data);
      parsedData.map((contact) => {
        if (id === contact.id) {
          console.log(`Info about the contact with id ${contact.id}:`);
          console.log(contact);
        }
      });
    })
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  const id = Number(contactId);

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    return data;
  })
    .then((data) => {
      let parsedData = JSON.parse(data);
      parsedData.map((contact) => {
        if (id === contact.id) {
          const i = parsedData.indexOf(contact);
          // console.log(i);
          // console.log(parsedData);
          parsedData.splice(i, 1);
          // console.log(parsedData);

          fs.writeFile(
            contactsPath,
            JSON.stringify(parsedData, null, 2),
            (err) => {
              if (err) {
                console.log(err.message);
                return;
              }
            }
          );
          console.log(`Contact with id ${contact.id} has been deleted`);
        }
      });
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  // let parsedData = [];
  // console.log(parsedData);

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    return data;
  })
    .then((data) => {
      let parsedData = JSON.parse(data);
      const newContact = {
        id: parsedData.length + 1,
        name,
        email,
        phone,
      };
      parsedData.push(newContact);
      // console.log(parsedData);
      return parsedData;
    })
    .then((data) => {
      fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
      console.log(`Contact has been added`);
      console.log(data);
    })
    .catch((error) => console.log(error));
}
