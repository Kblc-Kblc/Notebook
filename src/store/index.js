import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'Обновленный'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, description, date, subtitle }) {
      const tasks = state.tasks.concat()

      const idx = tasks.findIndex(t => t.id === id);
      const task = tasks[idx]

      const status = new Date(date) > new Date() ? 'active' : 'Обновленный'

      tasks[idx] = { ...task, date, description, status, subtitle }

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = 'Завершенный'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
    },
    completeTask({ commit }, id) {
      commit('completeTask', id)
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  },
  modules: {
  }
})
