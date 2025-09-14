import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    events: defineCollection({
      type: 'data',
      source: 'events/*.json',
      schema: z.object({
        start: z.string(),
        end: z.string(),
        url: z.string(),
        title: z.string(),
        location: z.string(),
        description: z.string(),
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        date: z.string()
      })
    }),

  }
})