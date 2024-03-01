
// para acceder a las funciones del módulo hay que exportarlas. Esto se hace usando la declaración export.
// Se pueden exportar funciones, var, let, const
// Se puede exportar todo de esta manera en vez de declararlo delante de cada cosa q se quiere exportar (👎 export function pintarMelones() { console.log("Melones desde modulo2: 🍉🍉🍉") })
export { mostrarMelones, mostrarMangos as aliasFunctMostrarMangos, Fruta } //Se pueden usar alias para el elemento que se va a exportar con vistas a evitar colisiones de nombres

function mostrarMelones() {
    return "Melones desde modulo2: 🍉🍉🍉";
}
const mostrarMangos = () => {
    return "Mangos desde modulo2: 🥭🥭🥭";
}
class Fruta {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

