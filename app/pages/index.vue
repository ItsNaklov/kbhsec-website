<template>
  <div class="p-4 justify-start gap-16 items-center flex flex-col">
    <div class="flex-1"></div>
    <NuxtImg src="/logo.png" sizes="(max-width: 768px) 300px, 600px" />
    <div class="flex-1"></div>
    <UForm :validate="validate" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
      <UFormField label="Email" description="We'll never share your email with anyone else."
        help="Please enter a valid email address." size="xl">
        <UInput v-model="state.email" placeholder="Enter your email" class="w-full" />
      </UFormField>

      <UButton color="neutral" variant="outline" type="submit">
        Submit
      </UButton>
    </UForm>
    <!-- <KTimeLine /> -->
    <!-- <span class="text-dimmed">Dimmed</span>
    <span class="text-muted">Muted</span>
    <span class="text-toned">Toned</span>
    <span class="text-default">Text</span>
    <span class="text-highlighted">Highlighted</span>
    <span class="text-inverted bg-inverted">Inverted</span> -->
  </div>
</template>

<script setup lang="ts">

import * as z from 'zod'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await useFetch('/api/subscribe', {
    method: 'POST',
    body: { email: event.data.email }
  })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message, color: 'error' })
    return
  }
  if (!data.value?.success) {
    toast.add({
      title: 'Error',
      description: `${data.value?.user?.email} is already registered`,
      color: 'error'
    })
  } else {
    toast.add({
      title: 'Success',
      description: `Subscribed: ${data.value.user.email}`,
      color: 'neutral'
    })
  }
}
async function onError(event: FormErrorEvent) {
  toast.add({ title: 'Error', description: 'Please provide valid information.', color: 'error' })
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>