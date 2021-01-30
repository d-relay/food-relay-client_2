<script context="module" lang="ts">
  import { getAlertWithoutAuth, transformAlertParams } from '../../api/alert';

  export async function preload(page: any) {
    const { token } = page.params;
    let base_url = process.env.API_BASE_URL!;
    if (base_url.indexOf('https')) {
      base_url = base_url.replace(/http/, 'ws');
    } else {
      base_url = base_url.replace(/https/, 'wss');
    }

    const alert = transformAlertParams(await getAlertWithoutAuth(token));
    return { token, base_url, alert };
  }
</script>

<script lang="ts">
  export let alert: Alert;
  export let token: string;
  export let base_url: string;

  import { onMount } from 'svelte';
  import type { Alert } from '../../interfaces/Alert';

  const RESTORE_TIMEOUT = 10 * 1000;
  // const EVENT_DELAY = 5 * 1000;

  let events: string[] = [];
  let show = false;
  let event_fired = false;

  function createWebSocket() {
    const ws = new WebSocket(`${base_url}/` + token);
    console.log(alert);
    ws.onmessage = function (event) {
      if (event.data === token) {
        events.push(event.data);
        console.info('EVENT COME');
      }
    };

    ws.onclose = function (event) {
      console.log({ onclose: event });
    };

    ws.onerror = function (error) {
      console.log({ onerror: error });
    };

    return ws;
  }

  function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function fireDelayedEvent() {
    setInterval(async () => {
      if (events.length !== 0 && event_fired === false) {
        console.info('PUSH EVENT');
        event_fired = show = events.pop() === token;
        await sleep(alert.duration);
        show = false;
        await sleep(alert.interval);
        event_fired = false;
        console.info('EVENT DONE');
      }
    }, 1000);
  }

  onMount(function () {
    let ws = createWebSocket();
    fireDelayedEvent();

    setInterval(function () {
      if (ws.readyState === ws.CLOSED) {
        ws = createWebSocket();
      }
    }, RESTORE_TIMEOUT);
  });
</script>

<svelte:head>
  <title>donut {token}</title>
</svelte:head>

{#if show}
  <div
    class="rounded overflow-hidden shadow-lg relative cursor-pointer h-screen
      w-screen"
  >
    <video autoplay loop muted playsinline class="object-cover h-full w-full">
      <source
        src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,q_100/v1595159188/1_pea_2_peas.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,vc_h264/v1595159188/1_pea_2_peas.mp4"
        type="video/mp4"
      />
    </video>
    <div />
  </div>
{/if}

<style>
  :global(body, .content, #sapper) {
    background-color: transparent;
  }
</style>
