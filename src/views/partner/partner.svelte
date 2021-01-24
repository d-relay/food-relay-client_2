<script lang="ts">
  export let name;
  export let filename;
  export let id;

  // import type { Partner } from '../../interfaces/Partner';
</script>

<div title={name} class="cursor-pointer">
  <img src={process.env.CLOUDINARY_IMAGE_URL + '/' + filename} alt={name} />
</div>
