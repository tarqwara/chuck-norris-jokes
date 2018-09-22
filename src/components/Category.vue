<template>
  <div class="category">
    <span>
      {{ category }}
    </span>
    <fa-layers
      v-if="favoriteJokesCount > 0"
      class="fa-fw">
      <fa-icon
        :icon="['fas', 'circle']"
        size="lg"
      />
      <fa-text
        :value="favoriteJokesCount"
        transform="shrink-5"
      />
    </fa-layers>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  computed: {
    favoriteJokesCount() {
      return this.$store.getters
        .jokesByCategory(this.category)
        .filter(joke => joke.favorited)
        .length;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';
  @import '../styles/zindex';

  .category {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
    background-color: $primary;
    transition: background-color .3s ease-in-out;

    &:hover {
      background-color: darken($primary, 20%);
    }

    .fa-layers {
      margin-left: 10px;

      .fa-circle {
        color: red;
      }

      .fa-circle {
        color: red;
      }

      .fa-layers-text {
        font-weight: 900;
      }
    }
  }
</style>
