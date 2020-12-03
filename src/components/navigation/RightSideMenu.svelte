<script lang="ts">
  import type { User } from '../../interfaces/User';
  import { format } from 'svelte-i18n';

  export let segment: string;
  export let user: User;

  import Bell from '../../icons/Bell.svelte';
  import Dropdown from '../../helpers/Dropdown.svelte';

  let dropdownTrigger: Element;
</script>

<style lang="scss">
  .dropdown__button {
    @apply flex;
    @apply text-sm;
    @apply border-2;
    @apply border-transparent;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    &:focus {
      @apply outline-none;
      @apply border-gray-300;
    }
  }

  .dropdown__menu--inner {
    @apply py-1;
    @apply rounded-md;
    @apply bg-white;
    @apply shadow;
  }

  .dropdown__item {
    @apply block;
    @apply px-4;
    @apply py-2;
    @apply text-sm;
    @apply leading-5;
    @apply text-gray-700;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;

    &:hover {
      @apply bg-gray-100;
    }
    &:focus {
      @apply outline-none;
      @apply bg-gray-100;
    }
  }
</style>

<div
  class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static
    sm:inset-auto sm:ml-6 sm:pr-0">
  {#if user}
    <button
      class="p-1 border-2 border-transparent text-gray-400 rounded-full
        hover:text-gray-500 focus:outline-none focus:text-gray-500
        focus:bg-gray-100 transition duration-150 ease-in-out"
      aria-label="Notifications">
      <Bell />
    </button>

    <div class="ml-3 relative">
      <Dropdown triggerElement={dropdownTrigger}>
        <button
          bind:this={dropdownTrigger}
          class="dropdown__button"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <img
            class="h-8 w-8 rounded-full"
            src={user.profile_image_url}
            alt="" />
        </button>

        <div
          class="dropdown__menu--inner"
          role="menu"
          slot="DropdownMenu"
          aria-orientation="vertical"
          aria-labelledby="user-menu">
          <a
            aria-current={segment === 'profile' ? 'page' : undefined}
            href="profile"
            role="menuitem"
            class="dropdown__item">
            {$format('controls.profile')}
          </a>
          <a
            rel="external"
            href="/auth/logout"
            class="dropdown__item"
            role="menuitem">
            {$format('controls.logout')}
          </a>
        </div>
      </Dropdown>
    </div>
  {:else}
    <a
      rel="external"
      href="/auth/login"
      class="relative inline-flex items-center px-4 py-2 border
        border-transparent text-sm leading-5 font-medium rounded-md text-white
        bg-indigo-600 shadow-md hover:bg-indigo-500 focus:outline-none
        focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700
        transition ease-in-out duration-150">
      {$format('controls.login')}
    </a>
  {/if}
</div>
