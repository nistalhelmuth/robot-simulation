import React, {Component} from 'react'

import styles from './canvas.module.css';


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: undefined,
      ball: {
        x:undefined,
        y:undefined,
      },
      robot: {
        position: {
          x:undefined,
          y:undefined,
        },
        angle: undefined,
        speed: undefined,
      },
      punch: {
        angle: undefined,
        force: undefined,
      }
    };
  }

  

  render() {
    return (
      <div className={styles.canvas}>
        <div className={styles.playground}>
        
        </div>
        <div className={styles.buttons}>
          <button>Empezar</button>
          <button>Jugar</button>
        </div>
      </div>
    )
  }
}

export default Canvas;