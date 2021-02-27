<script lang="ts">
  export let token: string;
  import { format } from 'svelte-i18n';

  import { partner } from '../../api';
  // import type { Partner } from '../../interfaces/Partner';

  import Modal from '../../helpers/Modal.svelte';
  import ConfirmButton from '../../helpers/ConfirmButton.svelte';
  import SectionContainer from '../../helpers/SectionContainer.svelte';

  import Partner from './partner.svelte';

  let partners = getPartners();

  function showPopup() {}

  function getPartners() {
    return partner.getPartners(token);
    // return data;
  }
</script>

<SectionContainer title={$format('partner.title')}>
  <div class="px-6">
    <div class="flex flex-wrap -mx-3 my-6">
      <h3
        class="px-3 mb-6 block uppercase tracking-wide text-gray-700 text-xs
      font-bold">
        {$format('partner.subtitle')}
      </h3>
    </div>
    {#await partners then partners}
      <div class="grid gap-4 grid-cols-4">
        {#each partners as partner}
          <Partner {...partner} />
        {/each}
      </div>
    {:catch error}
      <p>{error}</p>
    {/await}
    <div class="flex flex-wrap -mx-3 my-6">
      <div class="w-full md:w-1/3 px-3 m-auto text-center">
        <ConfirmButton
          t={$format('partner.select')}
          on:click={() => showPopup} />
      </div>
    </div>
  </div>
</SectionContainer>

<!-- <Modal>
  {#await partners then partners}
    {#each partners as partner}
      <Partner {partner} />
    {/each}
  {:catch error}
    <p>{error}</p>
  {/await}
</Modal> -->
