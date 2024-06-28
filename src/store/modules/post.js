import axios from 'axios'

export default ({
    state : {
        posts : {},
    },
    getters : {
       getAllposts (state){
            return state.posts
       },
      
    },
    mutations : {
        setAllPost(state , data){
            state.posts = data
        },
       
    },
    actions : {
        async fetchAllPost ({commit}){
            let res = await axios.get('post');
            commit('setAllPost' , res.data.data)
        },
        async filterByCate ({commit} , name){
            let res = await axios.get(`post/?category=${name}`);
            commit('setAllPost' , res.data.data)
        },
        async searchPosts ({commit} , key){
            let res = await axios.get(`post/?&searchKey=${key}`);
            commit('setAllPost' , res.data.data)
        }
    },
});
