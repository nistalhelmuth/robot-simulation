export const fuzzyOr = (fuzzyVars) => {
    return () => Math.max(...fuzzyVars.map((fvar) => fvar()))
}

export const fuzzyAnd = (fuzzyVars) => {
    const val1 = fuzzyVars[0]()
    const val2 = fuzzyVars[1](x)
    // return (x) => Math.min(, )
}