import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import colors from '../color'

export default class AboutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {setActionSheetFormData, userInfo} = this.props
       
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'bio', label: 'Bio', value: userInfo.bio  }) }>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name='information-outline' size={hp('3%')} color={colors.mainColor} />
                        <Text style={styles.text}>{ (userInfo.bio == undefined || userInfo.bio == '')? 'About you...' : userInfo.bio  }</Text>
                        <View>
                            <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fieldContainer} activeOpacity={0.5} onPress={() => setActionSheetFormData({ key: 'phonenumber', label: 'Phone number', value: userInfo.phone_number}) }>
                    <View style={styles.row}>
                        <FontAwesome name='phone' size={hp('3%')} color={colors.mainColor} />
                        <Text style={styles.text}>{(userInfo.phone_number == undefined || userInfo.phone_number == '')? 'Phone number...': userInfo.phone_number}</Text>
                        <View>
                            <MaterialCommunityIcons name="pencil" size={hp('4%')} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fieldContainer: {
        padding: 8,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
        fontSize: hp('2.5%'),
    }
})