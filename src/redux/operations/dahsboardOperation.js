import firestore, { firebase } from '@react-native-firebase/firestore';
import { showError, showSuccess } from '../../services/showMessages'
import { getData, storeData } from '../../services/localStorage';
import { StoreUsersListAction } from '../actions/DashboardAction';

const _getUsersListAsync = () => async dispatch => {

    const data = await firestore().collection("usersInfo").get().then((querysnap) => {
        let list = []
        querysnap.docs.map((item) => {
            //console.log(item.data());
            list.push(item.data())
        })
        return list
    })
    console.log(data);
    dispatch(StoreUsersListAction(data))
}

export {_getUsersListAsync}