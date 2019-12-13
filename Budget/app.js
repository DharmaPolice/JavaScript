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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
   
    return {
        getinput: function() {
            return{
                    type: document.querySelector(DOMstrings.inputType).value, // Será 'inc' o 'exp'
                    description: document.querySelector(DOMstrings.inputDescription).value,
                    value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
       
        addListItem: function(obj,type){
           
            var html, newHtml, element;
           
            //Creamos el HTML para meter en la UI
           
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
           
            //Reemplazamos con los datos actuales
           
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
           
            //Insertamos en el DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        
        clearFields: function(){
            var fields,fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); 
            
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current,index,array){
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
       
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
   
})();
 
 
// MÓDULO DE DATOS
 
var budgetController = (function(){
   
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
   
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
           sum = sum + cur.value;
        });
        
        data.totals[type] = sum;
    };
   
    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget: 0,
        percentage: -1
    };
   
    
    return {
        addItem: function(type,des,val) {
           
            var newItem, ID;
           
            
            //Creamos nuevo ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
           
            //Creamos el nuevo item
            if (type === 'exp'){
                   newItem = new Expense(ID,des,val);
            } else if (type === 'inc'){
                  newItem = new Income(ID,des,val);
            }
           
            //Pusheamos en la estructura de datos
            data.allItems[type].push(newItem);
            //Retornamos el nuevo item            
            return newItem;
        },
        
        calculateBudget: function(){
            
            // calculamos totales inc y exp
                
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculamos budget = inc-exp
            
            data.budget = data.totals.inc - data.totals.exp;
            
            if (data.totals.inc > 0){
            // calculamos % de inc gastado
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        
        getBudget: function(){
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          };  
        },
        
        testing: function(){
            console.log(data);
        }
       
    };
 
})();
 
// MÓDULO DE COMUNICACIONES Y CONTROL
 
var controller = (function(budgetCtrl, UICtrl){  //Pasamos los 2 otros módulos a controlar
   
    var setupEventListeners = function (){
        var DOM = UICtrl.getDOMstrings();
       
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
       
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13|| event.which === 13){
                ctrlAddItem();
            }
        
        });
    };
   
    var updateBudget = function(){
        
        // Calcular el budget
        budgetCtrl.calculateBudget();
        
        // Retornar el budget
        var budget = budgetCtrl.getBudget();
        
        // Mostrar el budget en la UI
        console.log(budget);
    };
    
    var ctrlAddItem = function (){
       
        var input, newItem;
       
        // Coger el valor de entrada
        input = UICtrl.getinput();
        
        if (input.description !=="" && !isNaN(input.value) && input.value > 0 ){
 
            // Agregar el valor al budget
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // Agregarlo a la vista de usuario
            UICtrl.addListItem(newItem,input.type);

            // Limpiamos los campos
            UICtrl.clearFields();

            // Calculamos y updateamos budget
            updateBudget();
        
        }

    };
   
    return{
        init: function(){
            console.log('START');
            setupEventListeners();
        }
    };
   
})(budgetController,UIController); //Pasamos los 2 otros módulos a controlar
 
 
controller.init();