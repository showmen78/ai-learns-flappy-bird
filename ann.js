//------------------------- SHOWMEN DEY -------------------------------------//



// let input = new Array(1,1,1)
// let layer = [input.length,6,4]
// let weight= generate_weight(layer)
// let bias = generate_bias(layer)




class Ann{
    constructor(layer,input,weight,bias){

        this.layer=layer
      //  this.input= input
        this.weight= weight
        this.bias = bias
        this.layers=[]
        //this.output =this.input

        //this.calculate_output(this.input)


    }

    calculate_output(input){
        this.output = input;
        for (let l =0 ; l<this.layer.length-1; l++) {  //layer
            this.layers[l] = new Level(this.output,this.layer[l+1],this.weight[l],this.bias[l])
            this.output= this.layers[l].calculate_output()  //calculating the output of the layers
        }

       // console.log(this.output)
        return this.output

        //console.log(this.output)
    }

    
}




class Level{
  // calculate output of each level ....
    constructor(input,output_node,weight,bias){
        this.input= input
        this.output = new Array(output_node)
        this.weight= weight
        this.bias= bias

    
    }

    calculate_output(){

        //calculating the output z = sigmoid(wx+b)
        let output=[]
        for (let i =0; i<this.output.length; i++){
            let sum =0
            for (let j =0 ; j<this.input.length; j++){

                sum += this.input[j]*this.weight[j][i]
                
            }
            if (sigmoid(sum)>.5){output.push(1)}
            else{output.push(0)}
           
        }

        return output
    }



}
//let a = new Ann(layer,input,weight,bias)
//let l  = new Level(input,4)
