import hull from 'hull.js'

const coordToPix = (c: object, xCoord: number, yCoord: number) => {
    const xPix = c.w * (xCoord - c.x1Min) / (c.x1Max - c.x1Min);
    const yPix = c.h - c.h * (yCoord - c.x2Min) / (c.x2Max - c.x2Min);
    return [xPix, yPix]
}

const pixToCoord = (c: object, xPix: number, yPix: number) => {
    const xCoord = xPix * ((c.x1Max - c.x1Min) / c.w) + c.x1Min;
    const yCoord = (yPix - c.h) * (-(c.x2Max - c.x2Min) / c.h) + c.x2Min;
    return [xCoord, yCoord]
}

const getConstraintInfo = (ineqs: Array<any>, addNonNeg: boolean = true) => {
    let allConstraints = (addNonNeg ? [{
        nonNegConstr: true,
        x1Coeff: 1,
        x2Coeff: 0,
        sense: 'g',
        rhs: 0,
        num: ineqs.length
    }, {
        nonNegConstr: true,
        x1Coeff: 0,
        x2Coeff: 1,
        sense: 'g',
        rhs: 0,
        num: ineqs.length + 1
    }] : []).concat(ineqs.map((info, ind) => {
        return {...{
            nonNegConstr: false,
            x1Coeff: info[0],
            x2Coeff: info[1],
            sense: info[2],
            rhs: info[3],
            num: ind
        }, ...info[4]}
    }))
    return allConstraints.map(info => {
        return {
            ...info, ...{
                x2Intercept: info.x2Coeff === 0 ? undefined : info.rhs / info.x2Coeff,
                x1Intercept: info.x1Coeff === 0 ? undefined : info.rhs / info.x1Coeff,
                checkFeasible: (pt: Array<number>) => checkPtFeasibleForConstr(pt, info),
                latexStr: buildLatexStr(info)
            }
        }
    })
}

const buildLatexStr = (info) => {
    let s = '';
    if (info.x1Coeff !== 0) {
        s += `${info.x1Coeff === 1 ? '' : info.x1Coeff === -1 ? '-' : info.x1Coeff}x_1`
        if (info.x2Coeff < 0) {
            s += ' - '
        } else if (info.x2Coeff > 0) {
            s += ' + '
        }
        if (info.x2Coeff !== 0) {
            s += `${Math.abs(info.x2Coeff) === 1 ? '' : Math.abs(info.x2Coeff)}x_2`
        }
    } else {
        if (info.x2Coeff !== 0) {
            s += `${info.x2Coeff === 1 ? '' : info.x2Coeff === -1 ? '-' : info.x2Coeff}x_2`
        } else {
            s += '0'
        }
    }
    s += info.sense === 'l' ? '\\leq' : '\\geq';
    s += ` ${info.rhs}`;
    return s
}

const checkPtFeasibleForConstr = (pt: Array<number>, constrInfo: object, tolerance: number = 0.0001) => {
    const lhs = pt[0] * constrInfo.x1Coeff + pt[1] * constrInfo.x2Coeff;
    const rhs = constrInfo.rhs;
    return constrInfo.sense === 'g' ? lhs >= rhs - tolerance : lhs <= rhs + tolerance
}

const checkPtFeasible = (pt, constraintInfo) => {
    let feasible = true;
    for (const constr of constraintInfo) {
        if (!feasible) {
            break;
        }
        feasible = constr.checkFeasible(pt);
    }
    return feasible;
}

const getVertices = (constrs) => {
    const feasibleIntersections = [];
    let i = 0;
    while (i < constrs.length) {
        let j = i + 1;
        while (j < constrs.length) {
            const pt = getIntersection(
                constrs[i].x1Coeff, constrs[i].x2Coeff, -constrs[i].rhs,
                constrs[j].x1Coeff, constrs[j].x2Coeff, -constrs[j].rhs
            )
            const feasible = !!pt ? checkPtFeasible(pt, constrs) : false;
            if (feasible) {
                feasibleIntersections.push(pt);
            }
            j += 1;
        }
        i += 1;
    }
    const convHull = hull(feasibleIntersections, Infinity);
    return convHull.slice(0, convHull.length - 1).filter(x => !!x);
}

const getIntersection = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number) => {
    // calculate intersection of two lines a1x + b1y + c1 = 0, a2x + b2y + c2 = 0
    if (a1 * b2 == a2 * b1) {
        a1 = a1 / c1;
        b1 = b1 / c1;
        a2 = a2 / c2;
        b2 = b2 / c2;
        if (a1 === a2 && b1 === b2) {
            return Infinity
        }
        return undefined
    }
    const intersect = [(b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1), (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1)]
    return intersect
}

const getEdgeAndFeasibleIntersections = (constants, constraintInfo, objective, objValToPlot) => {
    let edgeIntersections = [
        getIntersection(objective[0], objective[1], -objValToPlot, 1, 0, 0),
        getIntersection(objective[0], objective[1], -objValToPlot, 1, 0, -constants.x1Max),
        getIntersection(objective[0], objective[1], -objValToPlot, 0, 1, 0),
        getIntersection(objective[0], objective[1], -objValToPlot, 0, 1, -constants.x2Max),
    ]
    edgeIntersections = edgeIntersections
        .filter(x => x !== undefined && x !== Infinity)
        .filter(x => x[0] >= 0 && x[0] <= constants.x1Max && x[1] >= 0 && x[1] <= constants.x2Max);
    edgeIntersections = [...new Set(edgeIntersections.map(x => x?.join(',')))].map(s => s?.split(',').map(s => parseFloat(s)));
    let feasibleIntersections = [];
    if (edgeIntersections.length === 0) {
        feasibleIntersections = [];
    } else if (edgeIntersections.length === 1) {
        feasibleIntersections = edgeIntersections.filter(pt => checkPtFeasible(pt, constraintInfo));
    } else {
        const mult = (edgeIntersections[1][1] - edgeIntersections[0][1]) / (edgeIntersections[1][0] - edgeIntersections[0][0]);
        const c = -mult * edgeIntersections[0][0] + parseFloat(edgeIntersections[0][1]);
        feasibleIntersections = constraintInfo.map(cInfo => {
            return getIntersection(mult, -1, c, cInfo.x1Coeff, cInfo.x2Coeff, -cInfo.rhs)
        })
        feasibleIntersections = feasibleIntersections
            .filter(x => x !== undefined && x !== Infinity)
            .filter(pt => checkPtFeasible(pt, constraintInfo));
        feasibleIntersections = [...new Set(feasibleIntersections.map(x => x?.join(',')))].map(s => s?.split(',').map(s => parseFloat(s)));
    }
    return [edgeIntersections, feasibleIntersections]
}

const getPlotStartEnd = (cInfo: Object, constants: Object) => {
    const uniqueEdgePoints = [
        [1, 0, 0], [0, 1, 0], [1, 0, -constants.x1Max], [0, 1, -constants.x2Max]
    ].map(x => {
        return getIntersection(cInfo.x1Coeff, cInfo.x2Coeff, -cInfo.rhs, x[0], x[1], x[2]);
    }).filter(x => !!x).filter(x => {
        return x[0] >= 0 && x[0] <= constants.x1Max && x[1] >= 0 && x[1] <= constants.x2Max
    })
    return [...new Set(uniqueEdgePoints.map(x => x.join(',')))].map(x => x.split(',').map(s => parseFloat(s)))
}

export { coordToPix, pixToCoord, getConstraintInfo, getVertices, checkPtFeasible, getPlotStartEnd, getIntersection, getEdgeAndFeasibleIntersections }