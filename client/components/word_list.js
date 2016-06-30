// @flow

import type {Word} from 'types/word';

import React from 'react';

const ulStyle = {
  padding: '5px',
  display: 'flex',
  flexDirection: 'column'
};

const liStyle = {
  listStyleType: 'none',
  border: '1px solid #fafafa',
  padding: '15px 5px',
  margin: '5px 0',
  backgroundColor: '#ebfaff'
};

export default class WordList extends React.Component {
  props: {
    words?: Array<Word>,
  };

  render() {
    const words: Array<Word> = [...Array(20)].map((_, i) => {
      return {
        id: String(i),
        value: `word ${i}`,
        definition: `definition ${i}`
      };
    });

    const elements = words.map(w => {
      return <li key={w.id} style={liStyle}>{w.value} - {w.definition}</li>;
    });

    return (
      <ul style={ulStyle}>
        {elements}
      </ul>
    );
  }
}
