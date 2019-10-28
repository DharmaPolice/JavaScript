/* To do List:
 
1. Necesitamos un event handler para el botón de añadir.
2. Tenemos que meter valores de entrada.
3. Meter los datos en la estructura de datos.
4. Mostrar los datos por pantalla UI.
5. Calcular el presupuesto
6. Actualizar toda la UI
 Pensamos nuestro proyecto en módulos:
 Módulo interface usuario: 2, 4, 6
Módulo de datos: 3, 5
Módulo de control y comunicación: 1
*/
 
// Patrón de módulos donde tendremos variables privadas para cada módulo --> Encapsulación --> No exponemos todas las variables al público. // Se implementa con closures e IIFEs //
 
// MÓDULO INTERACE DE USUARIO
 
var UIController = (function(){ //Implementamos el módulo con una función invocada al instante (IIFE) que retornará un objeto público.
   
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
   
    return {
        getinput: function() {
            return{
                    type: document.querySelector(DOMstrings.inputType).value, // Será 'inc' o 'exp'
                    description: document.querySelector(DOMstrings.inputDescription).value,
                    value: document.querySelector(DOMstrings.inputValue).value
            };
        },
       
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
   
})();
 
 
// MÓDULO DE DATOS
 
var budgetController = (function(){
 
})();
 
 
 
 
 
// MÓDULO DE COMUNICACIONES Y CONTROL
 
var controller = (function(budgetCtrl, UICtrl){  //Pasamos los 2 otros módulos a controlar
   
    var DOM = UICtrl.getDOMstrings();
   
    var ctrlAddItem = function (){
       
        // Coger el valor de entrada
        var input = UICtrl.getinput();
        console.log(input);
       
        // Agregar el valor al budget
       
        // Agregarlo a la vista de usuario
       
        // Calcular el budget
       
        // Mostrar el budget
    }
   
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
   
    document.addEventListener('keypress', function(event){
       
        if (event.keyCode === 13|| event.which === 13){
            ctrlAddItem();
        }
       
    });
 
})(budgetController,UIController); //Pasamos los 2 otros módulos a controlar