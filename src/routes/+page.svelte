<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import type { ActionData, PageData } from "./$types";
  import { DNS_TYPE, TTL } from "$lib/const";
  import { onMount } from "svelte";

  export let data: PageData;
  export let form: ActionData;

  let zoneName = "";
  let results: any[] = [];
  let recordMap: Record<string, any> = {};
  let showToast = false;
  let toastMsg = "";

  const dismissToast = async () => {
    setTimeout(() => showToast = false, 6000);
  }

  $: {
    if (form?.incorrect) {
      showToast = form.incorrect;
      toastMsg = form.error;
      dismissToast();
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
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <caption
        class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        DNS management for {zoneName}
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          All changes made in the edit drawer are implemented once saved.
        </p>
      </caption>
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
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" class:hidden={!recordMap[result.id].edit} id="{result.id}">
            <td colspan="6">
              <form
                method="POST"
                class="flex flex-col mb-2 px-8 py-4"
                use:enhance={() => {
                  return async ({ update }) => {
                    await update();
                  };
                }}
              >
                <input type="hidden" name="id" value={result.id} />
                <div class="flex flex-col md:flex-row justify-between mb-6">
                  <div class="flex flex-col">
                    <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                    <select id="type" name="type" bind:value={recordMap[result.id].type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {#each DNS_TYPE as dtype (dtype) }
                        <option value={dtype}>{dtype}</option>
                      {/each}
                    </select>
                  </div>
                  <div class="flex flex-col">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name (required)</label>
                    <input type="text" name="name" bind:value={recordMap[result.id].name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div class="flex flex-col">
                    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content (required)</label>
                    <input type="text" name="content" bind:value={recordMap[result.id].content} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div class="flex flex-col">
                    <label for="proxied" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proxy status</label>
                    <div class="m-2.5 relative inline-flex items-center">
                      <input type="checkbox" name="proxied" bind:value={recordMap[result.id].proxied} class="sr-only peer" checked={recordMap[result.id].proxied}>
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <div
                        on:click={
                          (event) => {
                            recordMap[result.id].proxied = !recordMap[result.id].proxied;
                            // Set TTL to auto when proxied.
                            if (recordMap[result.id].proxied) {
                              recordMap[result.id].ttl = 1;
                            }
                          }
                        }
                        class="w-11 h-6 cursor-pointer bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      {#if recordMap[result.id].proxied}
                        <span class="mx-2 inline-flex items-center"><img class="h-3 mr-2" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==" alt="Proxied"/> Proxied</span>
                      {:else}
                        <span class="mx-2 inline-flex items-center">
                          <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400" class:hidden={!result.priority} title="Priority">{result.priority}</span>
                          <img class="h-4 mr-2" class:hidden={!result.proxiable} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MC41IDU5Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzkyOTc5Yjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDksMTMuNVYxOUw1OSw5LjUsNDksMFY1LjVINDAuNzhhMTIuNDMsMTIuNDMsMCwwLDAtOS41LDQuNDJMMTcuNjUsMjcuMTZhOC44Myw4LjgzLDAsMCwxLTYuOTEsMy4zNEg1bC01LDhIMTMuMzlhMTEuMjcsMTEuMjcsMCwwLDAsOS00LjQ4TDM1LjA1LDE3LjE4YTkuODEsOS44MSwwLDAsMSw3LjY2LTMuNjhaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAuNSwzOUExMCwxMCwwLDAsMCw3Niw0MC4wOWExOSwxOSwwLDAsMC0zNy4zLTQuNTdBOSw5LDAsMCwwLDI0LDQyLjVhOC40Nyw4LjQ3LDAsMCwwLC4wNiwxLDcuNSw3LjUsMCwwLDAsLjQ0LDE1YzQsMCw1MS44OS41LDU2LC41YTEwLDEwLDAsMCwwLDAtMjBaIi8+PC9nPjwvZz48L3N2Zz4=" alt="DNS only"/>
                          DNS only
                        </span>
                      {/if}
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <label for="ttl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TTL</label>
                    <select
                      name="ttl"
                      bind:value={recordMap[result.id].ttl}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={recordMap[result.id].proxied}
                    >
                      {#each TTL as item (item.value) }
                        <option value={item.value}>{item.title}</option>
                      {/each}
                    </select>
                  </div>
                </div>
                <div class="flex flex-col items-start mb-6 p-4 border-y">
                  <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Record Attributes</h1>
                  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">The information provided here will not impact DNS record resolution and is only meant for your reference.</p>
                  <div class="mt-4 w-full">
                    <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                    <input type="text" name="comment" bind:value={recordMap[result.id].comment} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your comment here (up to 50 characters).">
                  </div>
                </div>
                <div class="pl-6 pr-2 flex justify-between">
                  <button
                    type="button"
                    on:click|once={async (event) => {
                      const resp = await fetch(`/api/${result.id}`, {
                        method: 'DELETE'
                      });
                      const res = await resp.json();
                      if (res.errors) {
                        toastMsg = res.errors[0].message;
                        showToast = true;
                        dismissToast();
                      } else {
                        results = results.filter((r) => r !== result);
                        recordMap = Object.fromEntries(results.map(item => [item.id, JSON.parse(JSON.stringify(item))]));
                      }
                    }}
                    class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >Delete</button>
                  <div class="inline-flex">
                    <button
                      type="button"
                      on:click={(event) => recordMap[result.id] = JSON.parse(JSON.stringify(result))}
                      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >Cancel</button>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                  </div>
                </div>
              </form>
            </td>
        {/each}
      </tbody>
    </table>
  </div>

  {#if showToast}
    <div class="fixed top-24 left-0 w-full flex justify-center" transition:fade>
      <div class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 mr-1 text-sm font-medium">
          {toastMsg}
        </div>
        <button on:click={() => showToast = false} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  {/if}

</div>
