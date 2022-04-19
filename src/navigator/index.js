import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { AuthStack } from './AuthStack';
import { TabStack } from './MainStack';
import OnboardingProfileInfoScreen from '../screens/OnboardingProfileInfoScreen';



const Stack = createNativeStackNavigator()

export default function Navigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator initialRouteName={(user)? 'MainStack': 'LoginStack'} screenOptions={{ headerShown: false }}>

      <Stack.Screen name="LoginStack" component={AuthStack} />

      <Stack.Screen name='MainStack' component={TabStack} />
      <Stack.Screen name='OnboardingProfile' component={OnboardingProfileInfoScreen} />

    </Stack.Navigator>
  );
}
