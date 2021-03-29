<template>
  <div class="shadow">
    <div class="modal">
      <button
        type="button"
        class="modal__close-btn"
        @click="CLOSE_MODAL()"
      >
        <i class="fas fa-times icon"></i>
      </button>
      <div class="modal__inputs">
        <div class="modal__input-wrapper">
          <input
            type="number"
            class="modal__input"
            max="9999"
            min="0"
            v-model="$store.state.id"
            :class="{'error': !validateId && ID,
                     'passed': validateId}"
          >
          <p class="modal__prompt-text">Идентификатор</p>
        </div>
        <div class="modal__input-wrapper">
          <input
            type="text"
            class="modal__input"
            maxlength="40"
            v-model="$store.state.firstName"
            :class="{'error': !validateFirstName && FIRST_NAME.length,
                     'passed': validateFirstName}"
          >
          <p class="modal__prompt-text">Имя</p>
        </div>
        <div class="modal__input-wrapper">
          <input
            type="text"
            class="modal__input"
            maxlength="40"
            v-model="$store.state.lastName"
            :class="{'error': !validateLastName && LAST_NAME.length,
                     'passed': validateLastName}"
          >
          <p class="modal__prompt-text">Фамилия</p>
        </div>
        <div class="modal__input-wrapper">
          <input
            type="text"
            class="modal__input"
            maxlength="40"
            v-model="$store.state.email"
            :class="{'error': !validateEmail && EMAIL,
                     'passed': validateEmail}"
          >
          <p class="modal__prompt-text">Email</p>
        </div>
        <div class="modal__input-wrapper">
          <input
            type="tel"
            class="modal__input"
            v-model="$store.state.phone"
            autocomplete="tel"
            maxlength="13"
            v-phoneMask
            :class="{'error': !validatePhone && PHONE,
                     'passed': validatePhone}"
          >
          <p class="modal__prompt-text">Номер телефона</p>
        </div>
        <button
          type="button"
          class="modal__add-btn disabled-btn"
          @click="ADD_USER()"
          :class="{'active-btn': allPassed}"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalAddUser',
  methods: {
    ...mapActions([
      'CLOSE_MODAL',
      'ADD_USER'
    ])
  },
  computed: {
    validateId() {
      return this.ID > 0 && this.ID < 10000 && this.USERS.every(user => user.id.toString() != this.ID)
    },
    validateFirstName() {
      return this.FIRST_NAME.length > 3
    },
    validateLastName() {
      return this.LAST_NAME.length > 3
    },
    validateEmail() {
      const email = /\S+@\S+\.[a-zA-Z]/
      return email.test(String(this.EMAIL).toLowerCase())
    },
    validatePhone() {
      const phone = /(\d{0,3})(\d{0,3})-(\d{4})/
      return phone.test(String(this.PHONE).toLowerCase())
    },
    allPassed() {
      return this.validateId && this.validateFirstName &&
             this.validateLastName && this.validateEmail && this.validatePhone
    },
    ...mapGetters([
      'USERS',
      'ID',
      'FIRST_NAME',
      'LAST_NAME',
      'EMAIL',
      'PHONE'
    ])
  },
  directives: {
    phoneMask: {
      bind(el) {  
        el.oninput = function() {
          const x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
          this.value = !x[2] ? x[1] : '(' + x[1] + ')' + x[2] + (x[3] ? '-' + x[3] : '')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow,
.modal {
  margin: auto;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
}
.shadow {
  background-color: rgba(0, 0, 0, .5);
}
.modal {
  background-color: #fff;
  border: 3px solid #d8d8d8;
  height: 400px;
  width: 600px;
  &__close-btn {
    background: none;
    position: absolute;
    top: 30px; right: 30px;
    .icon {
      color: #616161;
      cursor: pointer;
      font-size: 20px;
      transition: all .3s linear;
      &:hover {
        color: $accent;
      }
    }
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    margin: 30px 40px;
  }
  &__input-wrapper {
    align-items: center;
    display: flex;
    margin-bottom: 15px;
  }
  &__input {
    border: 1px solid #d8d8d8;
    height: 40px;
    margin-right: 10px;
    padding-left: 10px;
    transition: all .2s linear;
    width: 300px;
    &:focus {
      border: 1px solid #616161;
    }
  }
  &__prompt-text {
    color: #616161;
    text-align: left;
    margin-bottom: 3px;
    width: 400px;
  }
  &__add-btn {
    margin-top: 15px;
    width: 150px;
  }
}
.error {
  border: 1px solid $accent;
  &:focus {
    border: 1px solid $accent;
  }
}
.passed {
  border: 1px solid $primary;
  &:focus {
    border: 1px solid $primary;
  }
}
.active-btn {
  color: #fff;
  cursor: pointer;
  background-color: $primary;
  padding: 12px 24px;
  pointer-events: all;
  transition: all .3s linear;
  &:hover {
    background-color: $dark-primary; 
  }
}
</style>