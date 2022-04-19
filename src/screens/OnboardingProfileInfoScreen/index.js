import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { actuatedNormalize } from '../../services/actuatedNormalizeFont';
import { CustomTextInput, CustomButton } from '../../components';
import colors from '../../color'
import { _onboardScreenDataAsync } from '../../redux/operations/saveProfileInfoOperation'
import { CommonActions } from '@react-navigation/native';


class OnboardingProfileInfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageUrl: '',
            image: null,
            btnDisabled: true
        }
    }

    openCamera() {
        SheetManager.hide("option_sheet")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
        });
        /*launchCamera({
            mediaType: 'photo',

        }, (res) => {
            if (res.didCancel !== true) {
                this.setState({
                    imageUrl: res.assets[0].uri,
                    image: res.assets[0]
                })
            } else {
                // console.log('error - ', res);
            }
        });*/
    }

    openGallery() {
        SheetManager.hide("option_sheet")
        ImagePicker.openPicker({
            multiple: true
          }).then(images => {
            console.log(images);
          });
        /*launchImageLibrary({
            mediaType: 'photo',
        }, (res) => {
            if (res.didCancel !== true) {
                this.setState({
                    imageUrl: res.assets[0].uri,
                    image: res.assets[0]
                })
            } else {
                // console.log('error - ', res);
            }
        })*/
    }

    async _handleSave() {
        const { name, imageUri, image } = this.state
        const response = await this.props.saveinfo(name, image)
        if (response) {
            const resetaction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainStack' }]
            })

            this.props.navigation.dispatch(resetaction)
        }
    }


    render() {
        const { imageUrl } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >

                        <View style={styles.header}>
                            <Text style={styles.headingText}>Profile Info</Text>
                            <Text style={styles.subHeadingText}>Please provide your name and Optional Profile photo.</Text>
                        </View>

                        <View style={styles.body}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={styles.cameraBtn} onPress={() => SheetManager.show("option_sheet")}>
                                    {
                                        (!imageUrl) ?

                                            <MaterialCommunityIcons
                                                name="camera-plus"
                                                color={colors.iconGray}
                                                size={45}
                                            />
                                            :
                                            <Image
                                                source={{ uri: imageUrl }}
                                                style={{ width: "100%", height: "100%", borderRadius: 120 }}
                                            />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textinputContainer}>
                                <CustomTextInput
                                    value={this.state.name}
                                    iconName="user"
                                    onChangeText={v => {
                                        if (v.length > 0) {
                                            this.setState({ name: v, btnDisabled: false })
                                        }else{
                                            this.setState({name: v, btnDisabled: true})
                                        }
                                    }
                                    }
                                    label="Your full name"
                                />
                            </View>

                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity style={[styles.btnNext,(this.state.btnDisabled)? {opacity: 0.6}: {opacity: 1}]} onPress={() => this._handleSave()} disabled={this.state.btnDisabled}>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Next</Text>
                            </TouchableOpacity>
                        </View>


                    </KeyboardAwareScrollView>

                    <ActionSheet id="option_sheet">
                        <View style={{ padding: 10 }}>
                            <TouchableOpacity style={{ paddingVertical: 15, }} onPress={() => this.openCamera()}>
                                <Text>Lanuch Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => this.openGallery()}>
                                <Text>Open Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </ActionSheet>

                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        //userData: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveinfo: (username, image) => dispatch(_onboardScreenDataAsync(username, image))
    }
}

const containerComponent = connect(mapStateToProps, mapDispatchToProps)
export default containerComponent(OnboardingProfileInfoScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp("100%"),
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        //backgroundColor:'red'
    },
    headingText: {
        fontSize: actuatedNormalize(20),
        color: '#000',
        textAlign: 'center',
        marginTop: 7
    },
    subHeadingText: {
        fontSize: actuatedNormalize(14),
        color: '#000',
        textAlign: 'center',
        marginTop: 15
    },
    body: {
        flex: 1,
    },
    textinputContainer: {
        height: 60,
        marginVertical: 10,
        marginHorizontal: 5
    },
    cameraBtn: {
        marginTop: 30,
        borderRadius: 120,
        width: 120,
        height: 120,
        backgroundColor: "#ECE4DE",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnNext:{ 
        backgroundColor: colors.mainColor,
        padding: 8,
        width: 90 
    }
});
