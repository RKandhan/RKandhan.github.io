let displayText = document.getElementById('display-text');
let cursor = document.getElementById('cursor');
let currentInput = '0';

function updateDisplay() {
  displayText.textContent = currentInput;
}

function appendToDisplay(value) {
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

function calculate() {
  try {
    let result = eval(currentInput);
    currentInput = String(parseFloat(result.toFixed(10)));
    updateDisplay();
  } catch (e) {
    currentInput = 'Error';
    updateDisplay();
    setTimeout(clearDisplay, 1500);
  }
}

// Show/hide cursor on focus
document.getElementById('display').addEventListener('focus', () => {
  cursor.classList.remove('hidden');
});
document.getElementById('display').addEventListener('blur', () => {
  cursor.classList.add('hidden');
});

// Keyboard support
document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
  else if (e.key === '+') appendToDisplay('+');
  else if (e.key === '-') appendToDisplay('-');
  else if (e.key === '*') appendToDisplay('*');
  else if (e.key === '/') { e.preventDefault(); appendToDisplay('/'); }
  else if (e.key === '%') appendToDisplay('%');
  else if (e.key === '.') appendToDisplay('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearDisplay();
});