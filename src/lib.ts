export function asciiToAlpha(n: number) {
    const a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0),
        A = 'A'.charCodeAt(0), Z = 'Z'.charCodeAt(0)

    if (n >= a && n <= z) {
        return n - a + 26
    }
    else if (n >= A && n <= Z) {
        return n - A
    }
    return -1
}

export function asciiFromAlpha(n: number) {
    const a = 'a'.charCodeAt(0),
        A = 'A'.charCodeAt(0)
    
    return n < 0 ? n :
        n < 26 ? A + n :
        a + n - 26
}

export function additiveCipher(alpha: number, key: number) {
    if (alpha < 0)
        return alpha

    if (alpha < 26) {
        const v = (alpha + key) % 26
        return v < 0 ? 26 + v : v
    }

    const v = ((alpha + (key - 26)) % 26) + 26
    return v < 26 ? 26 + v : v
}

export function multiplicativeCipher(alpha: number, key: number) {
    if (alpha < 0)
        return alpha

    if (alpha < 26) {
        const v = (alpha * key) % 26
        return v < 0 ? 26 + v : v
    }

    const v = ((alpha * (key - 26)) % 26) + 26
    return v < 26 ? 26 + v : v
}

export interface EuclideanStep {
    q: number,
    a: number,
    b: number,
    r: number,
    
    s1: number,
    s2: number,
    s3: number,
    t1: number,
    t2: number,
    t3: number
}

export function euclideanGcd(a: number, b: number) {
    let min = Math.min(a, b)
    a = Math.max(a, b)
    b = min

    const steps: EuclideanStep[] = []

    let q = 0, // doesnt matter
        r = 0, // doesnt matter
        s1 = 0,
        s2 = 1,
        s3 = 0, // doesnt matter
        t1 = 0,
        t2 = 0,
        t3 = 1 // doesnt matter

    do {
        r = a == 0 || b == 0 ? 0 : a % b
        q = b == 0 ? 0 : (a - r) / b

        s1 = s2
        s2 = s3
        s3 = s1 - q * s2

        t1 = t2
        t2 = t3
        t3 = t1 - q * t2

        steps.push({
            q, a, b, r,

            s1, s2, s3,
            t1, t2, t3
        })

        a = b
        b = r
    }
    while (r != 0)
    

    return steps
}

export interface CharMap {
    [c: string]: Array<number>
}

// assume all samecase (i.e lowercase)
export function playFairCipher(pair: string, matrix: Array<Array<string>>, charmap: CharMap, reverse: boolean = false
    // , dup1: string = "xx", dup2: string = "yy"
): string {
    if (pair[0] == pair[1]) {
        return pair
    }

    // resolve dup pairs
    // if (pair[0] == pair[1]) {
    //     if (pair[0] != dup1[0]) {
    //         const txt = playFairCipher(pair[0] + dup1[0], matrix, charmap, reverse, dup1, dup2)
    //         return txt + txt
    //     }
    //     else {
    //         const txt = playFairCipher(pair[0] + dup2[1], matrix, charmap, reverse, dup1, dup2)
    //         return txt + txt
    //     }
    // }

    let [ r1, c1 ] = charmap[pair[0]]
    let [ r2, c2 ] = charmap[pair[1]]

    let t1, t2
    if (r1 == r2) {
        // let dir = (reverse ? c1 > c2 : c1 < c2) ? 1 : -1
        let dir = reverse ? 1 : -1

        c1 = (c1 + dir + 5) % 5
        c2 = (c2 + dir + 5) % 5
        
        t1 = matrix[r1][c1]
        t2 = matrix[r2][c2]
    }
    else if (c1 == c2) {
        // let dir = (reverse ? r1 > r2 : r1 < r2) ? 1 : -1
        let dir = reverse ? 1 : -1

        r1 = (r1 + dir + 5) % 5
        r2 = (r2 + dir + 5) % 5

        t1 = matrix[r1][c1]
        t2 = matrix[r2][c2]
    }
    else {
        t1 = matrix[r1][c2]
        t2 = matrix[r2][c1]
    }

    // always picking first character
    if (t1.includes("/"))
        t1 = t1.substring(0, t1.indexOf("/") - 1)

    if (t2.includes("/"))
        t2 = t2.substring(0, t2.indexOf("/") - 1)

    return t1 + t2
}

export function transpose(mat: any[][]) {
    // metrix of j x i
    let ret = [...Array(mat[0].length)].map(_v => [...Array(mat.length)])
    
    mat.forEach((row, i) => {
        row.forEach((col, j) => {
            ret[j][i] = col
        })
    })

    return ret
}

export function shape(str: string, i: number, j: number) {
    return [...Array(i).keys()].map((_, y) => 
        str.substring(y * j, (y + 1) * j).split("")
    )
}

export function transpositionCipher(plaintext: string, key: string, type: 'column' | 'row', rev: boolean = false, flip: boolean = false) {
    // allow directly typing in the order

    // remove duplicates
    let k: string[]
    let kOrder: number[]

    let straight: number

    k = [...new Set(key)].join("").replace(/[\. ]/ig, "").split("")
    straight = k.length

    let kSorted = [...k].sort()
    
    if (rev)
        kSorted = kSorted.reverse()

    kOrder = k.map(c => kSorted.indexOf(c))

    const p = plaintext.replace(/[\. ]/ig, "")

    const cross = Math.ceil(p.length / straight)

    let chunks: string[][]
    if (type == 'column') {
        if (flip) {
            chunks = shape(p, straight, cross)
        }
        else {
            chunks = shape(p, cross, straight)
            chunks = transpose(chunks)
        }
    }
    else {
        if (flip) {
            chunks = shape(p, cross, straight)
            chunks = transpose(chunks)
        }
        else {
            chunks = shape(p, straight, cross)
        }
    }
    
    let c = [...Array(straight).keys()].map(i => chunks[kOrder.indexOf(i)].join("")).join(" ")
    
    if (type == 'column') {
        chunks = transpose(chunks)
    }

    return {
        k, kOrder, chunks, c
    }
}

export function _transpositionKeyFromOrder(arr: number[]) {
    let obj = arr.map((v, i) => ({[v]: i})).reduce((acc, x) => ({...acc, ...x}), {})
    return Object.keys(obj).map(v => String.fromCharCode('A'.charCodeAt(0) + obj[Number(v)])).join("")
}