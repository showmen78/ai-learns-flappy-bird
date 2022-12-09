
//------------------------- SHOWMEN DEY -------------------------------------//



function sigmoid(z){
    return 1/(1+Math.exp(-z))
}

function generate_weight(layer){
    let weight=[]
    for (let i=0; i<layer.length-1; i++){ //layer
        weight[i]= new Array(layer[i])
        for (let input=0; input<layer[i]; input++){ //input
         weight[i][input]= new Array(layer[i+1])
     
         for (let output =0; output<layer[i+1]; output++){   //output
             weight[i][input][output]= Math.random()*2 -1
         }
     
        }
     
       
        
     
     }
     return weight
}

function generate_bias(layer){
    let b =[]
    for (let i =0; i<layer.length-1; i++){ //for layer
        b[i]= new Array(layer[i+1])
        for (let j =0 ; j<b[i].length; j++){ //output 
            b[i][j]= (Math.random()*2 -1)*.1
        }
    }

    return b
}

 function is_intersecting(a,b,c,d){
    //a,b - start and end pos of the first vector
    //c,d - start and end pos of the second vector.
    //checks for intersection with obstacles.
    // let a= this.start
    // let b= this.endPoint(this.len)

    let den = ((a.x-b.x)*(c.y-d.y))-((a.y-b.y)*(c.x-d.x))
  

    let t = ((a.x-c.x)*(c.y-d.y))-((a.y-c.y)*(c.x-d.x))
    let u = ((a.x-c.x)*(a.y-b.y))-((a.y-c.y)*(a.x-b.x))
    t /= den
    u /= den

    if(u>0 && u<=1 && t>0 && t<=1){
        let p_x = a.x+t*(b.x-a.x)
        let p_y= a.y+ t*(b.y-a.y)

       // console.log(p_x,p_y)

        return [Vector._distance(a,new Vector(p_x,p_y)),new Vector(p_x,p_y)]
    }
    return -1

  
}

function lerp(a,b,t){
    return a+(b-a)*t
}





//take keyboard input
document.addEventListener('keydown',event=>{
   
    if(event.repeat) return;
    switch(event.key){
        case "ArrowUp":
           bird.apply_force(10)
          
        break;

    }
    
})




