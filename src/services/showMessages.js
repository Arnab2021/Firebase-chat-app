import {showMessage} from 'react-native-flash-message'

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message,
        duration: 4000
    })
}

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message,
        floating:true,
        duration: 4000
    })
}

export {showSuccess, showError}