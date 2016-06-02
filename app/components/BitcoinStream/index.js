/**
*
* BitcoinStream
*
*/

import React from 'react';

import { call } from 'redux-saga/effects';

import styles from './styles.css';

import request from 'utils/request';

import Block from 'components/Block';

class BitcoinStream extends React.Component {

  constructor() {
    super();
    this.state = { blocks: [] }
  }

  async componentDidMount() {
    const blocksUrl = "https://bitcoin.toshi.io/api/v0/blocks";

    request(blocksUrl)
      .then(blocks => this.setState({blocks: blocks.data}))
  }
  
  render() {
    return (
      <div className={ styles.bitcoinStream }>
        { this.state.blocks.map(this.renderBlock) }
      </div>
    );
  }

  renderBlock(block) {
    return <Block data={block} />;
  }
}

export default BitcoinStream;
