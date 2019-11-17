export const piecewise3 = (limits, functions, value) => {
    if (value < limits[0]) {
        return functions[0](value)
    } else if (value <= limits[1]) {
        return functions[1](value)
    }

    return functions[2](value)
}

export const piecewise = (limits, functions, value) => {
    for (const [index, lim] of limits.entries()) {
        if (value <= lim) {
            return functions[index](value)
        }
    }

    return functions[functions.length - 1](value)

}