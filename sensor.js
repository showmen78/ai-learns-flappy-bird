
//------------------------- SHOWMEN DEY -------------------------------------//


//start pos
//end pos 
//check intersection
//measure the distance

let data;

class sensor{
    constructor(len,angle,pos,obstacles,wall,bird){
        this.len = len
        this.angle = angle
        this.pos = pos
        this.wall = wall
        this.obstacles= obstacles
        this.end_pos =this.end_point()
       // console.log(bird)
        this.min_dist= this.len
        this.bird= bird

        this.touces=[]

        this.line  = new Shape('#00bd03')

        
        this.draw(this.len)

    }

    end_point(){

      return new Vector(this.pos.x+this.len*Math.cos(Vector.to_rad(this.angle)),this.pos.y-this.len*Math.sin(Vector.to_rad(this.angle)))
        
    }

    update(pos){
        let data = this.len
        this.pos = pos
        data=this.check_intersection()

        this.draw(data)
        if(this.angle ==0 && data<10){console.log('sensor died'); this.bird.die(4); }


        return data/100
        

    }

    check_intersection(){
       
        this.touces=[]
        this.obstacles.forEach(o=>{
            data = is_intersecting(this.pos,this.end_point(),o.pos,o.get_endPoint())
            
            if(data !== -1 ){
                this.touces.push(data)
            }

        })

        if(this.touces.length >0){
            return this.check_min_dist()
        }
        else{
            this.end_pos=this.end_point()
            return this.len
        }


       

       
    }

    check_min_dist(){
        this.min_dist= this.len
        this.touces.forEach(t=>{
            if(t[0]<this.min_dist){
                this.min_dist=t[0]
                this.end_pos= t[1]

            }
        })
        return this.min_dist
    }

    draw(len){
        this.line.drawPolarLine(this.pos.x, this.pos.y,len,this.angle,this.wall)
    }
}