export interface IProps {
    value: string;
    placeholder?: string;
    label?: string;
    type?: 'text' | 'tel' | 'email';
    customClass?: string;
    error: string;
}