
//------------------------- SHOWMEN DEY -------------------------------------//


let wall = document.getElementById('left-wall')
let h1= document.getElementById('gen');
let gen =1;
h1.innerHTML="Generation: "+ String(gen);


wall.style.height= window.innerHeight;

let pos = new Vector(200,200); //bird initial position

let obstacle1 = new Obstacle(new Vector(500,0),wall,'v')
let obstacle2= new Obstacle(new Vector(900,0),wall,'v')
let obstacle3= new Obstacle(new Vector(1500,0),wall,'v')
let obstacle4= new Obstacle(new Vector(0,0),wall,'h')
let obstacle5= new Obstacle(new Vector(0,window.innerHeight-20),wall,'h')

let obstacles= [obstacle1,obstacle2,obstacle3,obstacle4,obstacle5]

let layer = [7,10,6,1]
let weight= generate_weight(layer)
let bias = generate_bias(layer)

let n = 30
let birds =new Array(n)
let last_bird= []
// let bird=new Bird(new Vector(200,100+Math.random()*400),wall,[obstacle1,obstacle2],
//     layer,generate_weight(layer),generate_bias(layer));

function spawn_bird(){
    for (let i =0 ; i<birds.length; i++){
        birds[i]=new Bird(new Vector(200,window.innerHeight/2),wall,obstacles,
        layer,generate_weight(layer),generate_bias(layer),i);
    }


    
}



function save(w){
   // window.localstorage.setItem('w',JSON.stringify(w))
    window.localStorage.setItem('a',JSON.stringify(w)) 
}


function update(){
// bird.update()

for(let i =0 ; i<birds.length; i++){
    if(!birds[i].damaged){
        birds[i].update()
    }
    else{
        if (!last_bird.includes(birds[i])){
            last_bird.push(birds[i])
            birds[i].sensors.forEach(s=>{
                s.draw(0)
            })
        
       
        if(last_bird.length== birds.length){
            let best_weight= last_bird[last_bird.length-1].weight
            save(best_weight)
            for (let i =0 ; i<birds.length; i++){
                birds[i].mutate(layer,best_weight)
            }
            h1.innerHTML="Generation: "+ String(gen);
           gen++;

            last_bird=[]
            
        }
    }
  
    }
 
  }

  for(let i =0 ; i<obstacles.length; i++){
    obstacles[i].update()
  }
}


//spawn birds for the first time.
spawn_bird()
birds[0].update()

// setInterval(() => {
//     update()
// }, 50);







