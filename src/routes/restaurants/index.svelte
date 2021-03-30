<script context="module" lang="ts">
    import { profile } from '../../api';
    const getSegmentFromPath = (path: string | undefined): string => {
      if (typeof path === 'string' && path.length > 0) {
        return path.slice(1);
      }
      return '';
    };
  
    export async function preload(this: any, params: any, session: any) {
      if (!session.user) {
        return this.redirect(302, '/auth/twitch');
      }
      const { location, alert } = await profile.getProfile(session.user.token);
  
      return {
        user: session.user,
        location,
        alert,
        segment: getSegmentFromPath(params.path)
      };
    }
</script>
  
  <script lang="ts">
    export let segment: string;
    export let user: IUser;
  
    import type { User as IUser } from '../../interfaces/User'; 
  
    import { format } from 'svelte-i18n';
  
    import Nav from '../../components/navigation/index.svelte';
    import Partner from '../../views/partner/index.svelte';
  </script>
  
  <svelte:head>
    <title>Налаштування профілю {user.display_name}</title>
  </svelte:head>
  
  <Nav {segment} />
  <main class="lg:relative container mx-auto">
    <header class="pt-2 md:pt-4 lg:pt-8 px-4 sm:px-0">
      <h1 class="text-2xl">
        {$format('profile.hello')}
        <span class="font-semibold">{user.display_name} 🤗</span>
      </h1>
    </header>
  
    <Partner token={user.token} />
  </main>
  