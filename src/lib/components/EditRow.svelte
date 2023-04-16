<script lang="ts">
  import { enhance } from '$app/forms';
  import { DNS_TYPE, TTL } from "$lib/const";
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let result: any;
  export let record: Record<string, any>;

  const deleteRecord = () => {
		dispatch('delete', { result });
	}
</script>

<tr
  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
  class:hidden={!record.edit}
  id={result.id}
>
  <td colspan="6">
    <form method="POST" class="flex flex-col mb-2 px-8 py-4" use:enhance>
      <input type="hidden" name="id" value={result.id} />
      <div class="flex flex-col md:flex-row justify-between mb-6">
        <div class="flex flex-col">
          <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
          <select
            id="type"
            name="type"
            bind:value={record.type}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {#each DNS_TYPE as dtype (dtype)}
              <option value={dtype}>{dtype}</option>
            {/each}
          </select>
        </div>
        <div class="flex flex-col">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name (required)</label>
          <input
            type="text"
            name="name"
            bind:value={record.name}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content (required)</label>
          <input
            type="text"
            name="content"
            bind:value={record.content}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="proxied" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proxy status</label>
          <div class="m-2.5 relative inline-flex items-center">
            <input
              type="checkbox"
              name="proxied"
              bind:value={record.proxied}
              class="sr-only peer"
              checked={record.proxied}
            />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={(event) => {
                record.proxied = !record.proxied;
                // Set TTL to auto when proxied.
                if (record.proxied) {
                  record.ttl = 1;
                }
              }}
              class="w-11 h-6 cursor-pointer bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            />
            {#if record.proxied}
              <span class="mx-2 inline-flex items-center">
                <img
                  class="h-3 mr-2"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg=="
                  alt="Proxied"
                /> Proxied
              </span>
            {:else}
              <span class="mx-2 inline-flex items-center">
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400"
                  class:hidden={!result.priority}
                  title="Priority"
                >{result.priority}</span>
                <img
                  class="h-4 mr-2"
                  class:hidden={!result.proxiable}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MC41IDU5Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzkyOTc5Yjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDksMTMuNVYxOUw1OSw5LjUsNDksMFY1LjVINDAuNzhhMTIuNDMsMTIuNDMsMCwwLDAtOS41LDQuNDJMMTcuNjUsMjcuMTZhOC44Myw4LjgzLDAsMCwxLTYuOTEsMy4zNEg1bC01LDhIMTMuMzlhMTEuMjcsMTEuMjcsMCwwLDAsOS00LjQ4TDM1LjA1LDE3LjE4YTkuODEsOS44MSwwLDAsMSw3LjY2LTMuNjhaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAuNSwzOUExMCwxMCwwLDAsMCw3Niw0MC4wOWExOSwxOSwwLDAsMC0zNy4zLTQuNTdBOSw5LDAsMCwwLDI0LDQyLjVhOC40Nyw4LjQ3LDAsMCwwLC4wNiwxLDcuNSw3LjUsMCwwLDAsLjQ0LDE1YzQsMCw1MS44OS41LDU2LC41YTEwLDEwLDAsMCwwLDAtMjBaIi8+PC9nPjwvZz48L3N2Zz4="
                  alt="DNS only"
                /> DNS only
              </span>
            {/if}
          </div>
        </div>
        <div class="flex flex-col">
          <label for="ttl" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TTL</label>
          <select
            name="ttl"
            bind:value={record.ttl}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={record.proxied}
          >
            {#each TTL as item (item.value)}
              <option value={item.value}>{item.title}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-col items-start mb-6 p-4 border-y">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Record Attributes</h1>
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          The information provided here will not impact DNS record resolution and is only meant for
          your reference.
        </p>
        <div class="mt-4 w-full">
          <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
          <input
            type="text"
            name="comment"
            bind:value={record.comment}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your comment here (up to 50 characters)."
          />
        </div>
      </div>
      <div class="pl-6 pr-2 flex justify-between">
        <button
          type="button"
          on:click={deleteRecord}
          class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >Delete</button
        >
        <div class="inline-flex">
          <button
            type="button"
            on:click={(event) => record = JSON.parse(JSON.stringify(result))}
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >Cancel</button>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >Save</button>
        </div>
      </div>
    </form>
  </td>
</tr>
