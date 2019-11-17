export const fuzzyLogic = (state, fuzzyfier, defuzzyfier, rules) => {
    let fuzzySet = fuzzyfier(state)
    let fuzzyOutput = rules(fuzzySet)
    let crispValue = defuzzyfier(fuzzyOutput)
    return crispValue
}