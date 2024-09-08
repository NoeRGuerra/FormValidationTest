import './style.css';

function createInputValue(validators) {
    return {
        value: '',
        valid: false,
        validators,

        validate() {
            this.valid = this.validators.every((validator) =>
                validator(this.value),
            );
            return this.valid;
        },

        setValue(value) {
            this.value = value;
            this.validate();
        },
    };
}

function createLabel(text, labelID) {
    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', labelID);
    inputLabel.textContent = text;

    return inputLabel;
}

function createInputField(inputType, inputID, required, placeholderText) {
    const inputField = document.createElement('input');
    inputField.id = inputID;
    inputField.type = inputType;
    inputField.name = inputID;
    inputField.placeholder = placeholderText;
    inputField.required = required;

    return inputField;
}

function createSubmitButton(text, onClick) {
    const submitBtn = document.createElement('button');
    submitBtn.textContent = text;
    submitBtn.type = 'submit';
    submitBtn.addEventListener('click', onClick);

    return submitBtn;
}

function createInputContainer(
    labelText,
    inputID,
    inputType,
    required,
    placeholder,
    validators,
) {
    const container = document.createElement('div');
    const label = createLabel(labelText, inputID);
    const inputField = createInputField(
        inputType,
        inputID,
        required,
        placeholder,
    );

    inputField.addEventListener('blur', () => {
        const emailValue = createInputValue(validators);
        emailValue.setValue(inputField.value);
        inputField.classList.toggle('error', !emailValue.valid);
    });
    container.append(label, inputField);
    return container;
}

function createForm() {
    const form = document.createElement('form');
    form.setAttribute('novalidate', 'true');
    const emailValidators = [
        (value) => value.includes('@'),
        (value) => value.length >= 5,
    ];
    const emailField = createInputContainer(
        'E-Mail',
        'userMail',
        'email',
        true,
        'user@example.com',
        emailValidators,
    );

    const countryValidators = [(value) => value.length >= 3];
    const countryField = createInputContainer(
        'Country',
        'userCountry',
        'text',
        true,
        'E.g. United States',
        countryValidators,
    );

    const zipCodeValidators = [(value) => /^\d{5}(-\d{4})?$/.test(value)];
    const zipCodeField = createInputContainer(
        'ZIP Code',
        'userZipCode',
        'text',
        true,
        'E.g. 20500',
        zipCodeValidators,
    );

    const passwordValidators = [
        (value) => value.length >= 8,
        (value) => /[A-Z]/.test(value),
        (value) => /[0-9]/.test(value),
    ];
    const passwordField = createInputContainer(
        'Password',
        'userPassword',
        'password',
        true,
        'Your password',
        passwordValidators,
    );
    const submitBtn = createSubmitButton('Submit', () => {
        console.log('Clicked!');
    });
    form.append(
        emailField,
        countryField,
        zipCodeField,
        passwordField,
        submitBtn,
    );
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    return form;
}

const mainContainer = document.querySelector('div');
const form = createForm();
mainContainer.append(form);
