<script>
  type Rounded = boolean | "none" | "sm" | "md" | "lg" | "full";
  export let src: string;
  export let alt: string;
  export let rounded: Rounded = "none";
  const css =
    rounded === "sm"
      ? "rounded-sm"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "lg"
      ? "rounded-lg"
      : rounded === "full"
      ? "rounded-full"
      : "rounded-none";
</script>

<style lang="scss">
  .image {
    @apply h-8;
    @apply w-8;
  }
</style>

<img class="image {css}" {src} {alt} />
