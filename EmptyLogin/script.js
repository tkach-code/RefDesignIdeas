const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');
const home = document.querySelector('.home');
const measureContext = document.createElement('canvas').getContext('2d');

function updateControlFontSize(control, displayValue, shrinkByCharacterCount = false) {
  if (!displayValue) {
    control.style.removeProperty('--fit-font-size');
    return;
  }

  const computedStyle = window.getComputedStyle(control);
  const characterCount = [...displayValue].length;
  const availableWidth = control.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
  measureContext.font = `${computedStyle.fontStyle} ${computedStyle.fontWeight} 1px ${computedStyle.fontFamily}`;

  const textWidthAtOnePixel = measureContext.measureText(displayValue).width;
  const characterScale = shrinkByCharacterCount ? Math.sqrt(characterCount) : 1;
  const heightLimit = control.clientHeight * 0.85 / characterScale;
  const widthLimit = availableWidth / textWidthAtOnePixel;
  const fontSize = Math.max(1, Math.min(heightLimit, widthLimit));

  control.style.setProperty('--fit-font-size', `${fontSize}px`);
}

function updateInputFontSize(input) {
  const displayValue = input.type === 'password' ? '•'.repeat(input.value.length) : input.value;
  updateControlFontSize(input, displayValue, true);
}

if (usernameInput && passwordInput && loginButton) {
  const textInputs = [usernameInput, passwordInput];

  function updateInputFontSizes() {
    textInputs.forEach(updateInputFontSize);
    updateControlFontSize(loginButton, loginButton.textContent);
  }

  function updateLoginButton() {
    const hasCredentials = usernameInput.value && passwordInput.value;
    loginButton.textContent = hasCredentials ? 'Login' : '';
    updateControlFontSize(loginButton, loginButton.textContent);
  }

  textInputs.forEach((input) => {
    input.addEventListener('input', () => {
      updateInputFontSize(input);
      updateLoginButton();
    });
  });

  window.addEventListener('resize', updateInputFontSizes);
  updateInputFontSizes();
  updateLoginButton();
}

if (home) {
  const fitHome = () => updateControlFontSize(home, home.textContent.trim());
  window.addEventListener('resize', fitHome);
  fitHome();
}