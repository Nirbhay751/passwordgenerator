document.addEventListener('DOMContentLoaded', function () {
  const lengthSlider = document.getElementById('lengthSlider');
  const lengthValue = document.getElementById('lengthValue');
  const uppercaseToggle = document.getElementById('uppercaseToggle');
  const lowercaseToggle = document.getElementById('lowercaseToggle');
  const numbersToggle = document.getElementById('numbersToggle');
  const symbolsToggle = document.getElementById('symbolsToggle');
  const generateBtn = document.getElementById('generateBtn');
  const passwordOutput = document.getElementById('passwordOutput');
  const copyBtn = document.getElementById('copyBtn');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = this.value;
    updateStrengthIndicator();
  });

  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyToClipboard);

  [uppercaseToggle, lowercaseToggle, numbersToggle, symbolsToggle].forEach(toggle => {
    toggle.addEventListener('change', updateStrengthIndicator);
  });

  generatePassword();

  function generatePassword() {
    const length = +lengthSlider.value;
    const useUppercase = uppercaseToggle.checked;
    const useLowercase = lowercaseToggle.checked;
    const useNumbers = numbersToggle.checked;
    const useSymbols = symbolsToggle.checked;

    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
      lowercaseToggle.checked = true;
      alert('At least one character type must be selected');
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?/[]{}|';

    let availableChars = '';
    if (useUppercase) availableChars += uppercaseChars;
    if (useLowercase) availableChars += lowercaseChars;
    if (useNumbers) availableChars += numberChars;
    if (useSymbols) availableChars += symbolChars;

    let password = '';
    if (useUppercase) password += randomChar(uppercaseChars);
    if (useLowercase) password += randomChar(lowercaseChars);
    if (useNumbers) password += randomChar(numberChars);
    if (useSymbols) password += randomChar(symbolChars);

    while (password.length < length) {
      password += randomChar(availableChars);
    }

    password = shuffleString(password);
    passwordOutput.value = password;
    updateStrengthIndicator();
    animateButton();
  }

  function randomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  function shuffleString(str) {
    return [...str].sort(() => Math.random() - 0.5).join('');
  }

  function copyToClipboard() {
    if (!passwordOutput.value) return;
    passwordOutput.select();
    document.execCommand('copy');
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.classList.add('bg-green-500', 'text-white', 'copied');
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      copyBtn.classList.remove('bg-green-500', 'text-white', 'copied');
    }, 1500);
  }

  function updateStrengthIndicator() {
    const length = parseInt(lengthSlider.value);
    const complexity = [uppercaseToggle, lowercaseToggle, numbersToggle, symbolsToggle].filter(t => t.checked).length;

    let strength = 0;
    if (length < 8) strength = 25;
    else if (length < 12) strength = 50;
    else if (length < 16) strength = 75;
    else strength = 100;

    if (complexity === 1) strength = Math.min(strength, 25);
    if (complexity === 2) strength = Math.min(strength, 50);
    if (complexity === 3) strength = Math.min(strength, 75);

    strengthBar.style.width = `${strength}%`;
    if (strength <= 25) {
      strengthBar.className = 'bg-red-500 h-2.5 rounded-full';
      strengthText.textContent = 'Weak';
      strengthText.className = 'text-sm font-medium text-red-500';
    } else if (strength <= 50) {
      strengthBar.className = 'bg-yellow-500 h-2.5 rounded-full';
      strengthText.textContent = 'Medium';
      strengthText.className = 'text-sm font-medium text-yellow-500';
    } else if (strength <= 75) {
      strengthBar.className = 'bg-blue-500 h-2.5 rounded-full';
      strengthText.textContent = 'Strong';
      strengthText.className = 'text-sm font-medium text-blue-500';
    } else {
      strengthBar.className = 'bg-green-500 h-2.5 rounded-full';
      strengthText.textContent = 'Very Strong';
      strengthText.className = 'text-sm font-medium text-green-500';
    }
  }

  function animateButton() {
    generateBtn.classList.add('scale-95');
    setTimeout(() => {
      generateBtn.classList.remove('scale-95');
    }, 100);
  }
});
