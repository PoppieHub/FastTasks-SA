import {encoded, translations} from './data.js';
import {decodeFields} from './utils/index.js';

const firstResult = decodeFields(encoded, translations, 'Id');
const secondResult = decodeFields(
    encoded,
    translations,
    'Id',
    'groupId',
    'service',
    'formatSize',
    'ca'
);

console.info('Использование без передаваемых параметров в виде исключения при раскодировании:');
console.log(firstResult);
console.info('Вывод уникальных id (без исключений):');
console.table(firstResult.uniqueIds);

console.info('Использование с передаваемыми параметрами в виде исключения при раскодировании:');
console.log(secondResult.decoded);
console.info('Вывод уникальных id (с исключениями):');
console.table(secondResult.uniqueIds);