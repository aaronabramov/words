// @flow

import fetch from 'node-fetch';
import xml2json from 'xml2json';

const API_KEY = '94bf7167-334d-4ae6-8388-ca02ba793f30';

const map = entry => {
  return {
    word: entry.id,
    definition: entry.def.dt,
    pronunciation: entry.pr,
    fl: entry.fl,
  };
};

export const get = (word: string) => {
  return fetch(`http://www.dictionaryapi.com/api/v1/references/learners/xml/${word}?key=${API_KEY}`)
    .then(result => result.text())
    .then(text => {
      const parsed = JSON.parse(xml2json.toJson(text));
      let entry = parsed.entry_list.entry;
      if (!entry) {
        return [];
      }

      if (!Array.isArray(entry)) {
        entry = [entry];
      }

      return entry.map(map);
    });
};
