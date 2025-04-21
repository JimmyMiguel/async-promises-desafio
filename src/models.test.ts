import test, { todo } from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  const promesa = model.load();
  promesa.then((contactos) => {
    t.deepEqual(contactos, contactsObject)
  })
  promesa.catch(
    () => { console.log("No se esta ejecutando bien el test de Load()") }
  )
  return promesa
});

test.serial("Testeo el addOne del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  t.deepEqual(model.getAll(), [mockContact]);
});



test.serial("Testeo el save del modelo", (t) => {
  const model = new ContactsCollection();
  const promesa = model.load();
  return promesa.then(
    () => {

      const mockContact = {
        id: 222,
        name: "jimmy",
      };
      model.addOne(mockContact);

      const promesaSave = model.save();
      return promesaSave.then(() => {
        const fileContent = jsonfile.readFileSync(__dirname + "/contacts.json");
        t.deepEqual(model.getAll(), fileContent)
      })
    }
  )
});




test.serial("Testeo el getOneById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});
