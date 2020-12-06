<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<div
  class="overflow-hidden shadow-lg relative h-56 cursor-pointer flex
  justify-center items-center border-gray-300 border-2 border-dashed rounded 
  focus:outline-none focus:shadow-outline-indigo">
  <div class="text-center">
    <svg
      class="mx-auto h-12 w-12 text-gray-400"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 48 48">
      <path
        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
        01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4
        0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
    <p class="mt-1 text-sm text-gray-600">
      <button
        type="button"
        class="font-medium text-indigo-600 hover:text-indigo-500
        focus:outline-none focus:underline transition duration-150 ease-in-out">
        {$_('alert.upload')}
      </button>
    </p>
    <p class="mt-1 text-xs text-gray-500">{$_('alert.upload_format')}</p>
  </div>
</div>
