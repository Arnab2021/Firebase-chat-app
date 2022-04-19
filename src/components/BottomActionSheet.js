import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';

const BottomActionSheet = ({ uploadImage, selectMultiPhoto }) => {


    const openCamera = () => {
        SheetManager.hide("option_sheet")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: (selectMultiPhoto)? false : true, 
        }).then(image => {            
            uploadImage(image)
        }, err => {
            console.log(err);
        });
    }

    const openGallery = () => {
        SheetManager.hide("option_sheet")

        ImagePicker.openPicker({
            multiple: selectMultiPhoto
        }).then(images => {
            uploadImage(images)
        }, err => {
            console.log(err);
        })

    }

    return (
        <ActionSheet id="option_sheet">
            <View style={{ padding: 10 }}>
                <TouchableOpacity style={{ paddingVertical: 15, }} onPress={() => openCamera()}>
                    <Text>Lanuch Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => openGallery()}>
                    <Text>Open Gallery</Text>
                </TouchableOpacity>
            </View>
        </ActionSheet>
    )
}

export default BottomActionSheet