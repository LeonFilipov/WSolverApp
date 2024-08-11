import React, { MouseEventHandler } from "react"

type ResponseWordType = {
    children: React.ReactNode;
    onClick: MouseEventHandler;
}

export const ResponseWord = ({ children, onClick } : ResponseWordType) => {
    return (
        <button className="response-word" onClick={onClick}>
            { children }
        </button>
    )
}