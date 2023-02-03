import { createStore } from "vuex";
import createPersistedState from  "vuex-persistedstate"
import SecureLS from "secure-ls";
var ls = new SecureLS({isCompression : false})
export default createStore({
    state : {
        user : null,
        saltKey : "app123123"

    },
    getters : {
        _isAuthenticated : state => state.user !== null,
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password;
            return user;
        },
        _getCurrentUserId : state => state?.user?.id ,
        _saltKey : state => state.saltKey,
        _userLikes : state => state.user?.likes || [],
        _userBookmarks : state => state.user?.bookmarks || [],
    },
    mutations : {
        setUser(state ,user){
            state.user = user
        },
        logoutUser(state){
            state.user = null
        },
        setLikes(state , likeId){
            state.user.likes = likeId
            console.log( typeof state.user.likes)
        }
    },
    plugins : [createPersistedState({
        storage : {
            getItem : key => ls.get(key),
            setItem : (key,value) => ls.set(key,value),
            removeItem : key => ls.remove(key)
        }
    })]
})