import { Link } from 'react-router-dom';
import { getStorage } from '../util/func';

export default function Historic() {
    const storage = getStorage();
    if (!storage) return null;
    return <Link className="history-link" to={`/${encodeURIComponent(storage.deck_id)}&${encodeURIComponent(storage.name)}`}>
        <span className="history-icon" aria-hidden="true">↗</span>
        <span><strong>Continuar com {storage.name}</strong><small>Última mesa · {storage.time}</small></span>
        <span aria-hidden="true">→</span>
    </Link>;
}
