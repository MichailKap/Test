<template>
  <div class="pagination">
    <button
      type="button"
      class="pagination__prev-btn btn"
      :class="{'disabled-btn': !CURRENT_PAGE}"
      @click="PREV_PAGE()"
    >
      <i class="fas fa-arrow-left"></i>
    </button>
    <ul class="pagination__pages">
      <li
        class="pagination__page"
        @click="TO_FIRST_PAGE()"
        :class="{'disabled-page': CURRENT_PAGE < 6}"
      >
        ...
      </li>
      <li
        class="pagination__page"
        v-for="page in PAGES"
        :key="page"
        @click="SET_CURRENT_PAGE(page)"
        :class="{'active-page': CURRENT_PAGE === page}"
      >
        {{ page + 1 }}
      </li>
      <li
        class="pagination__page"
        @click="TO_LAST_PAGE(TOTAL_PAGES)"
        :class="{'disabled-page': CURRENT_PAGE > TOTAL_PAGES - 7}"
      >
        ...
      </li>
    </ul>
    <button
      type="button"
      class="pagination__next-btn btn"
      @click="NEXT_PAGE()"
      :class="{'disabled-btn': CURRENT_PAGE >= TOTAL_PAGES-1}"
    >
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  methods: {
    ...mapActions([
      'PREV_PAGE',
      'NEXT_PAGE',
      'SET_CURRENT_PAGE',
      'TO_FIRST_PAGE',
      'TO_LAST_PAGE'
    ])
  },
  computed: {
    ...mapGetters([
      'PAGES',
      'TOTAL_PAGES',
      'CURRENT_PAGE'
    ])
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  &__prev-btn,
  &__next-btn {
    padding: 10px 15px;
  }
  &__pages {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  &__page {
    background-color: #fff;
    border: 1px solid $primary;
    color: $primary;
    cursor: pointer;
    margin: 0 5px;
    padding: 4px 8px;
    transition: all .3s linear;
    &:hover {
      color: #fff;
      background-color: $primary;
    }
  }
}
.active-page {
  background-color: $primary;
  color: #fff;
  transition: all .3s linear;
  &:hover {
    background-color: $primary;
  }
}
.disabled-page {
  background-color: #e4e4e4;
  border: 1px solid #e4e4e4;
  color: #b4b4b4;
  pointer-events: none;
}
</style>