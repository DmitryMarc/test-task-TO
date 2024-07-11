export class LocalStorageHelper {
    public static getData(lsKey: string) {
        const data = localStorage.getItem(lsKey);
        return data ? JSON.parse(data) : null;
    }
    public static setData(lsKey: string, value: unknown) {
        localStorage.setItem(lsKey, JSON.stringify(value));
    }

    public static pushDataToList(lsKey: string, value: unknown) {
        let items = this.getData(lsKey);
        if (!items) {
            items = [];
        }

        if (Array.isArray(items)) {
            items.unshift(value);
            this.setData(lsKey, items);
        }
    }

    public static deleteDataByKey(lsKey: string) {
        localStorage.removeItem(lsKey);
    }
}
