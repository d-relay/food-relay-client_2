<script lang="ts">
  import { format } from "svelte-i18n";
  function actionType(node: HTMLInputElement) {
    node.type = type;
  }

  export let component: string;
  export let name: string;
  export let type: string;
  export let value: string | number;

  const i18n: string = component + "." + name;
  const handleInput = (event: any) =>
    (value = (event.target as HTMLInputElement).value);
</script>

<style lang="scss">
  input {
    @apply py-3;
    @apply px-4;
    @apply h-12;
    @apply block;
    @apply w-full;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    &:focus {
      @apply outline-none;
      @apply border-indigo-300;
      @apply shadow-outline-indigo;
    }
    &:active {
      @apply bg-gray-50;
    }
  }

  label {
    @apply block;
    @apply uppercase;
    @apply tracking-wide;
    @apply text-gray-600;
    @apply text-xs;
    @apply font-bold;
    @apply mb-2;
  }
</style>

<label for="{component}[{name}]">{$format(i18n)}</label>
<div class="relative rounded-md shadow-sm mt-1">
  <input
    use:actionType
    on:input={handleInput}
    {value}
    {...$$restProps}
    class="form-input"
    id="{component}[{name}]" />
</div>
