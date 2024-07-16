export type ContactType = {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export type ContactWithoutKeyType<T> = Exclude<keyof ContactType, T>