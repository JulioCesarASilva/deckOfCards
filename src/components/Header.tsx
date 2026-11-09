import { Link } from 'react-router-dom';

interface HeaderProps { deck_id?: string; deck_name?: string; back?: boolean }

export default function Header({ deck_id, deck_name, back }: HeaderProps) {
    return <header className="site-header">
        <Link to="/" className="brand"><span className="brand-icon" aria-hidden="true">♠</span> baralho<span className="brand-dot">.</span></Link>
        <div className="header-detail">{back ? <><span className="player-name">{deck_name}</span><Link className="back-link" to="/">← Início</Link></> : <span>Um baralho. Muitas possibilidades.</span>}</div>
    </header>;
}
