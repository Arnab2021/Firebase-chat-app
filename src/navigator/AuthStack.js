import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const LoginStack = createNativeStackNavigator()
function AuthStack() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
            <LoginStack.Screen name="register" component={RegisterScreen} options={({ navigation, route }) => ({
                headerShown: true,
                headerShadowVisible: false,
                title: '',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerLeft: () => (
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name='arrow-back'
                        color="grey"
                        size={30}
                    />
                )
            })} />
        </LoginStack.Navigator>
    )
}

export {AuthStack}