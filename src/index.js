function createInputField(labelText, inputType, inputID, required, placeholderText) {
    const container = document.createElement('div');
    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', inputID);
    inputLabel.textContent = labelText;
    const inputField = document.createElement('input');
    inputField.id = inputID;
    inputField.type = inputType;
    inputField.name = inputID;
    inputField.placeholder = placeholderText;
    inputField.required = required;
    container.append(inputLabel, inputField);

    return container;
}

function createForm() {
    const form = document.createElement('form');
    const emailField = createInputField("E-mail", "email", "userMail", true, "user@example.com");
    const countryField = createInputField("Country", "text", "userCountry", true, "E.g. United States");
    const zipCodeField = createInputField("ZIP Code", "text", "userZipCode", true, "E.g. 20500");
    const passwordField = createInputField("Password", "password", "userPassword", true, "Your password");

    form.append(emailField, countryField, zipCodeField, passwordField);
    return form;
}

const mainContainer = document.querySelector("div");
const form = createForm();
mainContainer.append(form);