class Percolation{
  constructor(n,size=5){
    this.n = n;
    this.sites = [];
    for (let i = 0; i < n; i++) {
      this.sites.push([])
      for (let j = 0; j < n; j++) {
        this.sites[i][j] = {
          status: 0,
          x: j,
          y: i,
          get root(){
            return this
          },
          set root(node){
            delete this.root;
            this.root = node;
          }
        };
      }
    }

    this.upperNode = {
      get root(){
        return this
      },
    };
    //0 block，1 open，2 percolated
    this.size = size;
    // this.openUpNodes = [];
  }

  randomlizeSite(p=0.5){
    if(p<=1){
      let numOfOpen = floor(p*this.n*this.n);
      let openLeft = numOfOpen;
      // console.log(openLeft)
      while(openLeft>0){
        let randomX = int(random(0,this.n));
        let randomY = int(random(0,this.n));
        let selectedNode = this.sites[randomY][randomX];
        if(selectedNode.status === 0){
          selectedNode.status = 1;
          this.quickUnionAllRound(selectedNode)
          openLeft--;
        }
      }
    }else{
      console.log('p must less than 1')
    }
  }

  quickUnion(node1, node2){
    let node1TreeRoot = this.findTreeRoot(node1);
    let node2TreeRoot = this.findTreeRoot(node2);

    if(node1TreeRoot !== node2TreeRoot){
      node1TreeRoot.root = node2TreeRoot
    }
  }

  findTreeRoot(node){
    while(node !== node.root){
      node = node.root
    }
    return node
  }

  countDepth(node){
    let count = 0;
    while(node !== node.root){
      node = node.root
      count++;
    }
    return count
  }

  isConnected(node1, node2){
    return this.findTreeRoot(node1) === this.findTreeRoot(node2);
  }

  unionUpSites(){
    for (let i = 0; i < this.n; i++) {
      let node = this.sites[0][i];
      if(node.status!==0){
        let treeRoot = this.findTreeRoot(node);
        if(treeRoot!==this.upperNode){
          treeRoot.root = this.upperNode
        }
      }
      // console.log(node)
    }
    percolation.fillUpSites();
  }

  quickUnionAllRound(node){ //union open site all around
    if(node.x>0){
      let leftNode = this.sites[node.y][node.x-1];
      if(leftNode.status !== 0){
        this.quickUnion(node,leftNode)
      }
    }
    if(node.x<this.n-1){
      let rightNode = this.sites[node.y][node.x+1];
      if(rightNode.status !== 0){
        this.quickUnion(node,rightNode)
      }
    }
    if(node.y>0){
      let downNode = this.sites[node.y-1][node.x];
      if(downNode.status !== 0){
        this.quickUnion(node,downNode)
      }
    }
    if(node.y<this.n-1){
      let upNode = this.sites[node.y+1][node.x];
      if(upNode.status !== 0){
        this.quickUnion(node,upNode)
      }
    }
  }

  fillUpSites(){
    this.sites.forEach((row, i)=>{
      row.forEach((site, j)=>{
        let treeRoot = this.findTreeRoot(site)
        if(treeRoot === this.upperNode){
          site.status = 2;
        }
      })
    })
  }

  percolates(){
    for (let i = 0; i < this.n; i++) {
      let node = this.sites[this.n-1][i];
      if(this.findTreeRoot(node)===this.upperNode) return true;
    }
    return false;
  }

  display(){
    push();
    noStroke();
    this.sites.forEach((row, i)=>{
      row.forEach((site, j)=>{
        if(site.status===1){
          fill('#F2F2F2');//white
        }else if(site.status===2){
          fill('#2895FB');//blue
        }else{
          fill('#000');//black
        }
        rect(this.size*site.x,this.size*site.y,this.size,this.size)
      })
    })
    pop();
  }
}

let percolation = new Percolation(80,6);

function setup() {
  createCanvas(800,800);
  console.log(percolation);
  percolation.randomlizeSite(.6);
  // percolation.unionUpSites();
}

function draw() {
  background(255);

  percolation.display();
}
