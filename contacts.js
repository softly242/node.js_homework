const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, './db/contacts.json');
const updateContacts = async (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}
 
const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
   phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts, getContactById, removeContact, addContact
}