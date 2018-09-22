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
      <Category :category="category"/>
    </router-link>
  </div>
</template>

<script>
import Category from '../components/Category.vue';

export default {
  name: 'Categories',
  components: {
    Category,
  },
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
  @import '../styles/zindex';

  .categories {
    z-index: $categoriesZindex;
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 0;
      flex-grow: 1;

      .category {
        width: 100%;
        height: 100%;
      }

      &.active {
        .category {
          background-color: darken($primary, 10%);
        }
      }
    }
  }
</style>
