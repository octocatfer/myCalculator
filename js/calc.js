window.onload = function() {
  var total = document.getElementById('box-total');
  var process = false;
  
  clicked('btn1');
  clicked('btn2');
  clicked('btn3');
  clicked('btn4');
  clicked('btn5');
  clicked('btn6');
  clicked('btn7');
  clicked('btn8');
  clicked('btn9');
  clicked('btn0');
  clicked('punto');
  clicked('suma');
  clicked('resta');
  clicked('multi');
  clicked('divi');

  function clicked(name) {
    var name = document.getElementById(name);
    name.addEventListener('click', function() {
      getSymbol(name);
    });
  }

  var igual = document.getElementById('igual');
  igual.addEventListener('click', function() {
    var symbol = /[×÷+-]$/.test(total.innerHTML);
    
    if (!symbol) {
      var cadena = total.innerHTML;

      if (cadena != '') {
        var result = cadena.replace(/×/g, '*');
        var result = result.replace(/÷/g, '/');
        total.innerHTML = eval(result);
     
        if (total.innerHTML == 'Infinity') {
          total.innerHTML = 'Error';
          process = true;
        }
      }
    } else {
      total.innerHTML = 'Error';
      process = true;
    }
  });

  var borrar = document.getElementById('borrar');
  borrar.addEventListener('click', function() {
    total.innerHTML = '';
    process = false;
  });


  function getSymbol(name) {
    switch (name.innerHTML) {
      case '÷':
      case '×':
      case '+':
        if (process) {
          if (total.innerHTML.length > 0) {
            total.innerHTML = '';
          }
          process = false;
        }
        var buscar = /[×÷+-]$/.test(total.innerHTML);
        if (!buscar) {
          if (total.innerHTML.length > 0) {
            total.innerHTML += name.innerHTML;
          }
        } else {
          var checkSymbol = total.innerHTML.substr(-1);
          if (checkSymbol != '-') {
            total.innerHTML = total.innerHTML.slice(0, -1) + name.innerHTML;
          }
        }
        break;
      case '-':
        if (process) {
          if (total.innerHTML.length > 0) {
            total.innerHTML = '';
          }
          process = false;
        }
        var buscar = /[-]$/.test(total.innerHTML);
        if (!buscar) {
          total.innerHTML += name.innerHTML;
        }
        break;
      case '.':
        if (process) {
          total.innerHTML = '';
          process = false;
        }
        var buscar = /[.]$/.test(total.innerHTML);
        var numero = /[.]+[\d]+$/.test(total.innerHTML);
        if (!buscar) {
          if (!numero) {
            total.innerHTML += name.innerHTML;
          }
        }
        break;
      default:
        if (process) {
          total.innerHTML = '';
          process = false;
        }
        total.innerHTML += name.innerHTML;
        break;
    }
  }
}