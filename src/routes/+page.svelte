<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  export let data: PageData;

  let zones: any[] = [];

  onMount(() => {
    zones = data.results;
  });
</script>

<div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-5 w-full text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      Home
    </div>
    <div class="flex justify-normal px-4 pb-4 pt-2 bg-white dark:bg-gray-800">
      {#each zones as zone}
        <a href="/zone/{zone.id}/{zone.name}" class="block max-w-sm mr-6 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{zone.name}</h5>
            <p class="inline-flex items-center font-normal text-gray-700 dark:text-gray-400">
              {#if zone.status === "active"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-green-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              {/if}
              {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
            </p>
        </a>
      {/each}
    </div>
  </div>
</div>
