const formValidation = [
    {
        id: 'username',
        regex: new RegExp("^[a-zA-Z0-9]+$"),
        errorMessage: 'Username must include only letters and numbers',
        required: true
    },
    {
        id: 'email',
        regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"),
        errorMessage: 'Invalid email address',
        required: true
    },
    {
        id: 'phoneNumber',
        regex: new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"),
        errorMessage: 'Invalid Phone Number'
    },
    {
        id: 'accessRights',
        required: true,
        errorMessage: 'User access rights required'
    }
]

const validateForm = (formData) => {
    const errors = formValidation.filter(formControl => {
        const value = formData[formControl.id]?.value
        if (formControl.required) {
            return !value;
        }
        if (formControl?.regex && !!value) {
            const regex = new RegExp(formControl.regex);
            return !regex.test(value);
        } else {
            return false;
        }

    });

    return errors;
}

const handleFormErrorsList = (errors) => {
    const text = errors.length > 1
        ? `There are ${errors.length} errors in the form submission`
        : `There is ${errors.length} error in the form submission`
    const title = `<h3>${text}</h3>`
    const alertHTML = errors.map(error => `<a href="#${error.id}">${error.errorMessage}</>`).join('');
    document.getElementById('formErrorsList').innerHTML = title + alertHTML;
}

const handleFormInputs = (formInputs, errors, reset = false) => {
    for (let i = 0; i < formInputs.length; i++) {
        if (formInputs[i].nodeName === "INPUT") {
            const formInput = formInputs[i];
            const inputId = formInput.id;
            const inputGroup = formInput.name;

            const parentNode = document.getElementById(inputId)?.parentNode;
            const legend = parentNode?.querySelector('legend');
            const label = parentNode?.querySelector('label');
            const isFieldset = !!legend;

            const ariaDescribedBy = document.getElementById(formInput.getAttribute('aria-describedby'));


            const inputError = errors.find(error => error.id === inputId || error.id === inputGroup); 

            if(inputError) {
                parentNode.className = 'error'
                ariaDescribedBy.innerText = inputError.errorMessage;
                isFieldset 
                    ? legend.querySelector('strong').innerText = 'Error:'
                    : label.querySelector('strong').innerText = 'Error:'
                

            } else {
                parentNode.className = 'success'

                if(ariaDescribedBy) {
                    ariaDescribedBy.innerText = '';
                }

                isFieldset 
                    ? legend.querySelector('strong').innerText = 'Ok:'
                    : label.querySelector('strong').innerText = 'Ok:'
            }

            if(reset) {
                parentNode.className = ''

                if(ariaDescribedBy) {
                    ariaDescribedBy.innerText = '';
                }

                isFieldset 
                    ? legend.querySelector('strong').innerText = ''
                    : label.querySelector('strong').innerText = ''
            }
        }
    }
}

const resetForm = (formInputs) => {
    document.getElementById('formErrorsList').innerHTML = '';
    handleFormInputs(formInputs, [], true);
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const formData = form.elements;
    const errors = validateForm(formData);

    if (errors.length) {
        handleFormErrorsList(errors);
        handleFormInputs(formData, errors);
        return;
    } else {
        alert('Form Successfully Submitted');
        resetForm(formData);
        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newUser').addEventListener('submit', handleFormSubmit)
})