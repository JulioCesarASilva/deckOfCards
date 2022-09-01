import { IStorage } from "../typings/types";

export const setStorage = (data: { [key: string]: string }) => {
    data.time = dataHora();
    window.localStorage.setItem("deckofcard", JSON.stringify(data))
}

export const getStorage = (): IStorage | null => {
    const storage = window.localStorage.getItem("deckofcard")
    return  storage ? JSON.parse(storage) : null
}

const pad = (id:string | number) => (id).toString().padStart(2, "0");

export const dataHora = () => {
    const data = new Date();
    return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}  ${pad(data.getHours())}:${pad(data.getMinutes())}:${pad(data.getSeconds())}`
}