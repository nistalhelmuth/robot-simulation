import React, {Component} from 'react'

import styles from './canvas.module.css';

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
    <div className={styles.robotEyes}/>
  </div>
)

const Pelota = ({
  x,
  y
}) => (
  <div 
    className={styles.pelota}
    style={{
      left: `${x}px`,
      top: `${y}px`,
    }}
  >
  </div>
)


class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robot: {
        posicion: {
          x:0,
          y:0,
        },
        direccion:0,
      },
      pelota: {
        posicion: {
          x:0,
          y:0,
        },
      },
    }

    //FUNCIONES 
    //morado
    const velocidad_rapida = (distancia) => 
      distancia < 0.2? 1: (-distancia*5+2)
    //verde
    const velocidad_media = (distancia) => 
      distancia < 0.4 ? (distancia*5-1): 0.6 < distancia? (-distancia*5+4): 1
    //azul
    const velocidad_lenta = (distancia) => 
      0.8 < distancia? 1: (-distancia*5+2)

    //360 == 1
    //rojo
    const rotacion_iz_rapida = (angulo) => 
      angulo < 0.2? (-5*angulo+1): 0
    //verde
    const rotacion_iz_lenta = (angulo) => 
      angulo < 0.1? 0 : angulo < 0.3? (5*angulo-0.5): angulo < 0.5? (-5*angulo+2.5):0
    //morado
    const rotacion_de_lenta = (angulo) => 
      angulo < 0.3? 0 : angulo < 0.7? (5*angulo-2.5): angulo < 0.9? (-5*angulo+4.5):0
    //azul
    const rotacion_de_rapida = (angulo) => 
        angulo < 0.9? 0 : (5*angulo-4)
  }

  //crear posiciones random
  generateNewPositions() {
    const posicion_robot = {
      x: Math.random() * 500,
      y: Math.random() * 500,  
    };
    const posicion_pelota = {
      x: Math.random() * 500,
      y: Math.random() * 500,  
    };
    this.setState({
      ...this.state,
      robot: {
        ...this.state.robot,
        posicion: posicion_robot,
        direccion: 0,
      },
      pelota: {
        ...this.state.pelota,
        posicion: posicion_pelota,
      }
    })
  }

  //al iniciar
  componentWillMount() {
    this.generateNewPositions()    
  }

  moverPelota(magnitud){
    //evaluar su posicion
    const robot_position = {
      x: this.state.robot.posicion.x + magnitud * Math.cos(this.state.robot.direccion * Math.PI / 180),
      y: this.state.robot.posicion.y + magnitud * Math.sin(this.state.robot.direccion * Math.PI / 180),
    }
    this.setState({ 
      robot: {
        ...this.state.robot,
        posicion: robot_position,
      },
    })
  }

  rotarPelota(grados){
    //evaluar su dirección
    this.setState({ 
      robot:{
        ...this.state.robot,
        direccion: this.state.robot.direccion + grados,
      } 
    })
  }

  render() {
    const {
      robot,
      pelota,
    } = this.state
    return (
      <div className={styles.canvas}>
        <div className={styles.playground}>
          <Robot x={robot.posicion.x} y={robot.posicion.y} direccion={robot.direccion}/>
          <Pelota x={pelota.posicion.x} y={pelota.posicion.y}/>
        </div>
        <div>
          <button 
            onClick={ () => this.generateNewPositions()}
          >
            Empezar
          </button>
          <button
            onClick={ () => this.moverPelota(10)}
          >
            Mover
          </button>
          <button
            onClick={ () => this.rotarPelota(10)}
          >
            Rotar
          </button>
        </div>
      </div>
    )
  }
}

export default Canvas;