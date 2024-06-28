import axios from 'axios'

export default ({
    // namespced : true ,
    state : {
        categories : {}
    },
    getters : {
        getCategories(state){
            return state.categories
        }
    },
    mutations : {
        setCategory(state , data){
            state.categories = data
        }
    },
    actions : {
        async fetchCategory ({commit}){
                let res = await axios.get('/categories');
                commit('setCategory', res.data.data);
        }
    },
});
