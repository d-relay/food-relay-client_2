<script lang="ts">
  export let segment: string
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
      class="block lg:hidden h-8 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
      alt="Workflow logo" />
    <img
      class="hidden lg:block h-8 w-auto"
      src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
      alt="Workflow logo" />
  </div>
  <div class="hidden sm:ml-6 sm:flex">
    <a href="/" class="link" class:active={segment === undefined}>Dashboard</a>
  </div>
</div>
