import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { futimesSync } from 'fs';

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api",
  timeout: 3000,
  withCredentials: true
})

function createDictionary(arr) {
  let out = {}
  arr.forEach(item => {
    if (!out[item.listId]) {
      out[item.listId] = []
      out[item.listId].push(item)
    } else {
      out[item.listId].push(item)
    }

  })
  return out
}

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: {},
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    addList(state, list) {
      Vue.set(state.lists, list._id, list)
    },
    addListsToState(state, listArr) {
      let listObj = {}
      listArr.forEach(list => {
        listObj[list._id] = list
      });
      state.lists = listObj
    },
    deleteList(state, listId) {
      Vue.delete(state.lists, listId)
    },
    addTasksToState(state, payload) {
      state.tasks = createDictionary(payload)
    },
    addCommentsToState(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({commit, dispatch}){
      auth.delete('logout')
      .then(re=>{
        router.push({name:'login'})
      })
    },
    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //LISTS
    getLists({ commit, dispatch }, boardId) {
      api.get(`boards/${boardId}/list`)
        .then(res => {
          commit('addListsToState', res.data)
        })
    },
    addList({ commit, dispatch }, obj) {
      api.post('/list', obj)
        .then(res => {
          dispatch("getLists", obj.boardId)
        })
    },
    deleteList({ commit, dispatch, state }, list) {
      api.delete('list/' + list._id)
        .then(res => {
          dispatch("getLists", list.boardId)
        })
    },
    //TASKS
    addTask({ commit, dispatch }, obj) {
      api.post('/tasks', obj)
        .then(() => {
          dispatch("getTasks")
        })
    },
    getTasks({ commit, dispatch }) {
      api.get(`/tasks`)
        .then(res => {
          commit('addTasksToState', res.data)
        })
    },
    deleteTask({ dispatch, commit }, obj) {
      api.delete("tasks/" + obj.taskId)
        .then(res => {
          dispatch("getTasks")
        })
    },
    changeList({ dispatch, commit }, obj) {
      api.put(`/tasks/${obj.taskId}`, obj)
        .then(() => {
          api.get(`/lists/${obj.listId}`)
            .then(res => {
              commit('addTasksToState', res.data)
            })
        })
        .then(() => {
          api.get(`/lists/${obj.oldList}`)
            .then(res => {
              commit('addTasksToState', res.data)
            })
        })
    },
    //COMMENTS
    addComment({ state, dispatch, commit }, obj) {
      api.post('tasks/'+obj.taskId+'/comments',obj.description)
        .then(() => {
         dispatch('getTasks')
        })
    },
//     getComments({ dispatch, commit }, taskId) {
//       api.get(`/tasks/${taskId}/comments`)
//         .then(res => {
//           commit('addCommentsToState', { taskId, comments: res.data })
//         })
//     },
//     deleteComment({ dispatch, commit }, obj) {
//       api.delete(`/comments/${obj.commentId}`)
//         .then(() => {
//           api.get(`/tasks/${obj.taskId}/comments`)
//             .then(res => {
//               commit('addCommentsToState', { taskId: obj.taskId, comments: res.data })
//             })
//         })
//     }
//   }
// })