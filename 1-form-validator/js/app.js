import formValidation from './FormValidation.js';

formValidation.submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formValidation.formSubmit();
});