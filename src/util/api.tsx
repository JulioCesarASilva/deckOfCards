import IDeck, { ICards } from '../typings/deckofcardsapi';

const API_URL = 'https://deckofcardsapi.com/api/deck';
const segment = encodeURIComponent;
const pilePath = (id: string, name: string) => `${segment(id)}/pile/${segment(name)}`;

async function request(path: string): Promise<IDeck> {
    const response = await fetch(`${API_URL}/${path}`);
    if (!response.ok) throw new Error('Não foi possível acessar o baralho.');
    const data: IDeck = await response.json();
    if (!data.success) throw new Error(data.error || 'Não foi possível completar a jogada.');
    return data;
}

async function drawToPile(path: string, name: string): Promise<IDeck> {
    const data = await request(path);
    if (!data.cards?.length) throw new Error('Não há cartas disponíveis.');
    return addPilha(data.deck_id, name, data.cards.map((card: ICards) => card.code).join(','));
}

export const newDeck = (name: string) => drawToPile('new/draw/?count=5', name);
export const newCard = (id: string, name: string) => drawToPile(`${segment(id)}/draw/?count=1`, name);
export const addPilha = (id: string, name: string, cards: string) => request(`${pilePath(id, name)}/add/?cards=${segment(cards)}`);
export const returnCard = (id: string, name: string, card: string) => request(`${pilePath(id, name)}/return/?cards=${segment(card)}`);
export const shuffleCards = (id: string, name: string) => request(`${pilePath(id, name)}/shuffle/`);
export const listCard = (id: string, name: string) => request(`${pilePath(id, name)}/list/`);
