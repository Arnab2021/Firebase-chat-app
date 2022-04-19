import validator from '../../services/validation'
import { showError, showSuccess } from '../../services/showMessages'
import { saveUsernameAction, saveProfileImageAction, saveGalleryImageAction, saveDescriptionAction, saveLocationAction, saveBioAction, savePhonenumberAction,deleteGalleryImageAction } from '../actions/SaveProfileInfoAction';
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { getData, storeData } from '../../services/localStorage';

const firebaseCollectionName = "usersInfo"

const _checkUserExistInFirebase = async () => {
    const user_id = await getData('user_id')

    const response = await firestore().collection(firebaseCollectionName).where("user_id", '==', user_id).get().then((querySnapshot) => {
        if (querySnapshot.docs.length == 0) {
            return false
        } else {
            return true
        }
    })
    return response
}

const saveUsernameInFirebase = async (username) => {
    try {
        const user_id = await getData('user_id')
        const collection = {
            user_id: user_id,
            user_name: username,
        }
        const res = await firestore()
            .collection('usersInfo')
            .add(collection)
            .then(async (res) => {

                const documentID = res._documentPath._parts[1]
                await storeData("firebaseUserDocID", documentID)

                console.log("username saved in firebase");
                return true
            });
        return res
    } catch (error) {

        showError("User Info could not be saved! Error -" + error)
        return false
    }
}

const updateUsernameInFirebase = async (username) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            user_name: username
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("username updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("User Info could not be updated! Error -" + error)
        return false
    }
}

const updateDescriptionInFirebase = async (description) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            description: description
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("description updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("description could not be updated! Error -" + error)
        return false
    }
}

const updateLocationInFirebase = async (location) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            location: location
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("location updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("location could not be updated! Error -" + error)
        return false
    }
}

const updateBioInFirebase = async (bio) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            bio: bio
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("bio updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("bio could not be updated! Error -" + error)
        return false
    }
}

const updatePhonenumberInFirebase = async (number) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            number: number
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("number updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("number could not be updated! Error -" + error)
        return false
    }
}

const updateAvatarUrlInFirebase = async (imageUrl) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const collection = {
            avatar: imageUrl
        }
        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update(collection)
            .then(() => {
                console.log("Avatar updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("User Info could not be updated! Error -" + error)
        return false
    }
}

const updateUserGalleryInFirebase = async (imageUrls) => {
    try {
        const doc_id = await getData("firebaseUserDocID")

        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update({
                gallery: firebase.firestore.FieldValue.arrayUnion(...imageUrls),
            })
            .then(() => {
                console.log("Gallery updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("Gallery updated! Error -" + error)
        return false
    }
}

const deleteImageFromUserGalleryInFirebase = async (imageUrls) => {
   // console.log('deleteImageFromUserGalleryInFirebase', imageUrls);
    try {
        const user_id = await getData('user_id')
        const doc_id = await getData("firebaseUserDocID")

        const res = await firestore()
            .collection(firebaseCollectionName)
            .doc(doc_id)
            .update({
                gallery: imageUrls,
            })
            .then(() => {
                console.log("Gallery updated in firebase");
                return true
            });
        return res
    } catch (error) {
        showError("Gallery updated! Error -" + error)
        return false
    }
}

const upoadFile = async (image) => {
    //console.log('uploadfile', image);
    const uri = image.path
    const filename = image.path.replace(/^.*[\\\/]/, '')

    const task = storage()
        .ref(filename)
        .putFile(uri);

    const response = task.on('state_changed',
        snapshot => { },
        (error) => {
            console.log('image upload error', error);
            return false
        },
        async function success() {
            console.log('Image uploaded successfully!');
            return true
        }
    );

    try {
        await task;
        return true
    } catch (e) {
        showError('Image could not saved : ' + e)
        return false
    }
}

const _storeImageInFirebaseAndGetUrl = async (image) => {

    const filename = image.path.replace(/^.*[\\\/]/, '')

    let imageurl = ''
    if (image != null) {
        await upoadFile(image)
        imageurl = await storage().ref('/' + filename).getDownloadURL().then((url) => {
            return url
        });

        return imageurl
    } else {
        return ''
    }
}


const _storeMultiImagesInFirebaseAndGetUrl = async (images) => {

    let urls = []

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        let imageurl = ''
        const filename = image.path.replace(/^.*[\\\/]/, '')
        await upoadFile(image)
        imageurl = await storage().ref('/' + filename).getDownloadURL().then((url) => {
            return url
        });
        urls.push(imageurl)
    }

    return urls
}


const _deleteMultipleImages = async (images) => {
    try {
        const totalImages = images.length
        let imageDeleted = 0
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            var desertRef = storage().refFromURL(element.image);

            await desertRef.delete().then(() => {
                imageDeleted += 1
                console.log(imageDeleted + ' item deleted.');
            }).catch((err) => {
                showError(element.image + " counld not be deleted. " + err)
                console.log(element + ' ' + err);
            })
        }

        if (imageDeleted > 0) {            
            return imageDeleted + " images are deleted"
        } else {
            return false
        }
    } catch (error) {
        showError("error - " + error)
        return false
    }

}



/////////////////////  All handle Asyn functions ///////////////////////////////////////////////


const _onboardScreenDataAsync = (username, image) => async dispatch => {

    let imageurl = ''
    let saveUserResponse = false
    let saveAvatarResponse = false

    const validation = validator({
        fullname: username
    })

    if (validation === true) {
        if (image != null) {
            imageurl = await _storeImageInFirebaseAndGetUrl(image)
        }


        const userExists = await _checkUserExistInFirebase()
        if (!userExists) {
            saveUserResponse = await saveUsernameInFirebase(username)
            if (imageurl != '') {
                saveAvatarResponse = await updateAvatarUrlInFirebase(imageurl)
            }
        } else {
            saveUserResponse = await updateUsernameInFirebase(username)
            if (imageurl != '') {
                saveAvatarResponse = await updateAvatarUrlInFirebase(imageurl)
            }
        }

        if (saveUserResponse === true || saveAvatarResponse === true) {
            dispatch(saveUsernameAction(username))
            dispatch(saveProfileImageAction(imageurl))
            return true
        } else {
            return false
        }
    } else {
        showError(validation)
        return false
    }
}

const _handleUploadAvatarAsync = (image) => async dispatch => {
    let imageurl = ''
    let saveAvatarResponse = false

    if (image != null) {
        imageurl = await _storeImageInFirebaseAndGetUrl(image)
        saveAvatarResponse = await updateAvatarUrlInFirebase(imageurl)
    }

    if (saveAvatarResponse) {
        showSuccess("Image saved")
        dispatch(saveProfileImageAction(imageurl))
    } else {
        return false
    }
}

const _handleUploadGalleryImageAsync = (images) => async dispatch => {

    let allUrls;

    if (Array.isArray(images) === false) {
        images = [images]
    }

    allUrls = await _storeMultiImagesInFirebaseAndGetUrl(images)

    if (allUrls.length > 0) {
        await updateUserGalleryInFirebase(allUrls)
        showSuccess("Gallery saved")
        dispatch(saveGalleryImageAction(allUrls))
    }
}

const _handleUpdateUsernameAsync = (username) => async dispatch => {

    const validation = validator({
        fullname: username
    })

    if (validation === true) {
        const response = await updateUsernameInFirebase(username)
        if (response) {
            showSuccess("Username Updated!")
            dispatch(saveUsernameAction(username))
        }
    } else {
        showError(validation)
        return false
    }
}


const _handleUpdateDescriptionAsync = (description) => async dispatch => {

    const validation = validator({
        description: description
    })

    if (validation === true) {
        const response = await updateDescriptionInFirebase(description)
        if (response) {
            showSuccess("Description Updated!")
            dispatch(saveDescriptionAction(description))
        }
    } else {
        showError(validation)
        return false
    }
}

const _handleUpdateLocationAsync = (location) => async dispatch => {

    const validation = validator({
        location: location
    })

    if (validation === true) {
        const response = await updateLocationInFirebase(location)
        if (response) {
            showSuccess("Location Updated!")
            dispatch(saveLocationAction(location))
        }
    } else {
        showError(validation)
        return false
    }
}

const _handleUpdateBioAsync = (bio) => async dispatch => {

    const validation = validator({
        bio: bio
    })

    if (validation === true) {
        const response = await updateBioInFirebase(bio)
        if (response) {
            showSuccess("Bio Updated!")
            dispatch(saveBioAction(bio))
        }
    } else {
        showError(validation)
        return false
    }
}

const _handleUpdatePhonenumberAsync = (number) => async dispatch => {

    const validation = validator({
        phonenumber: number
    })

    if (validation === true) {
        const response = await updatePhonenumberInFirebase(number)
        if (response) {
            showSuccess("Phone number Updated!")
            dispatch(savePhonenumberAction(number))
        }
    } else {
        showError(validation)
        return false
    }
}

const _handleDeleteGalleryImagesAsync = (images) => async dispatch => {
    
    let all_urls=[];
    
    const filter_to_delete = images.filter((item) => item.selected === true)  
    const filtered_images = images.filter((item) => item.selected === false)    

    filtered_images.map((item) => {       
        all_urls.push(item.image)
    })
  
    const response = await _deleteMultipleImages(filter_to_delete)
    //console.log('response', response);

    if (response !== false) {
        if (all_urls.length > 0) {
            await deleteImageFromUserGalleryInFirebase(all_urls)
            showSuccess(response)
            dispatch(deleteGalleryImageAction(filtered_images))
        }
    }
}


export { _onboardScreenDataAsync, _handleUploadAvatarAsync, _handleUploadGalleryImageAsync, _handleUpdateUsernameAsync, _handleUpdateDescriptionAsync, _handleUpdateLocationAsync, _handleUpdateBioAsync, _handleUpdatePhonenumberAsync, _handleDeleteGalleryImagesAsync }