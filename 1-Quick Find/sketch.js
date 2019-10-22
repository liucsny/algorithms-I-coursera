class Percolation{
  constructor(n,size=5){
    this.n = n;
    this.sites = [];
    this.upperNode = {
      get root(){
        return this
      },
      set root(node){
        delete this.root;
        this.root = node;
      }
    };
    this.size = size;

    this.initSites();
  }

  initSites(){
    this.sites = [];
    for (let i = 0; i < this.n; i++) {
      this.sites.push([])
      for (let j = 0; j < this.n; j++) {
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
    let {treeRoot:node1TreeRoot,count:node1Depth} = this.getChainInfo(node1);
    let {treeRoot:node2TreeRoot,count:node2Depth} = this.getChainInfo(node2);

    if(node1TreeRoot !== node2TreeRoot){
      if(node1Depth<node2Depth){
        node1TreeRoot.root = node2TreeRoot
      }else{
        // console.log(node2TreeRoot)
        node2TreeRoot.root = node1TreeRoot
      }
    }
  }

  getChainInfo(node){
    let originNode = node;
    let count = 0;
    while(node !== node.root){
      node = node.root
      count++;
    }
    originNode.root = node;

    return {
      count,
      treeRoot:node
    }
  }
  // findTreeRoot(node){
  //   let originNode = node;
  //   while(node !== node.root){
  //     node = node.root
  //   }
  //   originNode.root = node;

  //   return node
  // }

  // countDepth(node){
  //   let originNode = node;
  //   let count = 0;
  //   while(node !== node.root){
  //     node = node.root
  //     count++;
  //   }
  //   originNode.root = node;
  //   return count
  // }

  isConnected(node1, node2){
    return this.getChainInfo(node1).treeRoot === this.getChainInfo(node2).treeRoot;
  }

  unionUpSites(){
    for (let i = 0; i < this.n; i++) {
      let node = this.sites[0][i];
      if(node.status!==0){
        let treeRoot = this.getChainInfo(node).treeRoot;
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
        let treeRoot = this.getChainInfo(site).treeRoot
        if(treeRoot === this.upperNode){
          site.status = 2;
        }
      })
    })
  }

  percolates(){
    for (let i = 0; i < this.n; i++) {
      let node = this.sites[this.n-1][i];
      if(this.getChainInfo(node).treeRoot===this.upperNode) return true;
    }
    return false;
  }

  display(){
    push();
    background(255);
    noStroke();
    this.sites.forEach((row, i)=>{
      row.forEach((site, j)=>{
        if(site.status===1){
          // fill('#F2F2F2');//white
          fill('#fff')
        }else if(site.status===2){
          fill('#2895FB');//blue
        }else{
          fill('#000');//black
        }
        rect(this.size*site.x,this.size*site.y+50,this.size,this.size)
      })
    })
    pop();
  }
}

let percolation = new Percolation(300,2);
let button;
let inp;
let text;

function setup() {
  createCanvas(1600,800);
  inp = createInput(0.5);
  inp.position(120, 20);

  button = createButton('click me');
  button.mouseClicked(refresh)
  button.position(20, 20);
  
  text = createP(percolation.percolates());
  text.elt.style.margin = 0;
  text.position(280,20)

  percolation.randomlizeSite(inp.value());
  percolation.unionUpSites();
  percolation.display();
}

function draw() {
}

function refresh(){
  // percolation.randomlizeSite(.59);
  // percolation.unionUpSites();
  // percolation.display();
  percolation.initSites();
  percolation.randomlizeSite(inp.value());
  percolation.unionUpSites();
  percolation.display();
  text.elt.innerText = percolation.percolates();
  console.log('clicked')
}