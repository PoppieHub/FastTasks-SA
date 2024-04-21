export default (encoded, translations, suffix = '', ...exceptions) => {
    const decoded = [];
    const uniqueIds = new Set();

    if (!Array.isArray(encoded) ||
        typeof translations !== 'object' ||
        translations === null ||
        typeof suffix !== 'string'
    ) {
        throw new Error('Неверные типы данных или отсутствие данных для декодирования.');
    }

    encoded.map(item => {
        if (typeof item !== 'object' || item === null) {
            throw new Error('Переданный encoded содержит недопустимую структуру данных.');
        }

        const decodedItem = {};

        Object.entries(item).forEach(([key, value]) => {
            if (key.endsWith(suffix) &&
                translations[value] !== undefined &&
                !exceptions.includes(key)
            ) {
                decodedItem[key] = translations[value];
                uniqueIds.add(value);
            } else {
                decodedItem[key] = value;
            }
        });

        decoded.push(decodedItem);
    });

    return {
        decoded: decoded,
        uniqueIds: [...uniqueIds]  // превращаем в обычный массив
    };
}