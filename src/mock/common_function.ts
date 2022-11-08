export const intersects = (a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number) => {
    const det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

export const rectanglesIntersect = ( 
    minAx: number, minAy: number, maxAx: number, maxAy: number,
    minBx: number, minBy: number, maxBx: number, maxBy: number ) => {
    const aLeftOfB = maxAx < minBx;
    const aRightOfB = minAx > maxBx;
    const aAboveB = minAy > maxBy;
    const aBelowB = maxAy < minBy;

    return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
}