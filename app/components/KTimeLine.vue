<script setup lang="ts">
import type { TimelineItem } from '#ui/types'

const route = useRoute()
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const orientation = computed(() => width.value < 768 ? 'vertical' : 'horizontal')

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('events')
    .order('start', 'ASC')
    .all()
})

// "Bugün" item — burada da url normal alan
const todayItem: TimelineItem & { url?: string; raw?: Date } = {
  date: new Date().toLocaleDateString('tr-TR'),
  title: 'Bugün',
  description: 'Şu anda buradayız 🚀',
  icon: 'i-lucide-map-pin',
  value: 'today',

}

const items = computed<(TimelineItem & { url?: string; raw?: Date })[]>(() => {
  const now = new Date()

  const mapped = (data.value || []).map(event => {
    const start = new Date(event.start)

    return {
      date: start.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      title: event.title,
      description: event.description,
      icon: 'i-lucide-calendar',
      value: event.id,
      location: event.location,
      url: event.url,       // 🔥 buraya direk koy
      raw: start            // 🔥 karşılaştırma için
    }
  })

  const past = mapped.filter(i => i.raw! < now)
  const future = mapped.filter(i => i.raw! >= now)

  return [...past, todayItem, ...future]
})
</script>

<template>
  <div class="w-full p-6">
    <UTimeline :items="items" :orientation="orientation" size="xs" class="min-w-full">
      <template #title="{ item }">
        <div class="flex flex-col">
          <span :class="[
            item.raw && item.raw < new Date() ? 'text-gray-400' : 'text-green-700',
            'font-semibold'
          ]">
            {{ item.title }}
          </span>
          <ULink v-if="item.location" :to="item.location" target="_blank" class="text-sm text-primary hover:underline">
            Location
          </ULink>
          <!-- Link sadece varsa göster -->
          <ULink v-if="item.url" :to="item.url" target="_blank" class="text-sm text-primary hover:underline">
            Linkedin
          </ULink>
        </div>
      </template>
    </UTimeline>
  </div>

</template>
