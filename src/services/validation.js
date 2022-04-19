import validator from 'is_js'


const isEmpty = (key, value) => {
    if (validator.empty(value.trim())) {
        return `${key}` + ' Should not be empty!'
    } else {
        return ''
    }
}

const checkValidEmail = (value) => {
    if (!validator.email(value)) {
        return 'Please enter a valid email!'
    } else {
        return ''
    }
}

const checkLength = (key, value, minLength) => {
    if(value.trim().length < minLength){
        return `${key}` + ' length must be '+ `${minLength}` + '!'
    }else{
        return ''
    }
}

const matchPassword = (key,password, confirmpassword) => {
    if(password !== confirmpassword){
        return `${key}` + ' does not matched!'
    }else{
        return ''
    }
}


export default function (data) {
    const { fullname, email, password, confirmpassword, description, location, bio, phonenumber } = data
  
    if (fullname !== undefined) {
        let response = isEmpty('Full Name', fullname)
        
        if (response !== '') {
            return response
        }
    }

    if (description !== undefined) {
        let response = isEmpty('Description', description)
        
        if (response !== '') {
            return response
        }
    }

    if (location !== undefined) {
        let response = isEmpty('Location', location)
        
        if (response !== '') {
            return response
        }
    }

    if (bio !== undefined) {
        let response = isEmpty('Bio', bio)
        
        if (response !== '') {
            return response
        }
    }

    if (phonenumber !== undefined) {
        let response = isEmpty('Phone number', phonenumber)
        
        if (response !== '') {
            return response
        }
    }


    if (email !== undefined) {
        let response = isEmpty('Email', email)

        if (response !== '') {
            return response
        } else {
            response = checkValidEmail(email)
            if(response !== ''){
                return response
            }
        }
    }


    if(password !== undefined){
        let response = isEmpty('Password', password)
        if(response !== ''){
            return response
        }else{
            response = checkLength('Password',password,5)
            if(response !== ''){
                return response
            }
        }
    }

    if(confirmpassword !== undefined){
        let response = isEmpty('Confirm password', confirmpassword)
        if(response !== ''){
            return response
        }else{
            response = matchPassword('Confirm password',password,confirmpassword)
            if(response !== ''){
                return response
            }
        }
    }


    return true
}