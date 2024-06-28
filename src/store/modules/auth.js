import axios from "axios";

export default ({
    state : {
        token : null ,
        user : null,
        errors :{},
        invalid : '',
        profilePosts : null
    },
    getters : {
        errors (state){
            return state.errors
        },
        userProfile(state){
            return state.user
        },
        getProfilePosts (state){
            return state.profilePosts
        },
        getInvalid(state){
            return state.invalid
        }
    },
    mutations : {
        SET_TOKEN (state ,token){
            state.token =token
        },
        SET_ERROR (state , errors){
            state.errors = errors
        },
        SET_INVALIS(state ,e ){
            state.invalid = e
        },
        CLEAR_TOKEN(state){
            state.token = null
            state.user = null
            localStorage.clear()
            location.reload()
        },
        SET_USER(state ,userProfile){
            state.user = userProfile
            localStorage.setItem('user' ,JSON.stringify(userProfile))
        },
        setProfilePosts(state , data ){
            state.profilePosts = data
        }
    },
    actions : {
        async register ({commit}, credentials){
            try {
                let res = await axios.post('/register' , credentials);
                commit('SET_TOKEN' ,res.data.data.token)
                localStorage.setItem('token', res.data.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}` 
            } catch (e) {
                commit('SET_ERROR' ,e.response.data.errors);
                localStorage.removeItem('token');
            }
        },
        async login ({commit}, credentials){
            try {
                let res = await axios.post('/login' , credentials);
                commit('SET_TOKEN' ,res.data.data.token)
                localStorage.setItem('token', res.data.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}` 
            } catch (e) {
                console.log(e);
                commit('SET_ERROR' ,e.response.data.errors);
                commit('SET_INVALIS' ,e.response.data.message);
                localStorage.removeItem('token');
            }

        },
        async logout ({commit}){
                let res = await axios.post('/logout');
                commit('CLEAR_TOKEN')
        },
        async profile ({commit}){
                let res = await axios.get('/profile');
                commit('SET_USER' ,res.data.data)
        },
        async fetchProfilePosts ({commit}){
            let res = await axios.get('/profile/posts');
            commit('setProfilePosts' ,res.data.data)
    },
    },
});

