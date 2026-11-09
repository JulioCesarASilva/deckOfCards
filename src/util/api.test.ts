import { listCard, newDeck } from './api';

const fetchMock = jest.fn();
beforeEach(() => { global.fetch = fetchMock; fetchMock.mockReset(); });

it('compra cinco cartas e adiciona à pilha com o nome codificado', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, deck_id: 'deck1', cards: [{ code: 'AS' }, { code: 'KH' }] }) });
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, deck_id: 'deck1' }) });
    await expect(newDeck('Ana & João')).resolves.toMatchObject({ deck_id: 'deck1' });
    expect(fetchMock.mock.calls[0][0]).toBe('https://deckofcardsapi.com/api/deck/new/draw/?count=5');
    expect(fetchMock.mock.calls[1][0]).toContain('/pile/Ana%20%26%20Jo%C3%A3o/add/?cards=AS%2CKH');
});

it('rejeita falhas HTTP e respostas com erro da API', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });
    await expect(listCard('deck1', 'Ana')).rejects.toThrow();
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ success: false, error: 'Deck not found' }) });
    await expect(listCard('deck1', 'Ana')).rejects.toThrow('Deck not found');
});
