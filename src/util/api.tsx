import IDeck, { ICards } from '../typings/deckofcardsapi'

const url = "http://deckofcardsapi.com/api/deck/"

const getCards = (cards: ICards[]): string => cards.map(e => e.code).join(",")

export const newDeck = async (name: string): Promise<IDeck> => {
    const data: IDeck = await (await fetch(`${url}/new/draw/?count=5`)).json();

    if ((!data.cards || data.cards.length === 0) && !!data.error ) return data
    if (!data.cards) return data

    return await addPilha(data.deck_id, name, getCards(data.cards));
}

export const newCard = async (id: string, name: string): Promise<IDeck> => {
    const data: IDeck = await (await fetch(`${url}/${id}/draw/`)).json();

    if ((!data.cards || data.cards.length === 0) && !!data.error ) return data
    if (!data.cards) return data

    return await addPilha(data.deck_id, name, getCards(data.cards));
}


export const addPilha = async (id: string, name: string, cards:string): Promise<IDeck> => {
    const data = await (await fetch(`${url}${id}/pile/${name}/add/?cards=${cards}`)).json();
    return await data;
}

export const returnCard = async (id: string, name: string, card:string): Promise<IDeck> => {
    const data: IDeck = await (await fetch(`${url}/${id}/pile/${name}/return/?cards=${card}`)).json();

    if ((!data.cards || data.cards.length === 0) && !!data.error ) return data
    if (!data.cards) return data

    return data;
}

export const shuffleCards = async (id: string, name: string): Promise<IDeck> => {
    const data = await (await fetch(`${url}${id}/pile/${name}/shuffle/`)).json();
    return await data;
}

export const listCard = async (id: string, name: string): Promise<IDeck> => {
    const data = await (await fetch(`${url}${id}/pile/${name}/list/`)).json();
    return await data;
}
