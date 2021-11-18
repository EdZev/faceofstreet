import fetch from 'node-fetch';
import parser from './parserXlsx';

export default (path) => fetch(path)
  .then((response) => {
    if (!response.ok) throw Error('not found');
    return response;
  })
  .then((res) => res.arrayBuffer())
  .then((dataSheets) => parser(dataSheets))
  .catch((err) => err.message);
