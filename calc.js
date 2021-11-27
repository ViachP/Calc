let a = ''; // first number
let b = ''; // second number
let sign = ''; // operation sign
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '^'];

// screen
const out = document.querySelector('.calc_screen p');

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.percent').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  // not button pressed
  if (!event.target.classList.contains('btn')) return;
  // clearAll pressed
  if (event.target.classList.contains('ac')) return;
  if (event.target.classList.contains('percent')) return;
  if (event.target.classList.contains('plus_minus')) {
    out.textContent = '-' + a;
    return;
  }

  // clearing the screen
  out.textContent = '';

  // get the pressed button
  const key = event.target.textContent;

  // if pressed 0-9 or period(.)
  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      out.textContent = a;
      if (a === '.') clearAll();
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    return;
  }

  //if pressed opetation buttons
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(sign);
  }

  // pressed the button =
  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
      case '+':
        if (a === '0') out.textContent = 0;
        a = +a + +b;
        break;
      case '-':
        a = +a - +b;
        break;
      case 'x':
        a = +a * +b;
        break;
      case '/':
        if (b === '0') {
          out.textContent = 'Error';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = +a / +b;
        break;
      case '^':
        a = Math.pow(+a, +b);
        break;
    }
    finish = true;
    out.textContent = Number(a).toFixed(2);
  }
};
