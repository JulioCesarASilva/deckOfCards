export default interface IDeck {
    success: boolean,
    shuffled: boolean,
    remaining: number
    deck_id: string,
    error?: string,
    cards?: ICards[],
    piles?: IPiles
}

export interface ICards {
    images: IImages,
    value: string,
    suit: string,
    code: string
}

export interface IImages {
    svg: string,
    png: string
}

export interface IPiles {
    [key: string]: IPlayer
}


export interface IPlayer {
    cards: ICards[],
    remaining: string
}


export interface IDiscard {
    remaining: number
}