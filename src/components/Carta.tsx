import { ICards } from '../typings/deckofcardsapi';

const suits: Record<string, string> = { SPADES: 'Espadas', HEARTS: 'Copas', DIAMONDS: 'Ouros', CLUBS: 'Paus' };
const values: Record<string, string> = { ACE: 'Ás', KING: 'Rei', QUEEN: 'Dama', JACK: 'Valete' };

export default function Carta({ images, value, suit }: ICards) {
    const label = `${values[value] || value} de ${suits[suit] || suit}`;
    return <figure className="playing-card"><img src={images.png} alt={label} /><figcaption>{label}</figcaption></figure>;
}
