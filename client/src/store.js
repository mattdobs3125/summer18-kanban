import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

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
      Vue.set(state.tasks, payload.listId, payload.tasks)
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
      api.get(`board/${boardId}/lists`)
        .then(res => {
          commit('addListsToState', res.data)
        })
    },
    addList({ commit, dispatch }, obj) {
      api.post('/lists', obj)
        .then(res => {
          commit('addList', res.data)

        })
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete(`lists/${listId}`)
        .then(res => {
          commit('deleteList', listId)
        })
    },
    //TASKS
    addTask({ commit, dispatch }, obj) {
      api.post('/tasks', obj)
        .then(() => {
          api.get(`/lists/${obj.listId}/tasks`)
            .then(res => {
              commit('addTasksToState', { listId: obj.listId, tasks: res.data })
            })
        })
    },
    getTasks({ commit, dispatch }, listId) {
      api.get(`/lists/${listId}/tasks`)
        .then(res => {
          commit('addTasksToState', { listId, tasks: res.data })
        })
    },
    deleteTask({ dispatch, commit }, obj) {
      api.delete(`/tasks/${obj.taskId}`)
        .then(() => {
          api.get(`/lists/${obj.listId}/tasks`)
            .then(res => {
              commit('addTasksToState', { listId: obj.listId, tasks: res.data })
            })
        })
    },
    changeList({ dispatch, commit }, obj) {
      api.put(`/tasks/${obj.taskId}`, obj)
        .then(() => {
          api.get(`/lists/${obj.listId}/tasks`)
            .then(res => {
              commit('addTasksToState', { listId: obj.listId, tasks: res.data })
            })
        })
        .then(() => {
          api.get(`/lists/${obj.oldList}/tasks`)
            .then(res => {
              commit('addTasksToState', { listId: obj.oldList, tasks: res.data })
            })
        })
    },
    //COMMENTS
    addComment({ dispatch, commit }, obj) {
      api.post('/comments', obj)
        .then(() => {
          api.get(`/tasks/${obj.taskId}/comments`)
            .then(res => {
              commit('addCommentsToState', { taskId: obj.taskId, comments: res.data })
            })
        })
    },
    getComments({ dispatch, commit }, taskId) {
      api.get(`/tasks/${taskId}/comments`)
        .then(res => {
          commit('addCommentsToState', { taskId, comments: res.data })
        })
    },
    deleteComment({ dispatch, commit }, obj) {
      api.delete(`/comments/${obj.commentId}`)
        .then(() => {
          api.get(`/tasks/${obj.taskId}/comments`)
            .then(res => {
              commit('addCommentsToState', { taskId: obj.taskId, comments: res.data })
            })
        })
    }
  }
})