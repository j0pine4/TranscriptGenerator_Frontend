export interface Transcript{
    transcript: string,
    allowed: boolean,
    token_limit: number,
    new_transcript_token_amount: number,
    tokensUsed: number,
    tokensLeft: number,
}