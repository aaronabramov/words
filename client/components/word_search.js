// @flow
import React from 'react';

const inputStyle = {
  height: '25px',
  flex: '1',
  padding: '5px 10px',
};

const buttonStyle = {
  backgroundColor: '#d1f3ff',
  border: '0',
};

export default class WordSearch extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <input
          style={inputStyle}
          placeholder="search a word or a phrase"
        />
        <button style={buttonStyle}>Search</button>
      </div>
    );
  }
}
