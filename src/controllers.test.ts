import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import { Contact} from "./models";

import * as jsonfile from "jsonfile";

test("Testeo el constructor del controller", (t) => {
  const controllerPrueba = new ContactsController()
  return controllerPrueba.contacts.load().then(
    () => {
      const data = controllerPrueba.contacts.getAll();
      const datosJson = jsonfile.readFileSync(__dirname + "/contacts.json");
      t.deepEqual(data, datosJson,"Los datos coiciden");
    }
  )
});

test("Testeo el método processOptions", (t) => {

  const datosPrueba = new ContactsControllerOptions();
  datosPrueba.action = "get";
  datosPrueba.params = { id: 2, name : ""};

  const controllerPrueba = new ContactsController()
  return controllerPrueba.processOptions(datosPrueba).then(
    (resultado)=>{
      const datosJson = jsonfile.readFileSync(__dirname + "/contacts.json");
      const data = datosJson.find((x)=> x.id === 2)
      t.deepEqual(resultado,data)
    }
  )
});
