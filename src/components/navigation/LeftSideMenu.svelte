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
    <img
      src="{process.env.CLOUDINARY_IMAGE_URL}/v1604882204/mobile-logo.svg"
      alt="relay-food.fun"
      class="block lg:hidden select-none" />
    <img
      src="{process.env.CLOUDINARY_IMAGE_URL}/v1604882204/desktop-logo.svg"
      alt="relay-food.fun"
      class="hidden lg:block select-none" />
  </div>
  <div class="hidden sm:ml-6 sm:flex">
    <a href="/" class="link" class:active={segment === undefined}>Dashboard</a>
  </div>
</div>
