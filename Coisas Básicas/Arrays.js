
let vet =[1,2,3,4,5,6,7,8,9,10]
console.log(vet)
vet = ["a",1,"b",2,10.28]
console.log(vet)

vet.forEach(numero => {
    console.log(numero)
});
console.log('\n\n')
for (const i of vet) {
    console.log(i)
}
console.log('\n\n')
for (let index = 0; index < vet.length; index++) {
    console.log(vet[index])
}