import HomeView from '@/pages/HomeView.vue'
import SignIn from '@/pages/SignIn.vue'
import Register from '@/pages/Register.vue'
import PostDetails from '@/pages/PostDetails.vue'
import DashBoard from '../components/DashBoard.vue'

const routes = [
  { path : '/' ,redirect : '/home'}, 
  { path: '/home', component: HomeView ,name : 'homeview',meta: { auth: true }},
  { path: '/dashboard', component: DashBoard ,name : 'dashboard',meta: { auth: true }},
  { path: '/post/:postId/details', component: PostDetails ,name : 'postDetails',meta: { auth: true }},
  { path: '/login', component: SignIn , name : 'signin' },
  { path: '/register', component: Register , name : 'register' },
]

export default routes