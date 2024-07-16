import type {ContactWithoutKeyType} from "@/assets/types/types";

export interface IProps {
    data: Record<ContactWithoutKeyType<'id'>, string> & {id?: number}
    customClass?: string;
    resetFlag: boolean
}