<script lang="ts">
  export let segment: string;
</script>

<style lang="scss">
  .link {
    @apply inline-flex;
    @apply items-center;
    @apply px-1;
    @apply pt-1;
    @apply border-b-2;
    @apply border-transparent;
    @apply text-sm;
    @apply font-medium;
    @apply leading-5;

    @apply text-gray-500;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;

    &:focus {
      @apply outline-none;
      @apply text-gray-700;
      @apply border-gray-300;
    }

    &:hover {
      @apply text-gray-700;
      @apply border-gray-300;
    }

    &:not(:first-child) {
      @apply ml-8;
    }

    &.active {
      @apply text-gray-900;
      @apply border-indigo-500;
      &:focus {
        @apply outline-none;
        @apply border-indigo-700;
      }
    }
  }
</style>

<div
  class="flex-1 flex items-center justify-center sm:items-stretch
    sm:justify-start">
  <div class="flex-shrink-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="60"
      class="block lg:hidden">
      <g>
        <title>relay-food.fun</title>
        <text
          xml:space="preserve"
          text-anchor="start"
          font-family="Junction, sans-serif"
          font-size="30"
          id="svg_1"
          y="40.00311"
          x="6.99219"
          stroke-width="0"
          stroke="#000"
          fill="#000000">
          r/f.🍐
        </text>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="220"
      height="60"
      class="hidden lg:block">
      <g>
        <title>relay-food.fun</title>
        <text
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          text-anchor="start"
          font-family="Junction, sans-serif"
          font-size="30"
          id="svg_1"
          y="39.59686"
          x="12.03125"
          stroke-width="0"
          stroke="#000"
          fill="#000000">
          relay-food.🍏
        </text>
      </g>
    </svg>
  </div>
  <div class="hidden sm:ml-6 sm:flex">
    <a href="/" class="link" class:active={segment === undefined}>Dashboard</a>
  </div>
</div>
