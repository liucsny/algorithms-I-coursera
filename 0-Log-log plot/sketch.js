class Plot{
  constructor(x, y, w, fn = x=>1/300*x*x){
    this.x = x;
    this.y = y;
    this.w = w;
    this.fn = fn;
  }

  drawFun(){
    beginShape();
    for (let i = 0; i < this.w; i++) {
      let y = this.w-this.fn(i)

      if(this.fn(i)>this.w) break;
      stroke('#FF0000');
      vertex(i, y);
      // push();
      // noStroke();
      // fill('#FF0000');
      // circle(i, y, 2);
      // pop();
    }
    endShape();
  }

  drawLogLogFun(){
    noFill();
    beginShape();
    for (let i = 0; i < this.w; i++) {
      let ix = Math.pow(10, i)
      let y = this.w-Math.log10(this.fn(ix))

      // if(Math.log10(this.fn(ix))>this.w) break;
      stroke('#3A00FF');
      vertex(i, y);
      if(Math.log10(this.fn(ix))>this.w) break;

    }
    endShape();
  }

  display(){
    push();
    noFill();
    translate(this.x, this.y);
    rect(0, 0, this.w, this.w);
    this.drawFun();
    pop();

    push();
    noFill();
    translate(this.w + 20, this.y);
    rect(0, 0, this.w, this.w);
    this.drawLogLogFun();
    pop();


  }
}

let funcScale = 10;

function linear(x){
  return (x/funcScale)*funcScale
}

function pow2(x){
  return Math.pow(x/funcScale, 2)*funcScale * 1/10
}

function pow3(x){
  return Math.pow(x/funcScale, 3)*funcScale * 1/10
}


function exponential(x){
  return Math.pow(2, x/funcScale)*funcScale * 1/10
}

function nlogN(x){
  return Math.log10(x/funcScale)*(x/funcScale)*funcScale
}

function log10(x){
  return Math.log10(x/funcScale)*funcScale*10
}

function sin(x){
  return Math.sin(x/funcScale)*funcScale*10+100
}



let funcs = [linear, pow2, pow3, exponential, nlogN, log10, sin]
let plots = [];
let gridScale = 300;





function setup() {
  createCanvas(640, 3000);
  smooth();

  textSize(24);
  textStyle(BOLD);
  text('Default Function', 10, 40);
  text('Log-Log Plot', gridScale + 20, 40);

  push();
  translate(0, 50);
  funcs.forEach((func,i)=>{
    textSize(14);
    textStyle(NORMAL);
    text(func.name, 20, i*(gridScale+20)+40);
    plots.push(new Plot(10, i*(gridScale+20)+20, gridScale, func))
  })

  plots.forEach(plot=>{
    plot.display();
  })
  pop();
}




function draw() {

}