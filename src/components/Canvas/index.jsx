import React, {Component} from 'react'

import styles from './canvas.module.css';

const Robot = ({
  x,
  y
}) => (
  <div 
    className={styles.robot}
    style={{
      left: `${x}px`,
      top: `${y}px`,
    }}
  >
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
      posicion_robot: {
        x: 0,
        y: 0,  
      },
      velocidad_robot: {
        magnitud: 0,
        direccion: 0
      },
      posicion_pelota: {
        x: 0,
        y: 0,  
      },
      
    }

    //imagen velocidad.png
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
      posicion_robot,
      posicion_pelota,
    })
  }

  componentWillMount() {
    this.generateNewPositions()    
  }

  render() {
    const {
      posicion_robot,
      posicion_pelota,
    } = this.state
    return (
      <div className={styles.canvas}>
        <div className={styles.playground}>
          <Robot x={posicion_robot.x} y={posicion_robot.y}/>
          <Pelota x={posicion_pelota.x} y={posicion_pelota.y}/>
        </div>
        <div>
          <button 
            onClick={ () => this.generateNewPositions()}
          >
            Empezar
          </button>
          <button
            onClick={ () => console.log("Iniciar logica")}
          >
            Iniciar
          </button>
        </div>
      </div>
    )
  }
}

export default Canvas;