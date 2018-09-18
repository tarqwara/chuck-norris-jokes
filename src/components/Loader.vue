<template>
  <div
    v-show="delayExceeded"
    class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
const DELAY_MS = 500;

export default {
  name: 'Loader',
  data() {
    return {
      delayExceeded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.delayExceeded = true;
    }, DELAY_MS);
  },
  destroyed() {
    this.delayExceeded = false;
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  $size: 20px;
  $padding: 6px;
  $columns: 3;
  $containerSize: ($size * $columns) + ($padding * ($columns - 1));
  $duration: 1.2s;
  $delay: 0.12s;

  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: $containerSize;
    height: $containerSize;

    div {
      position: absolute;
      width: $size;
      background: $primary;
      animation: loading $duration cubic-bezier(0, 0.5, 0.5, 1) infinite;

      @for $i from 1 through $columns {
        &:nth-child(#{$i}) {
          left: ($size + $padding) * ($i - 1);
          animation-delay: -($delay * ($columns - $i));
        }
      }

      @keyframes loading {
        0% {
          top: 0;
          height: $containerSize;
        }
        50%, 100% {
          top: $size;
          height: $containerSize / 2;
        }
      }
    }
  }
</style>
