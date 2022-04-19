import type from "../type";

const saveUsernameAction = (username) => {
    return{
        type: type.SAVE_USERNAME,
        payload: username
    }
}

const saveEmailAction = (email) => {
    return{
        type: type.SAVE_USER_EMAIL,
        payload: email
    }
}

const saveProfileImageAction = (imageurl) => {
    return{
        type: type.SAVE_PROFILE_IMAGE,
        payload: imageurl
    }
}

const saveGalleryImageAction = (images) => {
    return{
        type: type.SAVE_GALLERY_IMAGE,
        payload: images
    }
}

const deleteGalleryImageAction = (images) => {
    return{
        type: type.DELETE_GALLERY_IMAGE,
        payload: images
    }
}

const saveDescriptionAction = (description => {
    return{
        type: type.SAVE_USER_DESCRIPTION,
        payload: description
    }
})

const saveLocationAction = (location => {
    return{
        type: type.SAVE_USER_LOCATION,
        payload: location
    }
})

const saveBioAction = (bio => {
   
    return{
        type: type.SAVE_BIO,
        payload: bio
    }
})

const savePhonenumberAction = (phone => {
    return{
        type: type.SAVE_PHONE_NUMBER,
        payload: phone
    }
})

export {saveUsernameAction, saveProfileImageAction, saveEmailAction, saveGalleryImageAction, saveDescriptionAction, saveLocationAction, saveBioAction, savePhonenumberAction, deleteGalleryImageAction}