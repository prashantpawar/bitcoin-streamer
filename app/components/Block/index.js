/**
*
* Block
*
*/

import React from 'react';

import styles from './styles.css';

class Block extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    limit: React.PropTypes.number,
  };

  static defaultProps = {
    limit: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      transactionHashes: [],
      displayTruncation: false,
      expanded: false,
    };
    this.expandBlock = this.expandBlock.bind(this);
  }

  componentWillMount() {
    this.updateState();
  }

  componentWillReceiveProps() {
    this.updateState();
  }

  expandBlock() {
    this.setState({
      expanded: !this.state.expanded,
      transactionHashes: this.props.data.transaction_hashes,
    });
  }

  updateState() {
    let transactionHashes = this.props.data.transaction_hashes;
    let displayTruncation = false;

    if (this.state.expanded === false) {
      if (this.state.expanded || this.props.limit > 0) {
        transactionHashes = transactionHashes.slice(0, this.props.limit);
      }

      if (this.props.data.transactions_count > this.props.limit) {
        displayTruncation = true;
      }
    }

    this.setState({
      transactionHashes,
      displayTruncation,
    });
  }

  renderTruncationBlock() {
    if (this.state.displayTruncation) {
      return (
        <div>
          <li className={styles.blockTruncatedEllipses}>&#8230;</li>
          <li className={styles.blockTruncatedMsg}>{this.props.data.transactions_count - this.props.limit} More Tx</li>
          <li className={styles.expanded} onClick={this.expandBlock}>&#x25BC; Expand</li>
        </div>
      );
    }

    return '';
  }

  renderTx(tx) {
    return (
      <li className={styles.txHash} key={tx}>{tx}</li>
    );
  }

  render() {
    return (
      <li className={styles.block}>
        <h2 className={styles.blockHash}>Block hash: {this.props.data.hash}</h2>
        <ul className={styles.blockDetails}>
          <li><h3>Transactions</h3></li>
          {this.state.transactionHashes.map(this.renderTx)}
          {this.renderTruncationBlock()}
        </ul>
        <footer className={styles.footer}>Block: {this.props.data.height}</footer>
      </li>
    );
  }
}

export default Block;
