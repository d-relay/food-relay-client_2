<script lang="ts">
  export let segment: string;
</script>

<style lang="scss">
  .link {
    @apply mt-1;
    @apply block;
    @apply pl-3;
    @apply pr-4;
    @apply py-2;
    @apply border-l-4;
    @apply border-transparent;
    @apply text-base;
    @apply font-medium;
    @apply text-gray-600;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    &:focus {
      @apply outline-none;
      @apply text-gray-800;
      @apply bg-gray-50;
      @apply border-gray-300;
    }
    &:hover {
      @apply text-gray-800;
      @apply bg-gray-50;
      @apply border-gray-300;
    }
    &.active {
      @apply border-indigo-500;
      @apply text-indigo-700;
      @apply bg-indigo-50;
      &:focus {
        @apply outline-none;
        @apply text-indigo-800;
        @apply bg-indigo-100;
        @apply border-indigo-700;
      }
    }
  }
</style>

<div class="sm:hidden">
  <div class="pt-2 pb-4">
    <a
      href="/"
      class="link"
      class:active={segment === undefined || segment === ''}>Dashboard</a>
  </div>
</div>
