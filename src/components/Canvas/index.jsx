import React, {Component} from 'react'

import styles from './canvas.module.css';

const Robot = ({
  x,
  y,
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
      robot: {
        posicion: {
          x:0,
          y:0,
        },
        velocidad: {
          magnitud:0,
          direccion:0,
        },
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
        posicion: posicion_robot
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

  //actualizar es estado despues de que shouldComponentUpdate regrese true
  componentDidUpdate(prevProps, prevState, snapshot) {
    const robot_position = {
      x: this.state.robot.posicion.x + this.state.robot.velocidad.magnitud * Math.cos(this.state.robot.velocidad.direccion),
      y: this.state.robot.posicion.y + this.state.robot.velocidad.magnitud * Math.sin(this.state.robot.velocidad.direccion),
    }
    this.setState({ 
      robot: {
        ...this.state.robot,
        posicion: robot_position,
        velocidad: {
          magnitud: 0,
          direccion: 0,
        }
      },
    })
  }

  //revisar si es necesario renderizar los componentes
  shouldComponentUpdate(nextProps, nextState) {
    //ERROR: se necesita correr dos veces el proceso para que funcione
    if (nextState.robot.velocidad.magnitud !== this.state.robot.velocidad.magnitud) {
      console.log(nextState, this.state)
      return true
    }
    return false
  }

  // abstracción para mover la pelota
  moverPelota(magnitud, direccion){
    this.setState({ 
      robot:{
        ...this.state.robot,
        velocidad: {
          magnitud,
          direccion, 
        }
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
          <Robot x={robot.posicion.x} y={robot.posicion.y}/>
          <Pelota x={pelota.posicion.x} y={pelota.posicion.y}/>
        </div>
        <div>
          <button 
            onClick={ () => this.generateNewPositions()}
          >
            Empezar
          </button>
          <button
            onClick={ () => this.moverPelota(10, 0)}
          >
            Mover
          </button>
        </div>
      </div>
    )
  }
}

export default Canvas;