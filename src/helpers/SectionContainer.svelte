<script lant="ts">
  export let title: string;
</script>

<style>
  .section-wrapper {
    @apply rounded;
    @apply overflow-hidden;
    @apply shadow-lg;
    @apply border;
    @apply relative;
    @apply my-6;
  }

  .section-header {
    @apply p-6;
    @apply border-b;
    @apply bg-gray-50;
  }

  .section-header__title {
    @apply text-lg;
    @apply leading-6;
    @apply font-medium;
    @apply text-gray-900;
  }
</style>

<section class="section-wrapper">
  <div class="section-header">
    <h2 class="section-header__title">{title}</h2>
  </div>
  <slot />
</section>
