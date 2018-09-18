<template>
  <div
    :class="{open: categoriesVisible}"
    class="categories">
    <router-link
      v-for="category in categories"
      :key="category"
      :to="{ name: 'jokes', params: { category }}"
      active-class="active"
      @click.native="hideCategories()">
      {{ category }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  computed: {
    categories() {
      return this.$store.getters.sortedCategories;
    },
    categoriesVisible() {
      return this.$store.state.categoriesVisible;
    },
  },
  mounted() {
    if (!this.$route.params.category) {
      this.$store.commit('showCategories');
    }
  },
  methods: {
    hideCategories() {
      this.$store.commit('hideCategories');
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  .categories {
    display: flex;
    flex-direction: column;
    height : 100vh;
    position: absolute;
    left: 0;
    right: 0;
    top: -100%;
    transition: top .5s ease-in-out;

    &.open {
      top: 0;
    }

    a {
      background-color: $primary;
      color: white;
      text-transform: uppercase;
      font-weight: 700;
      transition: background-color .5s;
      display: flex;
      flex-basis: 0;
      flex-grow: 1;
      align-items: center;
      justify-content: center;

      &.active {
        background-color: darken($primary, 10%);
      }

      &:hover {
        background-color: darken($primary, 20%);
      }
    }
  }
</style>
