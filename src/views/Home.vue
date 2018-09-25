<template>
  <Loader v-if="loading"/>
  <div
    v-else
    class="home">
    <Categories/>
    <router-view/>
  </div>
</template>

<script>
import Categories from '../components/Categories.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'Home',
  components: {
    Categories,
    Loader,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
  }
</style>
