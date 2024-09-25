import { MouseEventHandler } from "react"
import { ResponseWord } from "./ResponseWord"
import { WordResponse } from "../types/types"

type ReponseDisplayProps = {
    response: WordResponse,
    handler: MouseEventHandler,
}

export const ResponseDisplay = ({ response, handler }: ReponseDisplayProps) => {
    return (
        <>
        { response.words.length > 0 && 
        <main className="response-display">
            {
                Array.from({ length: response.words.length}, (_, i) =>{
                    return <ResponseWord key={i} onClick={ handler }> { response.words[i].word } </ResponseWord>
                })
            }
        </main>
        }
        </>
    )
}