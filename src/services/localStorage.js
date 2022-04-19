import {AsyncStorage} from 'react-native'

const storeData = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        
    }
}

const getData = async(key) => {
    try {
        const response = await AsyncStorage.getItem(key)
        return response
    } catch (error) {
        return false
    }
}

export {getData, storeData}