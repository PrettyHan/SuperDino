let canvas = document.getElementById('canvas');
let ctx  = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dinoImg = new Image();
let catusImg = new Image();
dinoImg.src = 'dino1.png';
catusImg.src = 'catus.jpg';

let dino = {
    x : 50 ,
    y : 200,
    width : 50,
    height: 50,
    draw() {
        ctx.fillStyle = "gray";
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(dinoImg, this.x, this.y)
    }
};


class Cactus {
    constructor() {
        this.x = 600;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(catusImg, this.x, this.y)
    }
};

let timer = 0
let enemys = [];
let jumpingStop = 0
let animation;
function FPSmove () {
    animation = requestAnimationFrame(FPSmove)
    timer++;    
    ctx.clearRect(0,0, canvas.width, canvas.height)

    if (timer % 180 == 0) {
        let Stopthere = new Cactus();
        enemys.push(Stopthere);
    }

    enemys.forEach((v, i, o) => {
        if (v.x < 0) {
            o.splice(i,1)
        }
        v.x -= 2;
        Damaged(dino, v);

        v.draw();
        
        if (jumping == true) {
            dino.y -= 3;
            jumpingStop++;
        }
        if (jumping == false ) {
            if (dino.y < 200) {
                dino.y += 3;
            }
        }
        if(jumpingStop > 50) {
            jumping = false;
            jumpingStop = 0;
        }
    })
    dino.draw()
};

function Damaged(dino, Stopthere) {
    let xm = Stopthere.x - (dino.x + dino.width)
    let ym = Stopthere.y - (dino.y + dino.height)
    if (xm <0 && ym <0) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}




FPSmove();

let jumping = false

document.addEventListener('keydown', (e) => {
    if(e.code == 'Space') {
        jumping = true;
    }
})