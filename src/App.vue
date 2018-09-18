<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './styles/variables';
  @import './styles/mixins';

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    height: 100vh;
    body {
      min-height: 100vh;
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
      font-family: 'Titillium Web', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: $primary-text;
      @include fluid-type(font-size, 320px, 1366px, 14px, 20px);

      a {
        text-decoration: none;
        color: $primary-text;
      }

      button {
        color: $primary-text;
        @include fluid-type(font-size, 320px, 1366px, 14px, 20px);
      }
    }
  }
</style>
