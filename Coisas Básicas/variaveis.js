// Funcionamento de variáveis
// Temos let e const como variáveis no Javascript/Node JS, vamos entender sobre elas
// A grande diferença se trata do escopo onde cada uma fica alocada
let x = 10
const y = 10
console.log("Usando let -> ",x,"\nUsando const -> ",y)
function escopo(){
    x = 20
    // y = 20 impossível de se fazer pois é uma constante
}
escopo()
console.log("Usando let -> ",x,"\nUsando const -> ",y)
