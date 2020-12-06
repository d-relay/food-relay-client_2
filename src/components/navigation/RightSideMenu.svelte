<script lang="ts">
  import type { User } from '../../interfaces/User';

  export let segment: string;
  export let user: User;

  import { format, locale, locales } from 'svelte-i18n';

  import Bell from '../../icons/Bell.svelte';
  import Dropdown from '../../helpers/Dropdown.svelte';

  let dropdownTrigger: Element;
  let dropdownLangTrigger: Element;

  function setLocale(_locale: string) {
    fetch('/lang', {
      method: 'POST',
      body: JSON.stringify({ lang: _locale }),
      headers: { 'Content-Type': 'application/json' }
    });
    locale.set(_locale);
  }
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
    @apply border;
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
  <div class="ml-3 relative">
    <Dropdown triggerElement={dropdownLangTrigger}>
      <button
        bind:this={dropdownLangTrigger}
        class="dropdown__button uppercase p-1 border-2 border-transparent text-gray-400 rounded-full
        hover:text-gray-500 focus:outline-none focus:text-gray-500
        focus:bg-gray-100 transition duration-150 ease-in-out"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        {$locale}
      </button>
      <div
        class="dropdown__menu--inner"
        role="menu"
        slot="DropdownMenu"
        aria-orientation="vertical"
        aria-labelledby="user-menu">
        {#each $locales as item}
          <span
            class="dropdown__item cursor-pointer"
            role="menuitem"
            on:click={() => setLocale(item)}>{$format('language.' + item)}</span>
        {/each}
      </div>
    </Dropdown>
  </div>
  {#if user}
    <button
      class="p-1 ml-3 border-2 border-transparent text-gray-400 rounded-full
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
      class="ml-3 relative inline-flex items-center px-4 py-2 border
        border-transparent text-sm leading-5 font-medium rounded-md text-white
        bg-indigo-600 shadow-md hover:bg-indigo-500 focus:outline-none
        focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700
        transition ease-in-out duration-150">
      {$format('controls.login')}
    </a>
  {/if}
</div>
