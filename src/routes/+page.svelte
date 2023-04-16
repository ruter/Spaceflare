<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import EditRow from "$lib/components/EditRow.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { onMount } from "svelte";

  export let data: PageData;
  export let form: ActionData;

  let zoneName = "";
  let results: any[] = [];
  let recordMap: Record<string, any> = {};
  let showToast = false;
  let toastMsg = "";
  let toastTimeout: number;

  const displayToast = async (msg: string) => {
    clearTimeout(toastTimeout);
    toastMsg = msg;
    showToast = true;
    toastTimeout = setTimeout(() => showToast = false, 6000);
  }

  const deleteRecord = async (event: CustomEvent) => {
    const { result } = event.detail;
    const resp = await fetch(`/api/${result.id}`, {
      method: 'DELETE'
    });
    const res = await resp.json();
    if (res.errors) {
      displayToast(res.errors[0].message);
    } else {
      results = results.filter((r) => r !== result);
      recordMap = Object.fromEntries(results.map(item => [item.id, JSON.parse(JSON.stringify(item))]));
    }
  }

  $: {
    if (form?.incorrect) {
      displayToast(form.error);
    }
  }

  onMount(() => {
    results = data.results;
    recordMap = data.recordMap;
    zoneName = results[0].zone_name;
  });
</script>

<div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="p-5 w-full text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      DNS management for {zoneName}
      <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
        All changes made in the edit drawer are implemented once saved.
      </p>
    </div>
    <div class="flex justify-between px-4 pb-4 pt-2 bg-white dark:bg-gray-800">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search DNS Records">
        </div>
        <div>
          <button type="button" class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Add record
          </button>
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Content</th>
          <th scope="col" class="px-6 py-3">Proxy status</th>
          <th scope="col" class="px-6 py-3">TTL</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each results as result (result.id)}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">{result.type}</td>
            <td class="px-6 py-4">{result.name}</td>
            <td class="px-6 py-4">{result.content}</td>
            <td class="px-6 py-4">
              {#if result.proxied}
                <span class="inline-flex items-center"><img class="h-3 mr-2" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==" alt="Proxied"/> Proxied</span>
              {:else}
                <span class="inline-flex items-center">
                  <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400" class:hidden={!result.priority} title="Priority">{result.priority}</span>
                  <img class="h-4 mr-2" class:hidden={!result.proxiable} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MC41IDU5Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzkyOTc5Yjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDksMTMuNVYxOUw1OSw5LjUsNDksMFY1LjVINDAuNzhhMTIuNDMsMTIuNDMsMCwwLDAtOS41LDQuNDJMMTcuNjUsMjcuMTZhOC44Myw4LjgzLDAsMCwxLTYuOTEsMy4zNEg1bC01LDhIMTMuMzlhMTEuMjcsMTEuMjcsMCwwLDAsOS00LjQ4TDM1LjA1LDE3LjE4YTkuODEsOS44MSwwLDAsMSw3LjY2LTMuNjhaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAuNSwzOUExMCwxMCwwLDAsMCw3Niw0MC4wOWExOSwxOSwwLDAsMC0zNy4zLTQuNTdBOSw5LDAsMCwwLDI0LDQyLjVhOC40Nyw4LjQ3LDAsMCwwLC4wNiwxLDcuNSw3LjUsMCwwLDAsLjQ0LDE1YzQsMCw1MS44OS41LDU2LC41YTEwLDEwLDAsMCwwLDAtMjBaIi8+PC9nPjwvZz48L3N2Zz4=" alt="DNS only"/>
                  DNS only
                </span>
              {/if}
            </td>
            <td class="px-6 py-4">{result.ttl === 1 ? "Auto" : result.ttl}</td>
            <td class="px-6 py-4 text-right">
              <span class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500" class:sr-only={result.meta.read_only}>
                <button type="button" class="hover:underline" on:click={() => recordMap[result.id].edit = !recordMap[result.id].edit }>Edit</button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" class:rotate-90={recordMap[result.id].edit}>
                  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                </svg>
              </span>
            </td>
          </tr>
          <EditRow bind:result={result} bind:record={recordMap[result.id]} on:delete={deleteRecord} />
        {/each}
      </tbody>
    </table>
  </div>

  {#if showToast}
    <Toast bind:showToast={showToast} toastMsg={toastMsg} toastTimeout={toastTimeout} />
  {/if}

</div>
