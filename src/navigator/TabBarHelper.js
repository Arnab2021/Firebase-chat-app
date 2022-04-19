

export default class TabBarHelper{

    static getTabIconName(routeName){
        if(routeName == 'chat'){
            return 'chat'
        }
        if(routeName == 'profile'){
            return 'user'
        }
        if(routeName == 'callhistory'){
            return 'call'
        }
    }

    static getTabName(routeName){
     
        if(routeName == 'chat'){
            return 'Chats'
        }
        if(routeName == 'profile'){
            return 'Profile'
        }
        if(routeName == 'callhistory'){
            return 'Calls'
        }
    }
}