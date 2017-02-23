import config from "./config.json";
import React from 'react';
import styles from './content.css';
class Content extends React.Component {
  getDetail (e) {
    alert(e.target.id);
  }
  render() {
    return (
      <div className={styles.root} > {config.greetText}
        今天天气还不错~~
        <button id="clickMe" onClick={this.getDetail}>点击我试试</button>
    </div>
    );
  }
}

export default Content;
