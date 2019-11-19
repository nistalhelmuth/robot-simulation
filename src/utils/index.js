export const fuzzyOr = (fuzzyVars) => {
    return () => Math.max(...fuzzyVars.map((fvar) => fvar()))
}

export const fuzzyOrHard = (fuzzyVars) => {
    return () => Math.max(...fuzzyVars)
}

export const fuzzyAnd = (fuzzyVars) => {
    return (x) => Math.min(fuzzyVars[0](), fuzzyVars[1](x)())
}

