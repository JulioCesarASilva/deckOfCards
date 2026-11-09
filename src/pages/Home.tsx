import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Historic from '../components/Historic';
import { newDeck } from '../util/api';
import { setStorage } from '../util/func';

export default function Home() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function startGame(event: FormEvent) {
        event.preventDefault();
        const player = name.trim();
        if (!player || loading) return;
        setLoading(true);
        setError('');
        try {
            const data = await newDeck(player);
            setStorage({ deck_id: data.deck_id, name: player });
            navigate(`/${encodeURIComponent(data.deck_id)}&${encodeURIComponent(player)}`);
        } catch {
            setError('Não foi possível criar a mesa. Confira sua conexão e tente novamente.');
        } finally { setLoading(false); }
    }

    return <div className="app-shell"><Header /><main className="home-layout">
        <section className="intro"><p className="eyebrow"><span /> A MESA ESTÁ PRONTA</p>
            <h1>Sua próxima<br />jogada começa <em>aqui.</em></h1>
            <p className="intro-copy">Puxe uma cadeira, embaralhe as possibilidades e descubra as cartas da sua vez.</p>
            <div className="card-art" aria-hidden="true"><div className="art-card art-back">♣</div><div className="art-card art-middle"><span>Q ♥</span><b>♥</b><span>♥ Q</span></div><div className="art-card art-front"><span>A ♠</span><b>♠</b><span>♠ A</span></div></div>
            <div className="intro-caption"><span>52 cartas</span><i /> <span>Infinitas possibilidades</span></div>
        </section>
        <section className="welcome-panel" aria-labelledby="welcome-title"><span className="panel-suit" aria-hidden="true">♠</span><p className="eyebrow">BEM-VINDO À MESA</p><h2 id="welcome-title">Vamos jogar?</h2><p>Você começa com 5 cartas.<br />O próximo movimento é seu.</p>
            <form onSubmit={startGame}><label htmlFor="player-name">Como podemos chamar você?</label><input id="player-name" value={name} onChange={event => setName(event.target.value)} placeholder="Seu nome" maxLength={40} required autoComplete="nickname" disabled={loading} /><button className="button primary" disabled={loading || !name.trim()}>{loading ? 'Preparando a mesa…' : 'Abrir minha mesa'}<span aria-hidden="true">→</span></button>{error && <p className="error" role="alert">{error}</p>}</form>
            <div className="panel-note"><span aria-hidden="true">♧</span> Sem cadastro. É só chegar e jogar.</div><Historic />
        </section>
    </main><footer className="site-footer"><span>FEITO PARA QUEM GOSTA DE UMA BOA JOGADA</span><span aria-hidden="true">♠ <span className="red-suit">♥ ♦</span> ♣</span></footer></div>;
}
