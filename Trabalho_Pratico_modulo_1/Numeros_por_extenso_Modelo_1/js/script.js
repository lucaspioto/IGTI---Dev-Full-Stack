function myScope() {

  window.addEventListener('load', start);

  function start() {
    //selectors
    let slider = document.querySelector('#slider');
    let num = document.querySelector('#num');
    let extensive = document.querySelector('#extensive');

    // capture slider
    slider.addEventListener('input', captureValue);

    function captureValue(e) {
      currentValue = e.target.value;
      num.value = currentValue;
      convertNumToExtensive(currentValue);
    }

    function convertNumToExtensive(number) {
      const un = [
        'zero',
        'um',
        'dois',
        'tres',
        'quatro',
        'cinco',
        'seis',
        'sete',
        'oito',
        'nove',
      ];
      const specialDez = [
        'dez',
        'onze',
        'doze',
        'treze',
        'quatorze',
        'quinze',
        'dezesseis',
        'dezessete',
        'dezoito',
        'dezenove',
      ];
      const dez = [
        'dez',
        'vinte',
        'trinta',
        'quarenta',
        'cinquenta',
        'sessenta',
        'setenta',
        'oitenta',
        'noventa',
      ];
      const cent = [
        'cem',
        'duzentos',
        'trezentos',
        'quatrocentos',
        'quinhentos',
        'seiscentos',
        'setecentos',
        'oitocentos',
        'novecentos',
      ];

      if (number < 10) {
        let splittedNum = String(number).split('');
        let firstDigit = splittedNum[0];
        extensive.value = un[number];
      }

      if (number >= 10 && number < 20) {
        let splittedNum = String(number).split('');
        let firstDigit = splittedNum[0];
        let secondDigit = splittedNum[1];
        extensive.value = specialDez[secondDigit];
      }

      if(number >= 20 && number < 100) {
        let splittedNum = String(number).split('')
        let firstDigit = splittedNum[0]
        let secondDigit = splittedNum[1]
        if(secondDigit === '0') {
          extensive.value = dez[firstDigit-1]
        } else {
          extensive.value = dez[firstDigit-1] + ' e ' + un[secondDigit]
        }
      }

      if(number >= 100 && number < 1000) {
        let splittedNum = String(number).split('')
        let firstDigit = Number(splittedNum[0])
        let secondDigit = Number(splittedNum[1])
        let thirdDigit = Number(splittedNum[2])
        if(firstDigit >= 1 && secondDigit === 0 && thirdDigit === 0) {
          extensive.value = cent[firstDigit-1]
        }
        if(firstDigit === 1 && secondDigit === 0 && thirdDigit > 0 && thirdDigit <= 9) {
          extensive.value = 'cento e ' + un[thirdDigit] 
        }
        if(firstDigit === 1 && secondDigit === 1 && thirdDigit <= 9) {
          extensive.value = 'cento e ' + specialDez[thirdDigit]
        } 
        if(firstDigit === 1 && secondDigit > 1) {
          extensive.value = 'cento e ' + dez[secondDigit-1] + ' e ' + un[thirdDigit]
        }
        if(firstDigit > 1 && secondDigit === 0 && thirdDigit > 0 && thirdDigit <= 9) {
          extensive.value = cent[firstDigit-1] + ' e ' + un[thirdDigit] 
        }
        if(firstDigit > 1 && secondDigit === 1) {
          extensive.value = cent[firstDigit-1] + ' e ' + specialDez[thirdDigit] 
        }
        if(firstDigit > 1 && secondDigit > 1) {
          extensive.value = cent[firstDigit-1] + ' e ' + dez[secondDigit-1] + ' e ' + un[thirdDigit]
        }
      }
      



    }


  }
}

myScope();
