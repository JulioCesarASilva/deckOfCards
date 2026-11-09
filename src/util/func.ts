import { IStorage } from '../typings/types';

export const setStorage = (data: Pick<IStorage, 'deck_id' | 'name'>) => {
    try { window.localStorage.setItem('deckofcard', JSON.stringify({ ...data, time: dataHora() })); }
    catch { /* A mesa continua disponível mesmo sem armazenamento local. */ }
};

export const getStorage = (): IStorage | null => {
    try {
        const value = JSON.parse(window.localStorage.getItem('deckofcard') || 'null');
        return value && typeof value.deck_id === 'string' && typeof value.name === 'string' && typeof value.time === 'string' ? value : null;
    } catch { return null; }
};

export const dataHora = () => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date());
