import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import colors from '../color';
import TabBarHelper from '../navigator/TabBarHelper'
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CallsHistoryScreen from '../screens/CallsHistoryScreen'


const Tab = createBottomTabNavigator()
function TabStack() {
  return (
    <Tab.Navigator initialRouteName="chat" screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        return (
          <View style={[styles.tabIconContainer]}>
            {
              (route.name == 'callhistory') ?
                <MaterialIcons name={TabBarHelper.getTabIconName(route.name)} size={23} color={(focused) ? colors.bottomTabActiveIconColor : colors.bottomTabIconColor} />
                :
                <Entypo name={TabBarHelper.getTabIconName(route.name)} size={23} color={(focused) ? colors.bottomTabActiveIconColor : colors.bottomTabIconColor} />
            }
            <Text style={{ color: (focused) ? colors.bottomTabActiveLabelColor : colors.bottomTabLabelColor, fontSize: 13, fontWeight: (focused) ? 'bold' : 'normal', marginTop: 2 }}> {TabBarHelper.getTabName(route.name)}  </Text>
          </View>
        )
      },
      tabBarStyle: {
        ...Platform.select({
          android: {
            height: hp('8%'),          
          },
          ios: {
            height: hp('9%'),
          }
        }),
      },
    })}

    >
      <Tab.Screen name="chat" component={DashboardScreen} options={{
        title: 'Your Chats',
        headerStyle: {
          backgroundColor: colors.mainColor,
        },
        headerTintColor: '#fff',
      }}
      />
      <Tab.Screen name="profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: false }} />
      <Tab.Screen name="callhistory" component={CallsHistoryScreen} options={{
        title: 'Calls',
        headerStyle: {
          backgroundColor: colors.mainColor,
        },
        headerTintColor: '#fff',
        headerShown: true
      }} />
    </Tab.Navigator>
  )
}

export { TabStack }


const styles = StyleSheet.create({
  tabIconContainer: {  
    justifyContent: 'center',
    alignItems: 'center',
  }
})