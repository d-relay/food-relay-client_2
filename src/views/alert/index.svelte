<script lang="ts">
  import type { Alert } from '../../interfaces/Alert';
  import * as api from '../../api';
  import Input from '../../helpers/Input.svelte';
  import Eye from '../../icons/Eye.svelte';
  import ConfirmButton from '../../helpers/ConfirmButton.svelte';

  export let alert: Alert;
  export let token: string;

  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  import Image from './Image.svelte';
  import ImageUpload from './ImageUpload.svelte';
  import SectionContainer from '../../helpers/SectionContainer.svelte';

  let { alert_token, font_size, interval, duration, color, message } = alert;

  const gifs = [
    'v1595159188/1_pea_2_peas',
    'v1595159188/1_pea_2_peas',
    'v1595159188/1_pea_2_peas',
    'v1595159188/1_pea_2_peas'
  ];

  let activeImage = 1;
  let showPass = false;
  let alertTokenUrl = '';
  let inputTokenElement: HTMLInputElement;
  let permissionStatus: PermissionStatus;

  async function handleSubmit(): Promise<any> {
    const data = { font_size, interval, duration, alert_token, color, message };
    return api.alert.updateAlert(data, token);
  }

  onMount(async () => {
    alertTokenUrl = window.location.origin + '/alert/' + alert_token;
    permissionStatus = await navigator.permissions.query({
      // @ts-ignore
      name: 'clipboard-write'
    });
  });

  async function copy(): Promise<void> {
    if (permissionStatus.state !== 'denied') {
      navigator.clipboard.writeText(alertTokenUrl);
    } else {
      inputTokenElement.focus();
      inputTokenElement.type = 'text';
      inputTokenElement.select();
      document.execCommand('copy');
      inputTokenElement.type = 'password';
    }
  }
</script>

<style lang="scss">
  .alert__message {
    text-transform: capitalize;
    text-align: center;
    word-break: break-all;
  }

  .alert-label {
    @apply block;
    @apply uppercase;
    @apply tracking-wide;
    @apply text-gray-600;
    @apply text-xs;
    @apply font-bold;
    @apply mb-2;
  }

  .alert__preview {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .alert__token-container {
    @apply flex;
    @apply flex-wrap;
    @apply my-6;
    @apply -mx-3;
  }

  .alert__token-securecode {
    @apply w-full;
    @apply relative;
    @apply inline-flex;
    @apply items-center;
    @apply py-3;
    @apply px-4;
    @apply text-sm;
    @apply leading-5;
    @apply font-medium;
    @apply text-gray-700;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    @apply outline-none;
    @apply appearance-none;
    @apply bg-white;
    @apply border;
    @apply border-gray-300;
    @apply rounded-t-md;
    @apply rounded-b-none;
    &:focus {
      @apply outline-none;
      @apply border-indigo-300;
      @apply shadow-outline-indigo;
      @apply z-10;
    }
    &:active {
      @apply bg-gray-50;
    }
  }

  .alert__token-copy,
  .alert__token-test {
    width: 50%;
    @apply flex;
    @apply items-center;
    @apply py-3;
    @apply px-6;
    @apply bg-white;
    @apply text-gray-700;
    @apply border-gray-300;
    @apply text-sm;
    @apply leading-5;
    @apply font-medium;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;

    &:hover {
      @apply bg-gray-100;
    }

    &:focus {
      @apply z-10;
      @apply border-indigo-300;
      @apply outline-none;
      @apply shadow-outline-indigo;
    }

    &:active {
      @apply bg-gray-50;
    }
  }

  .alert__token-copy {
    @apply border-l;
    @apply border-b;
    @apply border-t-0;
    @apply rounded-none;
    @apply rounded-bl;
  }

  .alert__token-test {
    @apply border-l;
    @apply border-r;
    @apply border-b;
    @apply border-t-0;
    @apply rounded-l-none;
    @apply rounded-r;
    @apply rounded-tr-none;
  }

  .alert__token-icon {
    @apply flex;
    @apply items-center;
    @apply absolute;
    @apply inset-y-0;
    @apply right-0;
    @apply pr-3;
    @apply text-sm;
    @apply leading-5;
  }

  .image__grid {
    @apply w-full;
    @apply grid;
    @apply grid-cols-1;
    @apply gap-4;
    @apply px-3;
  }

  @media (min-width: 640px) {
    .image__grid {
      @apply grid-cols-2;
    }

    .alert__token-securecode {
      @apply rounded-l-md;
      @apply rounded-tr-none;
    }

    .alert__token-copy,
    .alert__token-test {
      @apply inline-flex;
    }

    .alert__token-copy {
      @apply border-t;
      @apply border-l-0;
      @apply rounded-bl-none;
    }

    .alert__token-test {
      @apply rounded-tr;
      @apply border-t;
    }
  }

  @media (min-width: 768px) {
    .image__grid {
      @apply grid-cols-3;
    }
  }
  @media (min-width: 768px) {
    .image__grid {
      @apply grid-cols-4;
    }
  }
  @media (min-width: 1280px) {
    .image__grid {
      @apply grid-cols-5;
    }
  }
</style>

<SectionContainer title={$_('alert.title')}>
  <form on:submit|preventDefault={handleSubmit} class="px-6">
    <div class="flex flex-wrap my-6 -mx-3">
      <h2
        class="px-3 mb-6 block uppercase tracking-wide text-gray-700 text-xs
            font-bold">
        {$_('alert.image_subtitle')}
      </h2>
      <div class="image__grid">
        <ImageUpload />
        {#each gifs as prefix, id}
          <Image
            on:click={() => (activeImage = id)}
            {prefix}
            {activeImage}
            {id} />
        {/each}
      </div>
    </div>
    <div class="alert__token-container">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label for="alert__token" class="alert-label">
          {$_('alert.token')}
        </label>
        <div
          class="w-full relative z-0 flex flex-col sm:inline-flex sm:flex-row shadow-md rounded-md">
          <div class="relative w-full">
            <input
              bind:this={inputTokenElement}
              type={showPass ? 'text' : 'password'}
              id="alert__token"
              disabled
              value={alertTokenUrl}
              class="alert__token-securecode" />
            <div class="alert__token-icon">
              <Eye open={showPass} on:close={() => (showPass = !showPass)} />
            </div>
          </div>
          <div class="flex flex-row">
            <button type="button" on:click={copy} class="alert__token-copy">
              {$_('alert.copy')}
            </button>
            <button
              on:click={() => api.alert.testAlert(alert_token, token)}
              type="button"
              class="alert__token-test">
              {$_('alert.test')}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap my-6 -mx-3">
      <div class="w-full md:w-1/2">
        <div class="px-3 mb-3">
          <Input
            type="color"
            component="alert"
            name="color"
            bind:value={color} />
        </div>
        <div class="px-3 mb-3">
          <Input
            type="number"
            component="alert"
            name="font_size"
            min="14"
            max="40"
            step="1"
            bind:value={font_size} />
        </div>
        <div class="px-3 mb-3">
          <Input
            type="number"
            component="alert"
            name="duration"
            min="5"
            max="180"
            step="5"
            bind:value={duration} />
        </div>
        <div class="px-3 mb-3">
          <Input
            type="number"
            component="alert"
            name="interval"
            min="10"
            step="1"
            max="70"
            bind:value={interval} />
        </div>
        <div class="px-3 mb-3">
          <Input
            type="text"
            component="alert"
            name="message"
            maxlength="50"
            bind:value={message} />
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="flex flex-col h-full pb-3 overflow-hidden">
          <span
            class="block uppercase tracking-wide text-gray-700 text-xs
                font-bold mb-2">
            Demo
          </span>
          <div class="border rounded-md py-3 px-4 h-full">
            <div class="alert__preview">
              <div
                class="rounded shadow-lg relative h-32 w-32 md:h-56 md:w-56
                    cursor-pointer border-0 border-solid focus:outline-none">
                <video
                  autoplay
                  loop
                  muted
                  playsinline
                  class="object-cover h-full w-full">
                  <source
                    src="{process.env.CLOUDINARY_VIDEO_URL}/c_fill,h_250,w_270,q_100/{gifs[activeImage]}.webm"
                    type="video/webm" />
                  <source
                    src="{process.env.CLOUDINARY_VIDEO_URL}/c_fill,h_250,w_270,vc_h264/{gifs[activeImage]}.mp4"
                    type="video/mp4" />
                </video>
              </div>
              <div
                class="alert__message"
                style="font-size: {font_size}px; color: {color}">
                {message || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap my-6 -mx-3">
      <div class="w-full md:w-1/3 px-3 m-auto text-center">
        <ConfirmButton t={$_('alert.save')} />
      </div>
    </div>
  </form>
</SectionContainer>
