<template>
  <div
    class="jokes">
    <button
      type="button"
      class="selected-category"
      @click="showCategories">
      {{ selectedCategory }}
    </button>
    <Loader v-if="loading"/>
    <div
      v-for="joke in jokes"
      v-else
      :key="joke.id"
      class="card">
      {{ joke.value }}
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';

const NEEDED_AMOUNT_OF_JOKES = 3;
const MAX_ATTEMPTS = 10;

export default {
  name: 'Jokes',
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    selectedCategory() {
      return this.$route.params.category;
    },
    jokes() {
      return this.$store.getters.jokesByCategory(this.selectedCategory);
    },
  },
  watch: {
    $route: 'fetchUniqueJokes',
  },
  created() {
    this.fetchUniqueJokes();
  },
  methods: {
    fetchUniqueJokes() {
      if (!this.$store.state.categories.includes(this.selectedCategory)) {
        this.$router.push({ name: 'home' });
        return;
      }

      if (this.$store.getters.jokesByCategory(this.selectedCategory).length) {
        return;
      }

      this.loading = true;
      this.$store.dispatch('fetchUniqueJokes', {
        category: this.selectedCategory,
        neededAmount: NEEDED_AMOUNT_OF_JOKES,
        attempts: MAX_ATTEMPTS,
      }).then(() => {
        this.loading = false;
      });
    },
    showCategories() {
      this.$store.commit('showCategories');
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  .jokes {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;

    .selected-category {
      display: flex;
      padding: 15px;
      color: white;
      text-transform: uppercase;
      font-weight: 700;
      background-color: $primary;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color .3s ease-in-out;

      &:hover {
        background-color: darken($primary, 20%);
      }
    }

    .card {
      max-width: 600px;
      width: 100%;
      margin: 10px;
      padding: 20px;
      background-color: white;
      border-radius: 2px;
      box-shadow:
        0 3px 1px -2px rgba(0,0,0,.2),
        0 2px 2px 0 rgba(0,0,0,.14),
        0 1px 5px 0 rgba(0,0,0,.12);
    }
  }
</style>
