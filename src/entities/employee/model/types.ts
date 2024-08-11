export interface IEmployeeState {
    employees: IEmployee[]
}

export interface IEmployee {
    id: number
    name: string
    isArchive: boolean
    role: ERole
    phone: string
    birthday: string
}

export enum ERole {
    "driver" = "Водитель",
    "waiter" = "Писатель",
    "cook" = "Повар"
}

export enum ESortType {
    "name" = "По имени",
    "birthday" = "По дате рожения",
}

export interface IToolBarValues {
    role: ERole | string
    isArchive: boolean
    type: ESortType | string
    order: "ASC" | "DESC"
}