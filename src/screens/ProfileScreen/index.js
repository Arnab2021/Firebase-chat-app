import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { SheetManager } from 'react-native-actions-sheet';

import { ProfilePictureView, PersonnelInformationView, Gallery, AboutContainer, BottomModalForm, BottomActionSheet, GalleryModal } from '../../components';

import { _handleUploadAvatarAsync, _handleUploadGalleryImageAsync, _handleUpdateUsernameAsync, _handleUpdateDescriptionAsync, _handleUpdateLocationAsync, _handleUpdateBioAsync, _handleUpdatePhonenumberAsync, _handleDeleteGalleryImagesAsync } from '../../redux/operations/saveProfileInfoOperation';
import { showSuccess } from '../../services/showMessages';


const ProfileScreen = ({ userInfo, uploadAvatarImage, uploadGalleryImages, updateUsername, updateDescription, updateLocation, updateBio, updatePhonenumber, deleteGalleryImages }) => {

  const [shoulOpenBottomForm, setShoulOpenBottomForm] = useState(false)
  const [formData, setFormData] = useState({})
  const [selectMultiPhoto, setSelectMultiPhoto] = useState(false)

  const _handleUploadImage = (image) => {

    if (selectMultiPhoto) {
      // galery image upload
      console.log('gallery updating');
      uploadGalleryImages(image)

    } else {
      // avatar image upload
      console.log('avatar uploading');
      uploadAvatarImage(image)
    }
  }

  const _handleActionSheetFormData = (data) => {
    setFormData(data)
    setShoulOpenBottomForm(!shoulOpenBottomForm)
  }

  const _handleFormDataActions = (value) => {
    setShoulOpenBottomForm(!shoulOpenBottomForm)

    if (formData.key == 'username') {
      updateUsername(value)
    }
    if (formData.key == 'description') {
      updateDescription(value)
    }
    if (formData.key == 'location') {
      updateLocation(value)
    }
    if (formData.key == 'bio') {
      updateBio(value)
    }
    if (formData.key == 'phonenumber') {
      updatePhonenumber(value)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

        <ProfilePictureView
          userInfo={userInfo}
          onPressOpenSheet={() => {
            setSelectMultiPhoto(false);
            SheetManager.show("option_sheet")
          }}
        />
        <View style={styles.separator} />

        <Text style={styles.text}>Personnel Information</Text>
        <PersonnelInformationView
          userInfo={userInfo}
          setActionSheetFormData={(data) => _handleActionSheetFormData(data)}
        />
        <View style={styles.separator} />

        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={styles.text}>Gallery</Text>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectMultiPhoto(true); SheetManager.show("option_sheet") }}>
            <Text style={styles.text}>Manage </Text>
          </TouchableOpacity>
        </View>
        <Gallery
          userInfo={userInfo}
          onPressDeleteImages={(images) => deleteGalleryImages(images) }
        />
        <View style={styles.separator} />


        <Text style={styles.text}>About and phone number</Text>
        <AboutContainer
          userInfo={userInfo}
          setActionSheetFormData={(data) => _handleActionSheetFormData(data)}
        />


        <BottomModalForm
          isOpen={shoulOpenBottomForm}
          onClose={() => setShoulOpenBottomForm(!shoulOpenBottomForm)}
          formData={formData}
          _handleFormSubmission={(value) => _handleFormDataActions(value)}
        />
        <BottomActionSheet
          selectMultiPhoto={selectMultiPhoto}
          uploadImage={(image) => _handleUploadImage(image)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.SaveProfileInfoReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadAvatarImage: (image) => dispatch(_handleUploadAvatarAsync(image)),
    uploadGalleryImages: (images) => dispatch(_handleUploadGalleryImageAsync(images)),
    updateUsername: (username) => dispatch(_handleUpdateUsernameAsync(username)),
    updateDescription: (description) => dispatch(_handleUpdateDescriptionAsync(description)),
    updateLocation: (location) => dispatch(_handleUpdateLocationAsync(location)),
    updateBio: (bio) => dispatch(_handleUpdateBioAsync(bio)),
    updatePhonenumber: (number) => dispatch(_handleUpdatePhonenumberAsync(number)),

    deleteGalleryImages: (images) => dispatch(_handleDeleteGalleryImagesAsync(images))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
  text: {
    fontSize: hp('2%'),
    marginVertical: 8,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
  },
  separator: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.8
  }
})