import test, { todo } from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  const promesa = model.load();
  promesa.then(() => {
    const todosLosDatos = model.getAll()
    t.deepEqual(contactsObject, todosLosDatos)
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
      /// primero llamo a la promesa,  concateno para que primero se ejecute el metodo load y despues de ejecutarse empieze lo que esta dentro de esta
      /// segundo creo un mock para poder crear un nuevo contacto y lo voy a guarda
      /// ahora lo agrego y lo guardo
      /// ahora traigo los contactos guardados y despues lo comparar
      const mockContact = {
        id: 222,
        name: "jimmy",
      };
      model.addOne(mockContact);

      const promesa = model.save();
      return promesa.then(() => {
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
