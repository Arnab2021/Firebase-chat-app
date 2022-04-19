import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {GalleryModal} from '.'
import colors from '../color'

const numOfPhotosToShow = 3
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const gridWidth = deviceWidth / 3


const Gallery = ({ userInfo, onPressDeleteImages }) => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [images, setImages] = useState(userInfo.user_image_gallery)
  const [totalImages, setTotalImages] = useState(userInfo.user_image_gallery.length)
  
  useEffect(() => {
    setImages( userInfo.user_image_gallery )
    setTotalImages(userInfo.user_image_gallery.length)
  }, [userInfo.user_image_gallery])
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {
          (totalImages > 0) &&
          images.map((item, index) => {
        
            const count = index + 1
            const remainingItem = totalImages - count
           
            if (totalImages > numOfPhotosToShow) {
            
              if (count < numOfPhotosToShow) {
                return (
                  <TouchableOpacity style={styles.imageCard} key={index} onPress={() => setOpenModal(!isOpenModal)}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </TouchableOpacity>
                )
              }
              else if (count == numOfPhotosToShow) {
                return (
                  <TouchableOpacity style={[styles.imageCard, { justifyContent: 'center' }]} key={index} onPress={() => setOpenModal(!isOpenModal)}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.remainingItemTextView}>
                      <Text style={{ textAlign: 'center', fontSize: hp('4%'), color: '#fff' }} adjustsFontSizeToFit numberOfLines={1}>+{remainingItem}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            } else {            
                return (
                  <TouchableOpacity style={styles.imageCard} key={index} onPress={() => setOpenModal(!isOpenModal)}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </TouchableOpacity>
                )
            }
          })
        }
        {
          (totalImages == 0)&&
          <View style={{paddingVertical: 10}}>
            <Text>
              No images to show
            </Text>
          </View>
        }     
      </View>

      <GalleryModal images={userInfo.user_image_gallery} isOpenModal={isOpenModal} onClose={() => { setOpenModal(false)}} onPressDeleteImages={onPressDeleteImages} />
    </View>
  );

}

export default Gallery

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  text: {
    fontSize: hp('')
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  imageCard: {
    width: gridWidth - 10,
    height: gridWidth,
    borderRadius: 10,
    backgroundColor: colors.colorGrey,
    marginHorizontal: 2
  },
  image: {
    flex: 1,
    borderRadius: 10
  },
  remainingItemTextView:{
    position: 'absolute',
    width: gridWidth - 10,
    height: gridWidth,
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  }
})
