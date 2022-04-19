import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { actuatedNormalize } from '../services/actuatedNormalizeFont';

export default class CustomButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { buttonStyle, label, iconComponent, onPress ,isLoading} = this.props
        return (

            <TouchableOpacity style={[styles.buttonStyle, buttonStyle, ]} onPress={onPress}>
                {
                    (isLoading) ?
                        <ActivityIndicator animating size="small" color="#fff" />
                        :
                        <>
                            <Text style={styles.btnText}>{label}</Text>

                            {iconComponent}
                        </>

                }

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    btnText: {
        color: '#fff',
        fontSize: actuatedNormalize(16)
    }
})