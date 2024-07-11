import type {ContactType} from "@/assets/types/types";

export interface IProps {
    data: ContactType | Omit<ContactType, 'id'>
    customClass?: string;
    resetFlag: boolean
}