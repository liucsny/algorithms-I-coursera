class Percolation{
  constructor(n,size=5){
    this.n = n;
    this.sites = [];
    for (let i = 0; i < n; i++) {
      this.sites.push([])
      for (let j = 0; j < n; j++) {
        this.sites[i][j] = 0;
      }
    }
    //0 block，1 open，2 percolated
    this.size = size;
  }

  randomlizeSite(p=0.5){
    if(p<=1){
      let numOfOpen = floor(p*this.n*this.n);
      let openLeft = numOfOpen;
      // console.log(openLeft)
      while(openLeft>0){
        let randomX = int(random(0,this.n));
        let randomY = int(random(0,this.n));
        if(this.sites[randomX][randomY] === 0){
          this.sites[randomX][randomY] = 1;
          openLeft = openLeft-1;
        }
      }
    }else{
      console.log('p must less than 1')
    }
  }

  display(){
    push();
    noStroke();
    this.sites.forEach((row, i)=>{
      row.forEach((site, j)=>{
        if(site===1){
          fill('#fff');//white
        }else if(site===2){
          fill('#2F80ED');//blue
        }else{
          fill('#000');//black
        }
        rect(this.size*i,this.size*j,this.size,this.size)
      })
    })
    pop();
  }
}

let percolation = new Percolation(40,10);

function setup() {
  createCanvas(800,800);
  console.log(percolation);
  percolation.randomlizeSite();
  
}

function draw() {
  background(255);
  percolation.display();
}