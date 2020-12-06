<script lang="ts">
  export let token: string;
  import { format } from 'svelte-i18n';

  import {} from '../../api';
  import SectionContainer from '../../helpers/SectionContainer.svelte';
</script>

<SectionContainer title={$format('partner.title')}>
  <div class="px-6">
    <div class="flex flex-wrap -mx-3 my-6">
      <h3 class="px-3">Incoming feature</h3>
    </div>
  </div>
</SectionContainer>
