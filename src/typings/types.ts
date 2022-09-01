export default interface IStyle {
    [key: string]: React.CSSProperties;
}

export interface IStorage {
    deck_id: string,
    name: string,
    time: string
} 