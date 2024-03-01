(function () {
    //No hay colisión entre esta variable y la del controller con el mismo nombre 
    const varDeFuncionAutoejecutable = "Variable de Funcion Autoejecutable en el modulo1.";
    console.log(varDeFuncionAutoejecutable);
})();
// para acceder a las funciones del módulo hay que exportarlas. Esto se hace usando la declaración export.
// Se pueden exportar funciones, var, let, const
export const frutas = ["🍇", "🍉", "🍍", "🥭", "🍎"];