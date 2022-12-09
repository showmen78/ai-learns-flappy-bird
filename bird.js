
//------------------------- SHOWMEN DEY -------------------------------------//


let a = 6
class Bird{
    constructor(pos,wall,obstacles,layer,weight,bias,id){
        this.pos = pos
        this.body = new Shape('transparent');
       
        
        this.id = id
        this.wall = wall
        this.acceleration=a;
        this.velocity =0;
        this.radius = 60;
      //  this.data=[]//data to send as input
        this.forward_sensor_length=2

        this.obstacles=obstacles //list of the obstacles
        this.forward_sensor = new Shape('#ff3604')  //the sensor that takes the distance from the bird to the obstacle
        this.forward_sensor_end_pos= new Vector(this.pos.x+this.forward_sensor_length,this.pos.y)

        this.weight= weight
        this.sensors = []

        this.brain = new Ann(layer,this.get_data(),this.weight,bias)

        for(let i= -90 ; i<=90; i+= 30){
            this.sensors.push(new sensor(1500,i,this.pos,this.obstacles,this.wall,this))
            
        }
        // this.sensors.forEach(s=>{
        //     this.data.push(s.update(this.pos))
        // })
         // this.brain = new Ann(layer,this.weight,bias)
        
  
        this.damaged = false;

      

     

        this.sensors.forEach(s =>{
            s.update(this.pos)
          //  console.log(s.end_pos)
        })
    
        
        this.draw()
       // this.update()
        
    }


    update(){
       
        this.data =[]
       
        this.apply_gravity()
        this.pos.y += this.velocity;
        this.forward_sensor_end_pos= new Vector(this.pos.x+this.forward_sensor_length,this.pos.y)

        if(this.pos.y>= window.innerHeight-this.radius ){

            this.pos.y= window.innerHeight-this.radius
            this.die(1)
        }
        else if ( this.pos.y< this.radius){
            this.pos.y= this.radius
            this.die(2)

        }
        else{
            this.acceleration=a
        }


       // let data=this.get_data()
        this.sensors.forEach(s=>{
            this.data.push(s.update(this.pos))
        })
      //  console.log(this.data)
        this.brain.calculate_output(this.data)==1?this.apply_force(30):this.apply_force(0) 
      //  console.log(data)
        // if(data.length==3){
        //     this.brain.calculate_output(data)==1?this.apply_force(50):this.apply_force(0) 
        //        }
       
        this.draw()

        
       // return data

    }

    apply_gravity(){
        this.velocity+= this.acceleration;


        
    }

    apply_force(amount){
       // this.velocity -= (this.acceleration+amount)
      // console.log('applied')
       this.velocity -= (this.velocity+amount)
       
        
    }

    get_data(){
        //get the data from the sensor
        let top_dist = this.pos.y  //distance from top
        let bottom_dist = window.innerHeight- top_dist //distance from bottom

        let nearest_obs =[1e-5]
        this.obstacles.forEach(o => {
            let data= is_intersecting(this.pos,this.forward_sensor_end_pos,o.pos,o.get_endPoint())

            if(data!== -1 && data[0]<=10){
                this.die(3) //if the bird touches the obstacle then it dies
            }
            
            if(nearest_obs == 1e-5){
                nearest_obs= data!== -1?data:nearest_obs
            }
            else{
                nearest_obs= (nearest_obs[0]>data[0] && data !== -1)?data: nearest_obs //only take the closest obstacle to consideration.
            }
            
         
        });

        if (nearest_obs[0] !== 1e-5){
            this.forward_sensor_end_pos= nearest_obs[1]
        }
        else{
            this.forward_sensor_end_pos= new Vector(this.pos.x+this.forward_sensor_length,this.pos.y)
        }
      
       // console.log(this.forward_sensor_end_pos)
       

        //return the top distance , bottom distance and obstacle distance as sensor data.
       // console.log([top_dist/10000,bottom_dist/10000,nearest_obs[0]/10000])
        return [top_dist,bottom_dist,nearest_obs[0]/window.innerWidth]


    }

    die(i){
        this.damaged= true
        this.velocity=0
        this.acceleration=0


       // console.log(i)
    }


    mutate(layer,best_weight){
      //mutates the weight of the birds after every cycle
    //  console.log('mutated')
       
        for (let i=0; i<layer.length-1; i++){ //layer
            
            for (let input=0; input<layer[i]; input++){ //input
            
                for (let output =0; output<layer[i+1]; output++){   //output
                    this.weight[i][input][output]= lerp(this.weight[i][input][output],best_weight[i][input][output],.1)
                }
            
            }
                       
            }
        if(this.id ==0){
            //first bird will have the best weight unchanged
            this.weight= best_weight
        }
        this.damaged= false
        this.pos.y= window.innerHeight/2
        this.acceleration=a

        this.draw()
        
        
    }

    draw(){
        this.body.drawCircle(this.radius,this.pos.x,this.pos.y,this.wall);
        //this.forward_sensor.drawPolarLine(this.pos.x,this.pos.y,400,0 , this.wall)
        this.forward_sensor.drawLine(this.pos.x,this.pos.y,this.forward_sensor_end_pos.x,this.forward_sensor_end_pos.y,5,wall)
        
    }
}