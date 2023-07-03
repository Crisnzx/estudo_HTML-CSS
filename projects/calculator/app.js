Calculator = {

   calculate: (num1, num2, operation) => {

      let result;
      switch (operation) {
         case '+':
            result = Calculator.sum(num1,num2);
            break;
         case '-':
            result = Calculator.sub(num1, num2);
            break;

         case 'x':
            result = Calculator.multi(num1, num2);
            break;

         case '/':
            result = Calculator.div(num1, num2);
            break;
      }
      
      return result;

   },

   sum: (num1, num2) => {
      return num1+num2;
   },

   sub: (num1, num2) => {
      return num1-num2;
   },

   multi: (num1, num2) => {
      return num1*num2;
   },

   div: (num1, num2) => {
      return (num1 / num2);
   }
}

let operation = '+';

document.querySelector('#operation').addEventListener('change', changeOperation);
document.querySelector('form').addEventListener('submit', runApp);



function changeOperation(e) {
   operation = e.target.value;
}

function runApp(e) {
   e.preventDefault();
   let result;
   let num1 = Number(document.querySelector('#num1').value);
   let num2 = Number(document.querySelector('#num2').value);

   result = Calculator.calculate(num1, num2, operation);


   document.querySelector('#result').textContent = result;
   
   document.querySelector('#num1').value = '';
   document.querySelector('#num2').value = '';
}


