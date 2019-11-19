import React, { Component } from 'react'

import styles from './canvas.module.css';
import { fuzzyLogic } from "../../fuzzy";
import { robotFuzzyfier, robotDefuzzyfier, robotRules, goForward, rotateLeft, rotateRight } from "../../fuzzy/fuzzyRobot";

const Robot = ({
  x,
  y,
  direccion, //esto esta en grados
}) => (
    <div
      className={styles.robot}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${direccion}deg)`,
      }}
    >
      <div className={styles.robotEyes} />
    </div>
  )

const Pelota = ({
  x,
  y,
  tiroX,
  tiroY,
}) => (
    <div
      className={styles.pelota}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(${tiroX}px, ${tiroY}px)`,
      }}
    >
    </div>
  )

const Porterilla = () => (
  <div
    className={styles.porterilla}
  />
)


class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robot: {
        posicion: {
          x: 0,
          y: 0,
        },
        direccion: 0,
      },
      pelota: {
        posicion: {
          x: 0,
          y: 0,
        },
        tiro: {
          x: 0,
          y: 0,
        }
      },
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //crear posiciones random y direccion inicial
  generarPosiciones() {
    console.log('new')
    clearInterval(this.interval);
    this.setState(prevState => ({
      ...prevState,
      robot: {
        direccion: 0,
        posicion: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        }
      },
      pelota: {
        ...prevState.pelota,
        posicion: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
      },
    })
    )
  }

  //al iniciar
  componentWillMount() {
    this.generarPosiciones()
  }

  moverRobot(magnitud) {
    this.setState(prevState => {
      const nuevo_x = prevState.robot.posicion.x + magnitud * Math.cos(prevState.robot.direccion * Math.PI / 180);
      const nuevo_y = prevState.robot.posicion.y + magnitud * Math.sin(prevState.robot.direccion * Math.PI / 180);
      return {
        robot: {
          ...prevState.robot,
          posicion: {
            //Creo que la validación no es necesaria con la lógica difusa
            //x: 0 > nuevo_x? 0 : (nuevo_x < 500? nuevo_x : 500),
            //y: 0 > nuevo_y? 0 : (nuevo_y < 500? nuevo_y : 500),
            x: nuevo_x,
            y: nuevo_y,
          },
        },
      }
    }
    )
  }

  rotarPelota(grados) {
    this.setState(prevState => ({
      robot: {
        ...prevState.robot,
        direccion: (prevState.robot.direccion + grados),
      }
    })
    )
  }

  evaluarEstado() {
    //evaluar el estado
    const crisp = fuzzyLogic(this.state, robotFuzzyfier, robotDefuzzyfier, robotRules)
    const impulso = goForward(crisp)()
    let dir = 0
    if (crisp > 0) {
      dir = rotateRight(crisp)()
    } else {
      dir = rotateLeft(crisp)()
    }
    this.rotarPelota(5 * dir)
    this.moverRobot(10 * impulso)
    console.log(impulso)
    console.log(dir)
  }

  empezar() {
    this.interval = setInterval(() => this.evaluarEstado(), 50);
    // fuzzyLogic(this.state, robotFuzzyfier, robotDefuzzyfier, robotRules)
  }

  parar() {
    clearInterval(this.interval);
  }

  tirar() {
    this.setState(prevState => {
      const delta_x = 525 - prevState.pelota.posicion.x;
      const delta_y = 240 - prevState.pelota.posicion.y;
      const nuevo_x = Math.floor(Math.random() * 50) + delta_x - 50;
      const nuevo_y = Math.floor(Math.random() * 50) + delta_y;
      return {
        pelota: {
          ...prevState.pelota,
          tiro: {
            x: nuevo_x,
            y: nuevo_y,
          },
        },
      }
    }
    )
  }

  render() {
    const {
      robot,
      pelota,
    } = this.state
    return (
      <div className={styles.canvas}>
        <div className={styles.playground}>
          <Robot x={robot.posicion.x} y={robot.posicion.y} direccion={robot.direccion} />
          <Pelota x={pelota.posicion.x} y={pelota.posicion.y} tiroX={pelota.tiro.x} tiroY={pelota.tiro.y} />
          <Porterilla />
        </div>
        <div>
          <button
            onClick={() => this.generarPosiciones()}
          >
            Nuevo
          </button>
          <button
            onClick={() => this.empezar()}
          >
            Empezar
          </button>
          <button
            onClick={() => this.parar()}
          >
            stop
          </button>
          <button
            onClick={() => this.tirar()}
          >
            tirar
          </button>
        </div>
      </div>
    )
  }
}

export default Canvas;