<script lang="ts">
  export let id: number;
  export let prefix: string;
  export let activeImage: number;

  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');

  const handle_keydown = (e: any) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      click();
      return;
    }
  };
</script>

<style lang="scss">
  .selected {
    position: absolute;
    right: 0;
    top: 0;
  }
  .image__preview {
    @apply rounded;
    @apply overflow-hidden;
    @apply shadow-lg;
    @apply relative;
    @apply h-56;
    @apply cursor-pointer;
    @apply border-0;
    @apply border-solid;
    &.active,
    &:focus {
      border-width: 3px;
      border-color: rgba(180, 198, 252, 1);
      @apply outline-none;
    }
  }
</style>

<div
  class="image__preview"
  on:click
  on:keydown={handle_keydown}
  class:active={activeImage === id}
  tabindex={0}>
  <video autoplay loop muted playsinline class="object-cover h-full w-full">
    <source
      src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,q_100/{prefix}.webm"
      type="video/webm" />
    <source
      src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,vc_h264/{prefix}.mp4"
      type="video/mp4" />
  </video>
  <picture class:selected={activeImage === id}>
    <img
      src="https://res.cloudinary.com/duvzrhfdo/image/upload/c_scale,q_10,w_100/v1594251879/cat.png"
      alt="Вибране фото" />
  </picture>
  <div />
</div>
