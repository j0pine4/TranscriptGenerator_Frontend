export interface Document {
    id?: number,
    user: number,
    videoID: string,
    title: string,
    description: string,
    content: string,
    type: string,
    created_on: string,
    last_modified: string,
}