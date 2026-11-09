import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carta from '../components/Carta';
import Header from '../components/Header';
import { listCard, newCard, shuffleCards } from '../util/api';
import IDeck from '../typings/deckofcardsapi';

export default function Baralho() {
    const { deck_id, name } = useParams();
    const [data, setData] = useState<IDeck | null>(null);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState('');
    const [error, setError] = useState('');
    const loadCards = useCallback(async () => {
        if (!deck_id || !name) throw new Error('Mesa inválida');
        const result = await listCard(deck_id, name);
        if (!result.piles?.[name]?.cards) throw new Error('Mesa não encontrada');
        return result;
    }, [deck_id, name]);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError('');
        loadCards().then(result => { if (active) setData(result); }).catch(() => { if (active) setError('Não foi possível carregar a mesa. Volte ao início para tentar novamente.'); }).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [loadCards]);

    async function play(type: 'draw' | 'shuffle') {
        if (!deck_id || !name || action) return;
        setAction(type);
        setError('');
        try {
            await (type === 'draw' ? newCard(deck_id, name) : shuffleCards(deck_id, name));
            setData(await loadCards());
        } catch { setError('Não foi possível atualizar as cartas. Tente novamente.'); }
        finally { setAction(''); }
    }
    const cards = name ? data?.piles?.[name]?.cards || [] : [];
    return <div className="app-shell"><Header deck_name={name} back /><main className="game-layout"><div className="table-heading"><div><p className="eyebrow">SUA MESA</p><h1>As cartas estão com você.</h1><p>Compre uma carta ou embaralhe sua mão para uma nova perspectiva.</p></div><span className="count-badge">{cards.length} / 9 cartas</span></div>
        <section className="card-table" aria-label="Suas cartas" aria-busy={loading || !!action}>{loading ? <p className="table-message" role="status">Preparando suas cartas…</p> : cards.length ? cards.map(card => <Carta key={card.code} {...card} />) : <p className="table-message">Sua mesa está vazia.</p>}</section>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="game-controls"><button className="button primary" onClick={() => play('draw')} disabled={loading || !!action || !data || cards.length >= 9 || data.remaining === 0}>{action === 'draw' ? 'Comprando…' : '＋ Pegar carta'}</button><button className="button secondary" onClick={() => play('shuffle')} disabled={loading || !!action || !cards.length}>{action === 'shuffle' ? 'Embaralhando…' : '↻ Embaralhar'}</button><span>{data ? `${data.remaining} cartas no baralho` : 'Cada carta, uma possibilidade.'}</span></div>
    </main><footer className="site-footer"><span>NO SEU TEMPO. DO SEU JEITO.</span><span aria-hidden="true">♠ ♥ ♦ ♣</span></footer></div>;
}
