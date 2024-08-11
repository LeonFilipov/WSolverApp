import { MouseEventHandler } from "react"
import { ResponseWord } from "./ResponseWord"

type ReponseDisplayProps = {
    words: string[],
    handler: MouseEventHandler,
}

export const ResponseDisplay = ({ words, handler }: ReponseDisplayProps) => {
    return (
        <>
        { words.length > 0 && 
        <main className="response-display">
            {
                Array.from({ length: words.length}, (_, i) =>{
                    return <ResponseWord onClick={ handler }> { words[i] } </ResponseWord>
                })
            }
        </main>
        }
        </>
    )
}