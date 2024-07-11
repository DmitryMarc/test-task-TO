type DataType = {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export interface IProps {
    isSelected: boolean;
    data: DataType
}