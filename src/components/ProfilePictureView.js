import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { AvatarIcon } from '.'

export default class ProfilePictureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false
    }
    return true
  }

  render() {
    const { userInfo,onPressOpenSheet  } = this.props
    return (
      <View style={styles.profilePictureContainer}>
        <View style={styles.topEditIconContainer}>
          <TouchableOpacity onPress={onPressOpenSheet} >
            <MaterialCommunityIcons name="pencil" size={hp('4%')} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageView}>
          <AvatarIcon profileImage={userInfo.user_profile_image} />
        </View>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePictureContainer: {
    padding: 8,
    //height: hp('28%'),
    justifyContent: 'center',
  },
  topEditIconContainer: {
    alignItems: 'flex-end',
  },
  profileImageView: {
    alignItems: 'center'
  },
  AvatarIconStyle: {
    // width: hp('17%'),
    // height: hp('17%')
  },

})
