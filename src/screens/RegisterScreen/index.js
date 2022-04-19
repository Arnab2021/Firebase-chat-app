import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'

import { actuatedNormalize } from '../../services/actuatedNormalizeFont';
import { CustomTextInput, CustomButton } from '../../components';
import colors from '../../color'
import {registrationOperation} from '../../redux/operations/registrationOperation'


class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'user1@mail.com',
      password: 'Abc1234',
      confirmpassword: 'Abc1234'
    }
  }

  async signup() {
    const {  email, password, confirmpassword } = this.state    
    
    this.setState({loader: true})
    const response = await this.props.signup(email, password, confirmpassword)
    this.setState({loader: false})
    if(response){
      this.props.navigation.navigate("OnboardingProfile")
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 5 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >

            <View style={styles.header}>
              <View>
                <Text style={styles.headingText}>Create account</Text>
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

              <View style={[styles.textinputContainer]}>
                <CustomTextInput
                  value={this.state.confirmpassword}
                  iconName="lock"
                  onChangeText={v => this.setState({ confirmpassword: v })}
                  label="CONFIRM PASSWORD"
                  containerStyle={{ height: 65, marginTop: 15 }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  label="SIGN UP"
                  buttonStyle={styles.buttonStyle}
                  iconComponent={<Feather name="arrow-right" color="#fff" size={20} style={{ marginLeft: 5 }} />}
                  onPress={() => this.signup()}
                  isLoading={this.state.loader}
                />
              </View>



            </View>

            <View style={styles.footer}>
              <View style={styles.row}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}  >
                  <Text style={[styles.footerText, { color: '#FCA13B' }]}> Sign in </Text>
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
    userData: state.AuthenticationReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (email, password, confirmpassword) => dispatch(registrationOperation(email, password,confirmpassword))
  }
}

const containerComponent = connect(mapStateToProps, mapDispatchToProps)
export default containerComponent(RegisterScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp("100%"),
    backgroundColor: '#fff',
  },
  header: {
    height: hp('18%'),
    justifyContent: 'flex-end',
  },
  body: {
    paddingVertical: 20,
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
