<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "",
      to: "/",
      slot: "logo" as const,
    },
  ],
  [

    {
      label: "Home",
      to: "/",
    },
    {
      label: "About",
      to: "/about",
      children: [
        {
          label: "Privacy Policy",
          // badge: "3.8k",
          to: "/privacy",
        },
        {
          label: "Bylaws",
          // badge: "3.8k",
          to: "/bylaws",
        },
        {
          label: "C.O.C.",
          // badge: "3.8k",
          to: "/coc",
        },
      ],
    },


  ],
]);
</script>

<template>
  <div class="p-4 w-full">
    <UNavigationMenu content-orientation="vertical" color="primary" :items="items" class="w-full">
      <template #logo-trailing>
        <NuxtLink to="/">
          <NuxtImg src="/favicon.png" alt="image" width="25" height="20" />
        </NuxtLink>

      </template>
    </UNavigationMenu>
    <!-- <NuxtLink to="/coc">
    <NuxtImg src="/favicon.png" alt="image" width="25" height="20" />
  </NuxtLink> -->
  </div>

</template>
