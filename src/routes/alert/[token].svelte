<script context="module">
  export async function preload(page) {
    const { token } = page.params;
    let base_url = process.env.API_BASE_URL!;
    if (base_url.indexOf('https')) {
      base_url = base_url.replace(/http/, 'ws');
    } else {
      base_url = base_url.replace(/https/, 'wss');
    }
    return { token, base_url };
  }
</script>

<script>
  export let token: string;
  export let base_url: string;
  export let EVENT_INTERVAL: number = 5000;

  import { onMount } from 'svelte';

  const RESTORE_TIMEOUT = 10 * 1000;
  const EVENT_DELAY = 5 * 1000;

  let events: string[] = [];
  let show = false;
  let event_fired = false;

  function createWebSocket() {
    const ws = new WebSocket(`${base_url}/` + token);

    ws.onmessage = function (event) {
      if (event.data === token) {
        events.push(event.data);
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function fireDelayedEvent() {
    setInterval(async () => {
      if (events.length !== 0 && event_fired === false) {
        event_fired = show = events.pop() === token;
        await sleep(EVENT_DELAY);
        show = false;
        await sleep(EVENT_INTERVAL);
        event_fired = false;
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

<style>
  :global(body, .content, #sapper) {
    background-color: transparent;
  }
</style>

<svelte:head>
  <title>donut {token}</title>
</svelte:head>

{#if show}
  <div
    class="rounded overflow-hidden shadow-lg relative cursor-pointer h-screen
      w-screen">
    <video autoplay loop muted playsinline class="object-cover h-full w-full">
      <source
        src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,q_100/v1595159188/1_pea_2_peas.webm"
        type="video/webm" />
      <source
        src="https://res.cloudinary.com/duvzrhfdo/video/upload/c_fill,h_250,w_270,vc_h264/v1595159188/1_pea_2_peas.mp4"
        type="video/mp4" />
    </video>
    <div />
  </div>
{/if}
