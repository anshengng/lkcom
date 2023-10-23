export interface Menu {
    title?: string
    icon?: string
    active?: boolean
    route?: string
}

export interface IMenu extends Menu {
    children?: Menu[]
}