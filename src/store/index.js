import { createStore } from 'vuex'
import auth from './modules/auth'
import category from './modules/category';
import post from './modules/post';

export default createStore({
    modules: { 
        category , 
        auth ,
        post
    }
});
