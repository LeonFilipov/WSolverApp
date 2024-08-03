import { z } from "zod"

export const letterSchema = z.object({
    letter: z.string(),
    position: z.number()
});

export const absentLetterSchema = z.object({
    letter: z.string(),
    position: z.array(z.number())
})

export const lettersSchema = z.object({
    perfect: z.array(letterSchema),
    correct: z.array(letterSchema),
    absent: z.array(absentLetterSchema)
})
