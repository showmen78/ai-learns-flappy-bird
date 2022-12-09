
//------------------------- SHOWMEN DEY -------------------------------------//


class Obstacle{

    constructor(pos,wall,id){
        this.pos = pos
        this.wall = wall
        this.length = 400
        this.body = new Shape('#510266')
        this.dir = -1 
        this.velocity = 10
        this.id = id

        this.angle= 90


        if(this.id=='h'){this.dir =1 ; this.angle=0,this.velocity=0}
        this.draw()
    }

    update(){
        this.pos.x -= this.velocity
        this.body.update(this.pos.x,this.pos.y)

        if (this.pos.x <0){
            this.pos.x = window.innerWidth+ (Math.random()*500)
            this.pos.y = Math.round(Math.random())*window.innerHeight
            this.dir = this.pos.y==0? -1 :1
            this.length = 100+ Math.random()* (250)
            
        }
   
        this.draw()
    }

    draw(){
        this.body.drawPolarLine(this.pos.x,this.pos.y,this.length,this.dir*this.angle,wall)
    }


    get_endPoint(){
        if(this.id == 'h'){return new Vector(this.pos.x+this.length,this.pos.y)}
        return new Vector(this.pos.x,this.pos.y-(this.length*this.dir))
    }

}


