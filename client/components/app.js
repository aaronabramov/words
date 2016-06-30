// @flow

import React from 'react';
import WordList from './word_list';
import WordSearch from './word_search';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <WordSearch />
        <WordList />
      </div>
    );
  }
}
