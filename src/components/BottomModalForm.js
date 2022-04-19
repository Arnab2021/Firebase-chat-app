import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import color from '../color';


const BottomModalForm = ({ isOpen, onClose, formData, _handleFormSubmission }) => {

    const [heading, setHeading] = useState('')
    const [textboxvalue, setTextBoxValue] = useState('')
    const [placeholder, setPlaceholder] = useState('Enter here..')
    
    useEffect(() => {
        if (formData.key == 'username') {
            setHeading('Edit Username')
            setPlaceholder('Enter Username')
            setTextBoxValue(formData.value)
        }
        if (formData.key == 'description') {
            setHeading('Edit Description')
            setPlaceholder('Enter Description')
            setTextBoxValue(formData.value)
        }
        if (formData.key == 'location') {
            setHeading('Edit Location')
            setPlaceholder('Enter Location')
            setTextBoxValue(formData.value)
        }
        if (formData.key == 'email') {
            setHeading('Edit Email')
            setPlaceholder('Enter Email')
            setTextBoxValue(formData.value)
        }
        if (formData.key == 'bio') {
            setHeading('Edit Bio')
            setPlaceholder('Enter Bio')
            setTextBoxValue(formData.value)
        }
        if (formData.key == 'phonenumber') {
            setHeading('Edit Email')
            setPlaceholder('Enter Phone Number')
            setTextBoxValue(formData.value)
        }
    }, [formData])

    return (
        <View>
            <Modal isVisible={isOpen} style={styles.modal} >
                <View style={styles.content}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.headerText}> {heading} </Text>
                        </View>
                        <TouchableOpacity style={{ padding: 10 }} onPress={onClose}>
                            <Entypo name='cross' size={30} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            value={textboxvalue}
                            onChangeText={e => setTextBoxValue(e)}
                            style={styles.textInput}
                            placeholder={placeholder}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.btn,{backgroundColor: "#f1f1f1"}]} onPress={onClose}>
                            <Text style={[styles.btnText,{color: '#000'}]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => _handleFormSubmission(textboxvalue)}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                   </KeyboardAwareScrollView>
                </View>
                
            </Modal>
        </View>
    )

}

export default BottomModalForm

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: '#fff',        
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 10
    },
    header: {
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: hp("3%"),
        color: '#000',
        textTransform: 'capitalize'
    },
    body: {
        marginBottom: 20
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        color: '#000',
        paddingLeft: 10
    },
    footer:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 15,
        
    },
    btn:{
        flex: 0.5,
        paddingVertical: 15,
        backgroundColor: color.mainColor,
        
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    }
})