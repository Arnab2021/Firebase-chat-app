import validator from '../../services/validation'
import { showError, showSuccess } from '../../services/showMessages'
import {RegistrationAction} from '../actions/AuthenticationAction'
import auth from '@react-native-firebase/auth';
import { saveEmailAction } from '../actions/SaveProfileInfoAction';
import { storeData } from '../../services/localStorage';
import type from '../type';

const createFirebaseUser = async (email, password) => {
    console.log('createUser');

    try {
        const res = await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {               
                showSuccess('User account created & signed in!');
                return res.user
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    showError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    showError('That email address is invalid!');
                }

                if (error.code === 'auth/weak-password') {
                    showError('Password is Weak!');
                }                
                //showError(error.code);
                return false
            });
        return res
    } catch (error) {
        showError(error)
    }

}



const registrationOperation = ( email, password, confirmpassword) => async dispatch => {

    const response = validator({
        email: email,
        password: password,
        confirmpassword: confirmpassword
    })

    if (response === true) {
        //showSuccess('Validation Success!')
        const response = await createFirebaseUser(email, password)
        console.log(response);
        if (response !== false) {            
            await storeData("user_id", response.uid)
            dispatch(RegistrationAction(response))
            dispatch(saveEmailAction(email))
            return true
        } else {
            return false
        }

    } else {
        showError(response)
        return false
    }

}

export { registrationOperation }