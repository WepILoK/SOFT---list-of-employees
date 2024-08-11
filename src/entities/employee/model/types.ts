
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