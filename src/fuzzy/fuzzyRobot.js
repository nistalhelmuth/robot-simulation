import { piecewise } from "../utils/mathFunctions";
import { fuzzyOr, fuzzyAnd } from "../utils";

// Angle Functions
const left = (angle) => piecewise([-0.75, -0.25], [(angle) => 1, (angle) => (-2 * angle - 0.5), (angle) => 0], angle)
const front = (angle) => piecewise([-1, 0, 1], [(angle) => 0, (angle) => (angle + 1), (angle) => (-angle + 1), (angle) => 0], angle)
const right = (angle) => piecewise([0.25, 0.75], [(angle) => 0, (angle) => (2 * angle - 0.5), (dangle) => 1], angle)

// Distance Functions
const farNegative = (distance) => piecewise([-1, 0], [(distance) => 1, (distance) => -distance, (distance) => 0], distance)
const nearNegative = (distance) => piecewise([-0.6, -0.25], [(distance) => 0, (distance) => (3 * distance + 1.75), (distance) => 1], distance)
const farPositive = (distance) => piecewise([0, 1], [(distance) => 0, (distance) => distance, (distance) => 1], distance)
const nearPositive = (distance) => piecewise([0.25, 0.6], [(distance) => 1, (distance) => (-3 * distance + 1.75), (distance) => 0], distance)

// Outputs
const rotateLeft = (x) => piecewise([0.5, 0], [(x) => 1, (x) => (-2 * x), (x) => 0], x)
const goForward = (x) => piecewise([-1, 0, 1], [(x) => 0, (x) => (x + 1), (x) => (-x + 1), (x) => 0], x)
const rotateRight = (x) => piecewise([0, 0.5], [(x) => 0, (x) => (2 * x), (x) => 1], x)

// Get distance functions in a Small, Medium, Large sense
const getFuzzyPositionDistance = (distance) => {
    return [farNegative(distance), farPositive(distance), nearNegative(distance), nearPositive(distance)]
}

// Get angle functions in a Left, Front, Right sense
const getFuzzyDirection = (angle) => {
    return [left(angle), front(angle), right(angle)]
}

export const robotFuzzyfier = (state) => {
    const diffX = state.robot.posicion.x - state.pelota.posicion.x
    const diffY = state.robot.posicion.y - state.pelota.posicion.y
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    const angle = Math.atan2(diffY, diffX) * 180 / Math.PI
    const distances = getFuzzyPositionDistance(distance)
    return {
        distance: distances,
        angle: getFuzzyDirection(angle)
    }
}

// From Move left, move right, move straight to a State
export const robotDefuzzyfier = (fuzzyValue, originalState) => {

}

export const robotRules = (fuzzySet) => {
    const hypothesisGoLeft = fuzzyOr([fuzzySet.distance[0], fuzzySet.angle[0]])
    console.log(hypothesisGoLeft())
    const hypothesisGoRight = fuzzyOr([fuzzySet.distance[1], fuzzySet.angle[2]])
    const hypothesisGoForward0 = fuzzyOr([fuzzySet.distance[2], fuzzySet.angle[1]])
    const hypothesisGoForward1 = fuzzyOr([fuzzySet.distance[4], fuzzySet.angle[1]])

    const hypothesisArray = [hypothesisGoLeft, hypothesisGoRight, hypothesisGoForward0, hypothesisGoForward1]
    const outputs = [rotateLeft, goForward, rotateRight]
    const clauses = []
    for (let hypo of hypothesisArray) {
        const clausesForHypothesis = []
        for (let output of outputs) {
            clausesForHypothesis.push(fuzzyAnd([hypo, output]))
        }
        clauses.push(clausesForHypothesis)
    }

    console.log(clauses[0][0](0.5))
}