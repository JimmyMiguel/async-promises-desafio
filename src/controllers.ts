import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  constructor() {
    this.contacts = new ContactsCollection();

  }
  processOptions(options: ContactsControllerOptions) {

    if (options.action == "get" && options.params.id) {
      return this.contacts.load().then(
        () => {
          return this.contacts.getOneById(options.params.id)
        })
    }

    if (options.action == "get") {
      return this.contacts.load().then(
        () => {
          return this.contacts.getAll();
        })
    }
    if (options.action == "save" && options.params) {
      return this.contacts.load().then(
        () => {
          this.contacts.addOne(options.params);
          return this.contacts.save()
        }
      )
    }
  }
}

export { ContactsController };

