import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    copyUsers: [],
    loading: false,
    modalAddUser: false,
    currentPage: 0,
    perPage: 8,
    pageRange: 4,
    data: 'few',
    search: '',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    titleSortedColumn: '',
    columnTitles: [
      { text: "id" },
      { text: "firstName" },
      { text: "lastName" },
      { text: "email" },
      { text: "phone" }
    ],
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.currentPage = 0
      state.users = users
      //  Независимая копия массива для дальнейшего сброса сортировки
      state.copyUsers = state.users.map(item => ({...item}))
    },
    SHOW_MODAL: (state) => {
      state.modalAddUser = true
    },
    CLOSE_MODAL: (state) => {
      state.modalAddUser = false
    },
    ADD_USER: (state) => {
      state.users.unshift({
        id: state.id,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone
      })
      state.id = '',
      state.firstName = '',
      state.lastName = '',
      state.email = '',
      state.phone = ''
    },

    //  Пагинация
    PREV_PAGE: (state) => {
      state.currentPage--
    },
    NEXT_PAGE: (state) => {
      state.currentPage++
    },
    SET_CURRENT_PAGE: (state, page) => {
      state.currentPage = page
    },
    TO_FIRST_PAGE: (state) => {
      state.currentPage = 0
    },
    TO_LAST_PAGE: (state, TOTAL_PAGES) => {
      state.currentPage = TOTAL_PAGES-1
    },

    //  Сортировка
    SORT_BY_INCREMENT: (state, nameColumn) => {
      if (nameColumn == "id") state.users.sort((a,b) => a[nameColumn] - b[nameColumn])
      else state.users.sort((a,b) => a[nameColumn].localeCompare(b[nameColumn]))
      state.titleSortedColumn = nameColumn
    },
    SORT_BY_DECREMENT: (state, nameColumn) => {
      if (nameColumn == "id") state.users.sort((a,b) => b[nameColumn] - a[nameColumn])
      else state.users.sort((a,b) => b[nameColumn].localeCompare(a[nameColumn]))
      state.titleSortedColumn = nameColumn
    },
    RESET_SORT: (state, nameColumn) => {
      state.users = state.copyUsers.map(item => ({...item}))
      state.titleSortedColumn = nameColumn
    }
  },
  actions: {
    GET_FEW_USERS({ commit, state }) {
      state.loading = true
      axios('http://localhost:3000/fewData', { method:'GET' })
        .then((response) => { commit('SET_USERS', response.data) })
        .catch(error => console.log(error))
        .finally(() => (state.loading = false))
    },
    GET_MANY_USERS({ commit, state }) {
      state.loading = true
      axios('http://localhost:3000/manyData', { method:'GET' })
        .then((response) => { commit('SET_USERS', response.data) })
        .catch(error => console.log(error))
        .finally(() => (state.loading = false))
    },
    SHOW_MODAL({ commit }) {
      commit('SHOW_MODAL')
    },
    CLOSE_MODAL({ commit }) {
      commit('CLOSE_MODAL')
    },
    ADD_USER({commit}) {
      commit('ADD_USER')
    },

    //  Пагинация
    PREV_PAGE({ commit }) {
      commit('PREV_PAGE')
    },
    NEXT_PAGE({ commit }) {
      commit('NEXT_PAGE')
    },
    SET_CURRENT_PAGE({ commit }, page) {
      commit('SET_CURRENT_PAGE', page)
    },
    TO_FIRST_PAGE({ commit }) {
      commit('TO_FIRST_PAGE')
    },
    TO_LAST_PAGE({ commit }, TOTAL_PAGES) {
      commit('TO_LAST_PAGE', TOTAL_PAGES)
    },
    
    //  Сортировка
    SORT_BY_INCREMENT({ commit }, nameColumn) {
      commit('SORT_BY_INCREMENT', nameColumn)
    },
    SORT_BY_DECREMENT({ commit }, nameColumn) {
      commit('SORT_BY_DECREMENT', nameColumn)
    },
    RESET_SORT({ commit }, nameColumn) {
      commit('RESET_SORT', nameColumn)
    }
  },
  getters: {
    SEARCH: (state) => state.search,
    LOADING: (state) => state.loading,
    COLUMN_TITLES: (state) => state.columnTitles,
    TITLE_SORTED_COLUMN: (state) => state.titleSortedColumn,
    CURRENT_PAGE: (state) => state.currentPage,
    ID: (state) => state.id,
    FIRST_NAME: (state) => state.firstName,
    LAST_NAME: (state) => state.lastName,
    EMAIL: (state) => state.email,
    PHONE: (state) => state.phone,
    
    //  Фильтрация по строке поиска
    FILTER_USERS: (state) => {
      let filteredArray = []

      state.users.forEach(user => {
        let userValues =  Object.values(user)

        //  Удаляем значения description и address
        userValues = userValues.slice(0, userValues.length - 2)
        let str = userValues.reduce((a, b) => a.toString() + b.toString())
        if (str.includes(state.search)) {
          filteredArray.push(user)
        }
      })
      return filteredArray
    },
    //  Общее количество страниц
    TOTAL_PAGES: (state, getters) => {
      return Math.ceil(getters.FILTER_USERS.length / state.perPage)
    },
    //  Начало диапазона страниц
    RANGE_START: (state) => {
      let start = state.currentPage - state.pageRange
      return (start > 0) ? start : 0
    },
    //  Конец диапазона страниц
    RANGE_END: (state, getters) => {
      let end = state.currentPage + state.pageRange
      return (end < getters.TOTAL_PAGES) ? end : getters.TOTAL_PAGES - 1
    },
    //  Номера страниц
    PAGES: (state, getters) => {
      let pages = []
      for(let i = getters.RANGE_START; i <= getters.RANGE_END; i++) {
        pages.push(i)
      }
      return pages
    },
    //  Итоговый вывод - то, какую часть массива нужно показывать на странице
    USERS: (state, getters) => {
      let start = state.currentPage * state.perPage,
            end = start + state.perPage
      return getters.FILTER_USERS.slice(start, end)
    }
  }
})