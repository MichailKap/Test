<template>
  <div class="container">
    <div class="top-row">
      <ToggleData />
      <button
        type="button"
        class="top-row__add-btn btn"
        @click="SHOW_MODAL()"
      >
        Добавить
      </button>
      <ModalAddUser v-if="$store.state.modalAddUser" />
      <input
        type="text"
        class="top-row__search"
        placeholder="Поиск..."
        v-model="$store.state.search"
        @keydown="TO_FIRST_PAGE()"
      >
    </div>
    <table class="table" v-if="USERS.length && !LOADING">
      <thead>
        <th
          class="table__title-column"
          v-for="title in COLUMN_TITLES"
          :key="title.text"
          @click="sortBy(title.text)"
        >
          {{ title.text }}
          <i
            class="fas fa-arrow-up table__arrow-hidden"
            :class="{'table__arrow-up': title.text == TITLE_SORTED_COLUMN && countClicks == 1,
                     'table__arrow-down': title.text == TITLE_SORTED_COLUMN && countClicks == 2}"
          ></i>
        </th>
      </thead>
      <tbody>
        <tr
          class="table__row"
          v-for="(user, index) in USERS"
          :key="index"
          @click="selectRow(user)"
          :class="{ 'active-row' : selectedUser == user }"
        >
          <td class="table__cell">{{ user.id }}</td>
          <td class="table__cell">{{ user.firstName }}</td>
          <td class="table__cell">{{ user.lastName }}</td>
          <td class="table__cell">{{ user.email }}</td>
          <td class="table__cell">{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <p
      class="empty-table-text"
      v-if="!USERS.length && !LOADING"
    >
      Нет данных
    </p>
    <Pagination v-if="USERS.length && !LOADING" />
    <div
      class="selected-user"
      v-if="selectedUser != null && USERS.length && !LOADING"
    >
      <p class="selected-user__row">Выбран пользователь:
        <b>{{ selectedUser.firstName }}</b>
      </p>
      <p class="selected-user__row">Описание:<br>
        <textarea
          class="selected-user__description"
          v-model="selectedUser.description"
        ></textarea>
      </p>
      <p class="selected-user__row">Адрес проживания:
        <b>{{ selectedUser.address.streetAddress }}</b>
      </p>
      <p class="selected-user__row">Город:
        <b>{{ selectedUser.address.city }}</b>
      </p>
      <p class="selected-user__row">Провинция/штат:
        <b>{{ selectedUser.address.state }}</b>
      </p>
      <p class="selected-user__row">Индекс:
        <b>{{ selectedUser.address.zip }}</b>
      </p>
    </div>
  </div>
</template>

<script>
import ToggleData from './ToggleData.vue'
import ModalAddUser from './ModalAddUser.vue'
import Pagination from './Pagination.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Table',
  components: {
    ToggleData,
    ModalAddUser,
    Pagination
  },
  data() {
    return {
      countClicks: 0,
      selectedUser: null
    }
  },
  methods: {
    sortBy(nameColumn) {
      if (this.countClicks == 0 || nameColumn != this.TITLE_SORTED_COLUMN) {
        this.SORT_BY_INCREMENT(nameColumn)
        this.countClicks = 1
      }
      else if (this.countClicks == 1 && nameColumn == this.TITLE_SORTED_COLUMN) {
        this.SORT_BY_DECREMENT(nameColumn)
        this.countClicks++
      }
      else if (this.countClicks == 2 && nameColumn == this.TITLE_SORTED_COLUMN) {
        this.RESET_SORT(nameColumn)
        this.countClicks = 0
      }
    },
    selectRow(user) {
      if (this.selectedUser == user) this.selectedUser = null
      else this.selectedUser = user
    },
    ...mapActions([
      'SHOW_MODAL',
      'SORT_BY_INCREMENT',
      'SORT_BY_DECREMENT',
      'RESET_SORT',
      'TO_FIRST_PAGE'
    ])
  },
  computed: {
    ...mapGetters([
      'USERS',
      'LOADING',
      'COLUMN_TITLES',
      'TITLE_SORTED_COLUMN'
    ])
  }
}
</script>

<style lang="scss" scoped>
.top-row {
  display: flex;
  margin: 20px 0;
  &__add-btn {
    margin-left: auto;
    margin-right: 20px;
  }
  &__search {
    border: 1px solid #d8d8d8;
    padding-left: 10px;
    transition: all .2s linear;
    &:focus {
      border: 1px solid  #616161;
    }
  }
}
.table {
  border: 3px solid #d8d8d8;
  border-collapse: collapse;
  margin-bottom: 20px;
  &__title-column,
  &__cell {
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #d8d8d8;
    cursor: pointer;
    padding: 0 10px;
    &:nth-child(1) {
      width: 75px;
    }
    &:nth-child(2) {
      width: 155px;
    }
    &:nth-child(3) {
      width: 160px;
    }
    &:nth-child(4) {
      width: 270px;
    }
    &:nth-child(5) {
      width: 190px;
    }
  }
  &__title-column {
    background-color: #616161;
    color: #fff;
    padding: 20px 10px;
    text-align: left;
  }
  &__arrow-hidden {
    opacity: 0;
    transition: all .4s linear;
  }
  &__arrow-up {
    opacity: 1;
  }
  &__arrow-down {
    opacity: 1;
    transform: rotate(180deg);
  }
  &__row {}
  &__cell {
    background-color: #fff;
    height: 50px;
  }
}
.empty-table-text {
  font-size: 20px;
  margin-top: 30%;
  text-align: center;
}
.selected-user {
  border: 3px solid #d8d8d8;
  padding: 20px;
  width: 400px;
  &__row {
    margin-bottom: 5px;
  }
  &__description {
    max-height: 130px;
    max-width: 350px;
    min-height: 50px;
    width: 350px;
  }
}
.active-row {
  td {
    background-color:  #ebebeb;
  }
}
</style>