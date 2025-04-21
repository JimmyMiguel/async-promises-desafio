import * as jsonfile from "jsonfile";
import { ContactsControllerOptions } from "./controllers";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];

  load() {
    // usar la version Async (readFile)
    const promesas = jsonfile.readFile(__dirname + "/contacts.json");
    promesas.then(
      (json) => {
        this.data = json;
        return this.data
      }
    )
    return promesas
  }


  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    return jsonfile.writeFile(__dirname + "/contacts.json", this.data);
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => contacto?.id == id);
    return encontrado;
  }
}
export { ContactsCollection, Contact };