import { piecewise } from "../utils/mathFunctions";

const posibleMovements = {
    MoveLeft: "MoveLeft",
    MoveRight: "MoveRight",
    MoveForward: "MoveForward"
}

const posibleSpeeds = {
    Slow: "Slow",
    Fast: "Fast"
}

// Calculate difference in a Small, Medium, Large sense
const calculateFuzzyPositionDifference = (difference) => {
    const small = piecewise([140, 160], [(difference) => 1, (difference) => -difference / 20 + 8, (difference) => 0], difference)
    const medium = piecewise([140, 160, 280, 320], [(difference) => 0, (difference) => difference / 20 - 7, (difference) => 1, (difference) => -difference / 40 + 8, (difference) => 0], difference)
    const large = piecewise([280, 320], [(difference) => 0, (difference) => difference / 40 - 7, (difference) => 1], difference)
    return [small, medium, large]
}

// Calculate angle in a Left, Front, Right sense
const calculateFuzzyDirection = (diffX, diffY) => {
    const angle = Math.atan2(diffY, diffX) * 180 / Math.PI
    const left = piecewise([-45, 0], [(angle) => 1, (angle) => -angle / 45, (angle) => 0], angle)
    const front = piecewise([-45, 0, 45], [(angle) => 0, (angle) => angle / 45 + 1, (angle) => -angle / 45 + 1, (angle) => 0], angle)
    const right = piecewise([0, 45], [(angle) => 0, (angle) => angle / 45, (angle) => 1], angle)
    return [left, front, right]
}

export const robotFuzzyfier = (state) => {
    const diffX = state.robot.position.x - state.ball.position.x
    const diffY = state.robot.position.y - state.ball.position.y
    return {
        position: {
            diffX: calculateFuzzyPositionDifference(Math.abs(diffX)),
            diffY: calculateFuzzyPositionDifference(Math.abs(diffY))
        },
        rotation: {
            direction: calculateFuzzyDirection(diffX, diffY)
        }
    }
}

// From Move left, move right, move straight to a State
export const robotDefuzzyfier = (fuzzyValue, originalState) => {

}

export const robotRules = (fuzzySet) => {
    const direction = fuzzySet.rotation.direction
    // Left or Front or Right
    const newRotation = direction.indexOf(Math.max(direction))
    const speed = posibleSpeeds.Slow

    //TODO Make speed rule

}