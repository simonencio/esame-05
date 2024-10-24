import { fromEvent, merge, of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface UserRegistrationData {
    nome: string;
    cognome: string;
    sesso: string;
    cittaDiNascita: string;
    via: string;
    email: string;
    password: string;
}

const validateField = (field: string, value: string) => {
    console.log(`Validating field: ${field}, Value: ${value}`);
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
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(value) ? '' : 'Invalid email address';
        case 'password':
            return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
        default:
            return '';
    }
};

const setupValidation = () => {
    const form = document.getElementById('registration-form') as HTMLFormElement;

    const fields = ['nome', 'cognome', 'sesso', 'citta-di-nascita', 'via', 'email', 'password'];

    fields.forEach(field => {
        const input = document.getElementById(field) as HTMLInputElement;
        fromEvent(input, 'input').pipe(
            debounceTime(300),
            map(() => validateField(field, input.value)),
            startWith(''),
            distinctUntilChanged()
        ).subscribe(error => {
            const errorElement = document.getElementById(`${field}Error`) as HTMLDivElement;
            errorElement.innerText = error;
        });
    });

    fromEvent(form, 'submit').subscribe(event => {
        event.preventDefault();
        const errors = fields.map(field => validateField(field, (document.getElementById(field) as HTMLInputElement).value));

        if (errors.every(error => error === '')) {
            const formData: UserRegistrationData = {
                nome: (document.getElementById('nome') as HTMLInputElement).value,
                cognome: (document.getElementById('cognome') as HTMLInputElement).value,
                sesso: (document.getElementById('sesso') as HTMLSelectElement).value,
                cittaDiNascita: (document.getElementById('citta-di-nascita') as HTMLInputElement).value,
                via: (document.getElementById('via') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                password: (document.getElementById('password') as HTMLInputElement).value
            };

            console.log('Form submitted successfully:', JSON.stringify(formData, null, 2));
        }
    });
};

setupValidation();