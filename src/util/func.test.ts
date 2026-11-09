import { getStorage, setStorage } from './func';

beforeEach(() => localStorage.clear());

it('ignora histórico inválido', () => {
    localStorage.setItem('deckofcard', '{');
    expect(getStorage()).toBeNull();
    localStorage.setItem('deckofcard', JSON.stringify({ name: 'Ana' }));
    expect(getStorage()).toBeNull();
});

it('salva a mesa sem alterar os dados recebidos', () => {
    const data = { deck_id: 'deck1', name: 'Ana' };
    setStorage(data);
    expect(getStorage()).toMatchObject(data);
    expect(getStorage()?.time).toEqual(expect.any(String));
    expect(data).not.toHaveProperty('time');
});
