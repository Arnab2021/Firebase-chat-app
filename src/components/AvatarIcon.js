import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const usericon = require('../images/user.png')

export default class AvatarIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {

    const { profileImage, AvatarIconStyle, avatarContainer } = this.props
    return (
      <View style={[styles.avatarContainer, avatarContainer]}>
        {/*
          (this.state.loading) &&
          <ActivityIndicator
            size="small"
            animating
            color="#000"
          />
    */  }
        {
         
            (profileImage == '' || profileImage == undefined) ?
            <Image source={usericon} style={[styles.image, AvatarIconStyle]} onLoadEnd={() => this.setState({ loading: false })} />
            :
            <Image source={{ uri: `${profileImage}` }} style={[styles.image, AvatarIconStyle]} onLoadEnd={() => { this.setState({ loading: false }) }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: '100%',
    borderRadius: 150,
  }
})

//source={{ uri: `${profileImage}` }}