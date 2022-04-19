import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const gridWidth = deviceWidth / 3

const GalleryModal = ({ isOpenModal, images, onClose, onPressDeleteImages }) => {

    const [allImages, setImages] = useState([])
    const [selectAllPressed, setSelectAllPressed] = useState(false)
     
    useEffect(() => {
        setImages(images)
    }, [images])

    const totalImageSelected = () => {
        const filter_total_selected_images = allImages.filter((item) => item.selected === true)       
        if(filter_total_selected_images.length > 0){
            return true
        }else{
            return false
        }
    }

    const selectImage = (index) => {
        const copyImages = [...allImages]
        copyImages[index].selected = !copyImages[index].selected
        setImages(copyImages)
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.grid} onPress={() => selectImage(index)} activeOpacity={1} >
                <Image
                    style={[styles.imageThumbnail, (item.selected) && { opacity: 0.5 }]}
                    source={{ uri: item.image }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        )
    }

    const selectAllimages = () => {
        const copyImages = allImages.map((item) => {
            return {
                image: item.image,
                selected: true
            }
        })
        setImages(copyImages)
        setSelectAllPressed(true) 
    }

    const deSelectimages = () => {
        const copyImages = allImages.map((item) => {
            return {
                image: item.image,
                selected: false
            }
        })
        setImages(copyImages)
        setSelectAllPressed(false) 
    }

    return (
        <Modal
            isVisible={isOpenModal}
            style={styles.modal}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={onClose} style={styles.padding10}>
                            <Entypo name='cross' size={30} color="#000" />
                        </TouchableOpacity>
                        <View style={[styles.row, { flex: 1, justifyContent: 'flex-end' }]}>
                            { 
                                (totalImageSelected()) &&
                                <>
                                    <TouchableOpacity style={styles.padding10} onPress={ (selectAllPressed)? deSelectimages : selectAllimages}>
                                        <MaterialCommunityIcons name={(selectAllPressed) ? 'select-off' : 'select-all'} size={30} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.padding10} onPress={() => onPressDeleteImages(images)}>
                                        <MaterialCommunityIcons name='delete' size={30} color="#000" />
                                    </TouchableOpacity>
                                </>
                            }

                        </View>
                    </View>
                </View>

                <FlatList
                    data={allImages}
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ flexGrow: 1, }}
                />

            </View>
        </Modal>
    );
}

export default GalleryModal

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        //padding: 10,
    },
    padding10: {
        padding: 10,
    },
    row: {
        flexDirection: 'row'
    },
    grid: {
        width: gridWidth - 1,
        height: gridWidth - 1,
        flexDirection: 'column',
        margin: 1
    },
    imageThumbnail: {
        flex: 1,
    },
})
