import React, { useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import colors from '../color'

const PersonnelInformationView = ({ userInfo, setActionSheetFormData }) => {
   console.log(userInfo);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'username', label: 'Username', value: userInfo.user_name }) }>
                <View style={styles.row}>
                    <FontAwesome5 name='user-alt' size={hp('3%')} color={colors.mainColor} />
                    <Text style={styles.text}>{userInfo.user_name}</Text>
                    <View>
                        <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'description', label: 'Description', value: userInfo.user_description }) }>
                <View style={styles.row}>
                    <MaterialIcons name='description' size={hp('3.2%')} color={colors.mainColor} />
                    <Text style={styles.text}>{(userInfo.user_description == undefined || userInfo.user_description == '') ? 'Add description...' :userInfo.user_description}</Text>
                    <View>
                        <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'location', label: 'Location', value: userInfo.user_location }) }>
                <View style={styles.row}>
                    <Ionicons name='location-sharp' size={hp('3.2%')} color={colors.mainColor} />
                    <Text style={styles.text}>{(userInfo.user_location == undefined || userInfo.user_location == '') ? 'Add location...' : userInfo.user_location}</Text>
                    <View>
                        <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'email', label: 'Email', value: userInfo.user_email }) }>
                <View style={styles.row}>
                    <Ionicons name='mail' size={hp('3.2%')} color={colors.mainColor} />
                    <Text style={styles.text}>{(userInfo.user_email == '' || userInfo.user_email == '') ? 'Add email...' : userInfo.user_email}</Text>
                    <View>
                        <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default PersonnelInformationView

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
    },
    fieldContainer: {
        padding: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        paddingLeft: 10,
        fontSize: hp('2.5%'),
    }
})