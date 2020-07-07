export interface Joke {
    categories: Array<string>;
    dateCreated?: Date;
    iconUrl?: string;
    id: string;
    dateUpdated: Date;
    url?: string;
    value: string;
    favourite: boolean;
}