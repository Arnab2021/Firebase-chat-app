import type from '../type'

const initialState = {
    user_name: '',
    user_profile_image: '',
    user_description: '',
    user_location: '',
    user_email: '',
    user_image_gallery: [],
    bio: '',
    phone_number: ''
}

const SaveProfileInfoReducer = (state = initialState, action) => {

    switch (action.type) {
        case type.SAVE_USERNAME:
            return { ...state, user_name: action.payload }
        case type.SAVE_PROFILE_IMAGE:
            return { ...state, user_profile_image: action.payload }
        case type.SAVE_USER_DESCRIPTION:
            return { ...state, user_description: action.payload }
        case type.SAVE_USER_LOCATION:
            return { ...state, user_location: action.payload }
        case type.SAVE_USER_EMAIL:
            return { ...state, user_email: action.payload }
        case type.SAVE_GALLERY_IMAGE:
            const images = action.payload           
            if(images != undefined){
                const modifiedImages = images.map((item) => {
                    return {
                        image: item,
                        selected: false
                    }
                })
                const payload = [...state.user_image_gallery, ...modifiedImages]
                return { ...state, user_image_gallery: payload }
            }else{
                return {...state}
            }          
        case type.DELETE_GALLERY_IMAGE:
            console.log('DELETE_GALLERY_IMAGE',action.payload);
            return {...state, user_image_gallery: action.payload}    

        case type.SAVE_BIO:
            return { ...state, bio: action.payload }
        case type.SAVE_PHONE_NUMBER:
            return { ...state, phone_number: action.payload }

        default:
            return state
    }
}

export { SaveProfileInfoReducer }