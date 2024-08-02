// Query creation
export const createQuery = (wordJson) => {
    let query = '';
    for (let p of wordJson.perfect) {
        query += `SUBSTR(word, ${p.position}, 1) = '${p.letter}' AND `;
    }
    for (let c of wordJson.correct) {
        query += `NOT SUBSTR(word, ${c.position}, 1) = '${c.letter}' AND word LIKE '%${c.letter}%' AND `;
    }
    for (let a of wordJson.absent) {
        if (a.position.length === 0) {
            query += `NOT word LIKE '%${a.letter}%' AND `;
        }
        else {
            for (let pos of a.position) {
                query += `NOT SUBSTR(word, ${pos}, 1) = '${a.letter}' AND `;
            }
        }
    }
    query = query.slice(0, -4);
    query += "ORDER BY RANDOM() LIMIT 10;";
    return query;
};
