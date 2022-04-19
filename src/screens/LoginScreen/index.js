import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, NavigationActions, StackActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'

import { actuatedNormalize } from '../../services/actuatedNormalizeFont';
import { CustomTextInput, CustomButton } from '../../components';
import colors from '../../color';
import { loginOperation } from '../../redux/operations/loginOperation'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'user1@mail.com',
            password: 'Abc1234'
        }
    }

    handleLogin = async () => {
        const { email, password } = this.state

        this.setState({loader: true})
        const response = await this.props.login(email, password)
        this.setState({loader: false})
        
        //return
        if (response) {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainStack' }],
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    async componentDidMount() {
       
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 5 }} keyboardShouldPersistTaps='handled' >

                        <View style={styles.header}>
                            <View>
                                <Text style={styles.headingText}>Login</Text>
                                <Text style={styles.subHeadeingText}>Please sign in to continue</Text>
                            </View>
                        </View>
                        <View style={styles.body}>

                            <View style={styles.textinputContainer}>
                                <CustomTextInput
                                    value={this.state.email}
                                    iconName="mail"
                                    onChangeText={v => this.setState({ email: v })}
                                    label="EMAIL"
                                />
                            </View>

                            <View style={[styles.textinputContainer]}>
                                <CustomTextInput
                                    value={this.state.password}
                                    iconName="lock"
                                    onChangeText={v => this.setState({ password: v })}
                                    label="PASSWORD"
                                    containerStyle={{ height: 65, marginTop: 15 }}
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    label="LOGIN"
                                    buttonStyle={styles.buttonStyle}
                                    iconComponent={<Feather name="arrow-right" color="#fff" size={16} style={{ marginLeft: 5 }} />}
                                    onPress={this.handleLogin}
                                    isLoading={this.state.loader}
                                />
                            </View>

                        </View>

                        <View style={styles.footer}>
                            <View style={styles.row}>
                                <Text style={styles.footerText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('register')}  >
                                    <Text style={[styles.footerText, { color: '#FCA13B' }]}> Sign Up </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.AuthenticationReducer,
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(loginOperation(email, password))
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp("100%"),
        backgroundColor: '#fff',
    },
    header: {
        height: hp('30%'),
        justifyContent: 'flex-end',
    },
    body: {
        paddingVertical: 50,
    },
    textinputContainer: {
        height: 60,
        marginVertical: 10,
        marginHorizontal: 5
    },
    headingText: {
        fontSize: actuatedNormalize(35),
        fontWeight: 'bold',
        color: '#000',
    },
    subHeadeingText: {
        fontSize: actuatedNormalize(19),
        fontWeight: 'bold',
        color: '#969798',
    },
    buttonContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 15
    },
    buttonStyle: {
        width: wp('40%'),
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryButtonColor
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    footerText: {
        color: '#969897',
        fontSize: actuatedNormalize(17),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
