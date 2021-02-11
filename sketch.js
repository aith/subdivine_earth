// To do:
// - is there a better way to generalize which tiles to switch, that stays independent of the axis-chosen-to-subdivide algorithm

class Square {
    constructor(A, B, C, D) {
        function check(a) { return Array.isArray(a) && a.length == 2; }
        console.assert(check(A) && check(B) && check(C) && check(D));
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
    }
    AB() { 
        return dist(this.A[0], this.A[1], this.B[0], this.B[1])
    }
    BC() { 
        return dist(this.B[0], this.B[1], this.C[0], this.C[1])
    }
    
}

let clampx = 0.1, clampy = 0.99; // the clamp for subdivision interpolation
let squares = [];
let can;
let canw = 1200;
let canh = 720;
let base;
function setup() {
    can = createCanvas(canw, canh);
    base = new Square(
        [0, 0],
        [canw, 0],
        [canw, canh],
        [0, canh]
    );
    squares.push(base);
    frameRate(1)
}

let k = 1;
function draw() {
    background("white")
    k++
    let d = sqrt(k)
    drawSquare(base, color(255, 0, 0))

    let n = squares.length;
    for(let c = 0, i = 0; c < n; c++) {
        // print(squares[i].AB() * squares[i].BC())
        let col = color(
            map(squares[i].A[1], 0, 600, 255, 0),
            map(squares[i].AB(), 0, canh, 255, 0),
            map(squares[i].A[0], 0, 600, 255, 80)
        );
        drawSquare(squares[i], col, i);
        subdivide(squares[i], squares, i);
        i+=2;
    }
    if (k > 10) noLoop();
}

function subdivide(s, s_arr, s_index) {
    // choosing alg here
    let s1, s2;
    let dx, dy; // the midpoint in which we'll subdivide from
    let a, b, x, y; // the indices to be replaced with the new ones, pairwise
    if (s.AB() > s.BC()) {
    // if (1 == 1) {
        a = 1, b = 2
        x = 0, y = 3;
        
        dx = lerp(0, s.B[0] - s.A[0], random(clampx,clampy))
        dy = 0
        s1 = new Square(
            [s.A[0], s.A[1]],
            [s.A[0]+dx, s.A[1]],
            [s.A[0]+dx, s.C[1]],
            [s.A[0], s.C[1]]
        );
        s2 = new Square(
            [s.A[0]+dx, s.A[1]],
            [s.C[0], s.A[1]],
            [s.C[0], s.C[1]],
            [s.A[0]+dx, s.C[1]]
        );
    }
    else {
        dx = 0
        dy = lerp(0, s.B[0] - s.A[0], random(clampx,clampy))
        s1 = new Square(
            [s.A[0], s.A[1]],
            [s.C[0], s.A[1]],
            [s.C[0], s.A[1]+dy],
            [s.A[0], s.A[1]+dy]
        );
        s2 = new Square(
            [s.A[0], s.A[1]+dy],
            [s.C[0], s.A[1]+dy],
            [s.C[0], s.C[1]],
            [s.A[0], s.C[1]]

        );
    }
    squares.splice(s_index, 1, s1, s2)
}

function drawSquare(s, color) {
    beginShape();
    fill(color)
    // stroke("white")
    // strokeWeight(0.5)
    noStroke()
    vertex(s.A[0],s.A[1])
    vertex(s.B[0],s.B[1])
    vertex(s.C[0],s.C[1])
    vertex(s.D[0],s.D[1])
    endShape(CLOSE);
}

