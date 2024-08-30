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
        if(formControl.required) {
            return !value;
        }
        if(formControl.regex  && !!value) {
            const regex = new RegExp(formControl.regex);
            return !regex.test(value)
        }
    });

    return errors;
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = event.target.elements;
    const errors = validateForm(formData);

    if(errors.length) {
         // HANDLE DISPLAYING FORM ERRORS ON THE UI
        console.log('ERRORS:', errors)
    }else {
         // HANDLE FORM SUCCESS
        console.log('SUCCESS');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newUser').addEventListener('submit', handleFormSubmit)
})