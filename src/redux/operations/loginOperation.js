import validator from '../../services/validation'
import { showError, showSuccess } from '../../services/showMessages'
import { LoginAction } from '../actions/AuthenticationAction'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { saveEmailAction, saveProfileImageAction, saveUsernameAction, saveGalleryImageAction, saveDescriptionAction, saveLocationAction, saveBioAction, savePhonenumberAction } from '../actions/SaveProfileInfoAction';
import { storeData } from '../../services/localStorage';

const firebaseLogin = async (email, password) => {
    try {
        const res = await auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {

                //console.log('User account created & signed in!',res);
                return res.user
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    showError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    showError('That email address is invalid!');
                }

                if (error.code === 'auth/user-not-found') {
                    showError('There is no user record corresponding to this identifier!');
                }

                return false
            });
        return res
    } catch (error) {
        showError(error)
    }
}

const _fetchUserinfo = async (user_id) => {
    try {
        let userInfo = {}
        const querySnapshot = await firestore().collection('usersInfo').where("user_id", '==', user_id).get()
        //console.log('querySnapshot',querySnapshot);
        querySnapshot.forEach(async snapshot => {
            //console.log('snapshot',snapshot._ref._documentPath._parts);
            if (snapshot.exists) {
                userInfo = snapshot.data()
                const doc_id = snapshot._ref._documentPath._parts[1]                
                await storeData("firebaseUserDocID",doc_id)
            }
        })     
        return userInfo
    } catch (error) {
        return false
    }
}


const loginOperation = (email, password) => async dispatch => {

    const response = validator({
        email: email,
        password: password
    })

    if (response === true) {
        const login_response = await firebaseLogin(email, password)

        if (login_response !== false) {
            
            await storeData("user_id", login_response.uid)
            dispatch(LoginAction(login_response))

            const userData = await _fetchUserinfo(login_response.uid)   
            
            if(userData !== false){                
                dispatch(saveEmailAction(email))
                dispatch(saveUsernameAction(userData.user_name))
                dispatch(saveProfileImageAction(userData.avatar))                
                dispatch(saveGalleryImageAction(userData.gallery))
                dispatch(saveDescriptionAction(userData.description))
                dispatch(saveLocationAction(userData.location))
                dispatch(saveBioAction(userData.bio))
                dispatch(savePhonenumberAction(userData.number))
            }
            showSuccess('Login Success!')
            
            return true
        } else {
            return false
        }

    } else {
        showError(response)
        return false
    }
}

export { loginOperation }