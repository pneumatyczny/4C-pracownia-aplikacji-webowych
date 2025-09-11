

function kwad(a,b,c){
const delta = (b*b)-(4*a*c);
console.log(delta);
if (delta<0){console.log("Funkcja nie ma miejsc zerowych")}
if (delta==0){console.log("Miejsce zerowe: ${(-b)/(2*a)}.")}
    if (delta > 0) {
        console.log((-b - Math.sqrt(delta)) / (2 * a))
        console.log((-b + Math.sqrt(delta)) / (2 * a))
}

kwad(1, 3, 1)
kwad(8, 2, 6)