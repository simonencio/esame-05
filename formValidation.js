"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var validateField = function (field, value) {
    console.log("Validating field: ".concat(field, ", Value: ").concat(value));
    switch (field) {
        case 'nome':
            return value ? '' : 'Nome is required';
        case 'cognome':
            return value ? '' : 'Cognome is required';
        case 'sesso':
            return value ? '' : 'Sesso is required';
        case 'citta-di-nascita':
            return value ? '' : 'Città di nascita is required';
        case 'via':
            return value ? '' : 'Via is required';
        case 'email':
            var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(value) ? '' : 'Invalid email address';
        case 'password':
            return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
        default:
            return '';
    }
};
var setupValidation = function () {
    var form = document.getElementById('registration-form');
    var fields = ['nome', 'cognome', 'sesso', 'citta-di-nascita', 'via', 'email', 'password'];
    fields.forEach(function (field) {
        var input = document.getElementById(field);
        (0, rxjs_1.fromEvent)(input, 'input').pipe((0, operators_1.debounceTime)(300), (0, operators_1.map)(function () { return validateField(field, input.value); }), (0, operators_1.startWith)(''), (0, operators_1.distinctUntilChanged)()).subscribe(function (error) {
            var errorElement = document.getElementById("".concat(field, "Error"));
            errorElement.innerText = error;
        });
    });
    (0, rxjs_1.fromEvent)(form, 'submit').subscribe(function (event) {
        event.preventDefault();
        var errors = fields.map(function (field) { return validateField(field, document.getElementById(field).value); });
        if (errors.every(function (error) { return error === ''; })) {
            var formData = {
                nome: document.getElementById('nome').value,
                cognome: document.getElementById('cognome').value,
                sesso: document.getElementById('sesso').value,
                cittaDiNascita: document.getElementById('citta-di-nascita').value,
                via: document.getElementById('via').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            console.log('Form submitted successfully:', JSON.stringify(formData, null, 2));
            alert('Form submitted successfully!');
        }
    });
};
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    setupValidation();
});
