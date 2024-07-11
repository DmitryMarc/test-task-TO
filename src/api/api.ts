import {contactItems} from "@/assets/mocks/items";

export class Api {
    public static async getContacts() {
        return await new Promise(resolve => {
            setTimeout(() => resolve( contactItems ), 1000);
        })
    }
}
