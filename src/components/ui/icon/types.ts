export interface IProps {
    name:
        | 'check'
        | 'edit'
        | 'close'
        | 'search'
        | string;
    customClass?: string
}