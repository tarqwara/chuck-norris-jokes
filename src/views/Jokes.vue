<template>
  <div
    v-if="selectedCategory"
    class="jokes">
    <button
      type="button"
      class="selected-category"
      @click="showCategories">
      <Category :category="selectedCategory"/>
    </button>
    <Loader v-if="loading"/>
    <div
      v-for="joke in jokes"
      v-else
      :key="joke.id"
      class="joke">
      <span class="text">
        {{ joke.value }}
      </span>
      <fa-icon
        :icon="['fas', 'heart']"
        :class="{favorited: joke.favorited}"
        size="lg"
        @click="toggleFavorite(joke)"
      />
    </div>
  </div>
</template>

<script>
import Category from '../components/Category.vue';
import Loader from '../components/Loader.vue';

const NEEDED_AMOUNT_OF_JOKES = 3;
const MAX_ATTEMPTS = 10;

export default {
  name: 'Jokes',
  components: {
    Category,
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
    toggleFavorite(joke) {
      joke.favorited = !joke.favorited;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';
  @import '../styles/zindex';

  %borderRadius {
    border-radius: 10px;
  }

  .jokes {
    z-index: $jokesZindex;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;

    .selected-category {
      padding: 0;
      cursor: pointer;
      border: none;
      @extend %borderRadius;

      .category {
        @extend %borderRadius;
      }
    }

    .joke {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 600px;
      width: 100%;
      margin: 10px;
      padding: 20px;
      background-color: white;
      @extend %borderRadius;
      box-shadow:
        0 3px 1px -2px rgba(0,0,0,.2),
        0 2px 2px 0 rgba(0,0,0,.14),
        0 1px 5px 0 rgba(0,0,0,.12);

      .fa-heart {
        $base-color: red;

        margin-left: 10px;
        color: lighten($base-color, 40%);
        transition: color .3s ease-in-out;

        &.favorited {
          color: $base-color;
        }

        &:hover {
          cursor: pointer;
          color: lighten($base-color, 20%);
        }
      }
    }
  }
</style>
