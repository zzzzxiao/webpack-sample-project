import config from "./config.json";
import React from 'react';
import styles from './content.css';
class Content extends React.Component{
  render() {
    return (
      <div className={styles.root}>//添加类名
        {config.greetText}
      </div>
    );
  }
}

export default Content