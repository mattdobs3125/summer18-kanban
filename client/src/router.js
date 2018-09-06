import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Boards from './views/Boards.vue'
// @ts-ignore
import Board from './views/Board.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import List from './components/List.vue'
// @ts-ignore
import Task from './components/Task.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'boards',
      component: Boards
    },
    {
      path: '/board/:boardId',
      name: 'board',
      props: true,
      component: Board
    }, {
      path: '/list/:listId',
      name: 'list',
      props: true,
      component: List
    }, {
      path: '/task/:taskId',
      name: 'task',
      props: true,
      component: Task
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})