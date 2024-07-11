type DataType = {
    id?: number | string;
    name: string;
    phone: string;
    email: string;
}

export interface IProps {
    data: DataType
    customClass?: string;
}