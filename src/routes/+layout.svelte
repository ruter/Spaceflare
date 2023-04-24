<script lang="ts">
  import "../app.css";
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.data.title} | Spaceflare</title>
</svelte:head>

<div class="flex flex-col min-h-full dark:bg-gray-900">

  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SPACEFLARE</span>
      </a>
      <div class="flex md:order-2">
          <button
            id="theme-toggle"
            type="button"
            class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            on:click={() => {
              // if set via local storage previously
              if (localStorage.getItem('color-theme')) {
                  if (localStorage.getItem('color-theme') === 'light') {
                      document.documentElement.classList.add('dark');
                      localStorage.setItem('color-theme', 'dark');
                  } else {
                      document.documentElement.classList.remove('dark');
                      localStorage.setItem('color-theme', 'light');
                  }

              // if NOT set via local storage previously
              } else {
                  if (document.documentElement.classList.contains('dark')) {
                      document.documentElement.classList.remove('dark');
                      localStorage.setItem('color-theme', 'light');
                  } else {
                      document.documentElement.classList.add('dark');
                      localStorage.setItem('color-theme', 'dark');
                  }
              }
            }}
          >
            <svg id="theme-toggle-dark-icon" class="dark:hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="hidden dark:block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </button>
      </div>
    </div>
  </nav>

  <main class="mt-20">
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>

  <footer class="mt-auto bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
    <div class="mx-auto max-w-7xl py-4">
      <div class="flex flex-col sm:flex-row items-center justify-center text-base text-gray-500 dark:text-white">
        <span>© {new Date().getFullYear()} Spaceflare All rights reserved</span>
        <span class="hidden sm:block mx-1.5">|</span>
        <a href="/" target="_blank">
          <img
            class="h-auto w-36 hidden dark:block"
            src="https://deta.space/buttons/light.svg"
            alt="Install on Deta Space" />
          <img
            class="h-auto w-36 dark:hidden"
            src="https://deta.space/buttons/dark.svg"
            alt="Install on Deta Space" />
        </a>
      </div>
    </div>
  </footer>
</div>
