import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { actuatedNormalize } from '../services/actuatedNormalizeFont';
import { AvatarIcon } from '.';
import colors from '../color'

export default class CallCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {item} = this.props
        return (
            <TouchableOpacity style={styles.cardContainer}>
                <AvatarIcon avatarContainer={{ width: 50,height: 50,}}/>
                <View style={styles.info}>
                    <Text style={styles.username}>{item.name}</Text>
                    <View style={styles.row}>
                        {
                            (item.call_type == 'incoming')?
                            <MaterialIcons name='call-received' size={18} color={colors.incomingCallIcon} style={{fontWeight:'bold'}}/>
                            :
                            (item.call_type == 'outgoing')?
                            <MaterialIcons name='call-made' size={18} color={colors.outgoingCallIcon} style={{fontWeight:'bold'}} />
                            :
                            (item.call_type == 'missed_incoming')?
                            <MaterialIcons name='call-missed' size={18} color={colors.missedIncomingCallIcon} style={{fontWeight:'bold'}} />
                            :
                            <MaterialIcons name='call-missed-outgoing' size={18} color={colors.missedOutgoingCallIcon} style={{fontWeight:'bold'}} />
                            
                        }
                        
                        <Text style={styles.text}>({item.call_count})</Text>
                        <Text style={styles.text}>{item.calltime}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.callBackIcon}>
                <MaterialIcons name='call' size={hp('4%')} style={{paddingHorizontal: 8}} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 6
    },
    info: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: 8,
    },
    username: {
        fontSize: actuatedNormalize(14),
        fontWeight: 'bold',
        color: colors.textColor
    },
    row: {
        flexDirection: 'row',
    },
    text:{
        fontSize: 16,
        marginHorizontal: 3
    },
    callBackIcon:{
        padding: 5,
    }
})