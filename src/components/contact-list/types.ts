import type {ContactType} from "@/assets/types/types";

export interface IProps {
    contacts: ContactType[];
    selectedItems: Set<number>;
    isAllSelected: boolean;
    customClass: string;
}