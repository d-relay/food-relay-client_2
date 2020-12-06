<script lang="ts">
  import { format } from 'svelte-i18n';

  import type { Location as ILocatiion } from '../../interfaces/Location';

  import Input from '../../helpers/Input.svelte';
  import ConfirmButton from '../../helpers/ConfirmButton.svelte';
  import SectionContainer from '../../helpers/SectionContainer.svelte';
  import * as api from '../../api';

  export let location: ILocatiion;
  export let token: string;

  let { city, street, house, corps, entrance, floor, flat } = location;

  async function handleSubmit() {
    await api.location.updateLocation(
      { city, street, house, corps, entrance, floor, flat },
      token
    );
  }
</script>

<SectionContainer title={$format('location.title')}>
  <form on:submit|preventDefault={handleSubmit} class="px-6">
    <div class="flex flex-wrap -mx-3 my-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="region"
          autocomplete="shipping "
          placeholder="Область"
          required="true"
          bind:value={city} />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="city"
          autocomplete="shipping address-level2"
          placeholder="Київ"
          required="true"
          bind:value={city} />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 my-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="street"
          autocomplete="shipping street-address"
          placeholder="Шевченка"
          required="true"
          bind:value={street} />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="house"
          autocomplete="shipping"
          required="true"
          bind:value={house} />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="corps"
          bind:value={corps} />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 my-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="entrance"
          bind:value={entrance} />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input
          type="text"
          component="location"
          name="floor"
          bind:value={floor} />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <Input type="text" component="location" name="flat" bind:value={flat} />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 my-6">
      <div class="w-full md:w-1/3 px-3 m-auto text-center">
        <ConfirmButton t={$format('location.verify')} />
      </div>
    </div>
  </form>
</SectionContainer>
