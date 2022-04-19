import { Text, View } from 'react-native';
import React, { Component, useEffect } from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigator';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import colors from './src/color';
import { store } from './src/redux/store';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { LogOutAction } from './src/redux/actions/AuthenticationAction';

const App = () => {

  //const dispatch = useDispatch()

  useEffect(() => {
    //dispatch(LogOutAction(''))
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, [])

    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
          <NavigationContainer>
            <Navigator />
            <FlashMessage position="top" style={{ elevation: 1000, zIndex: 1000 }} />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    ); 
}

export default App
