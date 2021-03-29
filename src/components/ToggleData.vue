<template>
<div class="toggle">
  <div class="toggle__radio-btn">
    <input
      type="radio"
      id="few"
      value="few"
      v-model="$store.state.data"
      @change="GET_FEW_USERS()"
    >
    <label for="few">Мало данных</label>
  </div>
  <div class="toggle__radio-btn">
    <input
      type="radio"
      id="many"
      value="many"
      v-model="$store.state.data"
      @change="GET_MANY_USERS()"
    >
    <label for="many">Много данных</label>
  </div>
</div>
  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Toggle',
  methods: {
    ...mapActions([
      'GET_FEW_USERS',
      'GET_MANY_USERS'
    ])
  },
  mounted() {
    this.GET_FEW_USERS()
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  display: flex;
  &__radio-btn {
    input[type=radio] {
      display: none;
    }
    input[type=radio] + label {
      border: 1px solid $accent;
      color: $accent;
      cursor: pointer;
      background-color: #fff;
      display: block;
      padding: 12px 25px;
      transition: all .3s linear;
      &:hover {
        background-color: $accent;
        color: #fff; 
      }
    }
    input[type=radio]:checked + label {
      background-color: $accent;
      border: 1px solid $accent;
      color: #fff;
    }
  }
}
</style>