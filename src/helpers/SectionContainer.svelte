<script lant="ts">
  export let title: string;
</script>

<section class="rounded overflow-hidden shadow-lg border relative my-6">
  <div class="bg-gray-50 p-6 border-b">
    <h2 class="text-lg leading-6 font-medium text-gray-900">{title}</h2>
  </div>
  <slot />
</section>
