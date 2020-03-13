class FormValidation {
  constructor() {
    this.formControl = document.querySelectorAll('[data-required]');
    this.formControlLength = document.querySelectorAll('[data-length]');
    this.formControlEmail = document.querySelector('input[type="email"]');
    this.formControlPassword = document.querySelector('#password');
    this.formControlPasswordRe = document.querySelector('#passwordRe');
    this.submitBtn = document.querySelector('button[type="submit"]');
  }

  state = {
    isValid: 'is-valid',
    isInvalid: 'is-invalid',
    inputEmpty: [],
    inputFilled: [],
  }

  isEmptyField(formInput) {
    const { inputEmpty, inputFilled } = this.state;

    let text = formInput.value;

    if (text === '') {
      inputEmpty.length = 0;
      inputEmpty.push(formInput);
      return true;
    } else {
      inputFilled.length = 0;
      inputFilled.push(formInput);
      return false;
    }
  }

  addValidState() {
    const { isInvalid, isValid, inputFilled } = this.state;

    inputFilled.forEach(function (input) {
      input.classList.remove(isInvalid);
      input.classList.add(isValid);
    })
  }

  addInvalidState() {
    const { isInvalid, isValid, inputEmpty } = this.state;

    inputEmpty.forEach(function (input) {
      input.classList.remove(isValid);
      input.classList.add(isInvalid);
    })
  }

  fieldValid(field) {
    const { isInvalid, isValid } = this.state;
    field.classList.remove(isInvalid);
    field.classList.add(isValid);
  }

  fieldInvalid(field) {
    const { isInvalid, isValid } = this.state;
    field.classList.add(isInvalid);
    field.classList.remove(isValid);
  }

  formSubmit() {
    this.isRequired(this.formControl);
    this.checkLength(this.formControlLength);
    this.validateEmail(this.formControlEmail);
    this.validatePassword(this.formControlPassword, this.formControlPasswordRe);
  }

  isRequired(fields) {
    for (let field of fields) {
      this.isEmptyField(field) ? this.addInvalidState() : this.addValidState();
    }
  }

  checkLength(fieldName) {
    const { isInvalid, isValid } = this.state;

    fieldName.forEach(field => {
      const minChar = field.getAttribute('data-length');
      field.value.length < minChar ? this.fieldInvalid(field) : this.fieldValid(field);
    })
  }

  validateEmail(email) {
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regExEmail.test(email.value.trim())) {
      this.fieldValid(email);
    } else {
      this.fieldInvalid(email);
    }
  }

  validatePassword(password, passwordRe) {
    if (password.value === passwordRe.value && password.value > 6) {
      this.fieldValid(password);
      this.fieldValid(passwordRe);
    } else {
      this.fieldInvalid(password);
      this.fieldInvalid(passwordRe);
    }
  }
}

const formValidation = new FormValidation();

export default formValidation;