<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`pages-${slug}`, () => {
    return queryCollection('pages').path(`/pages/${slug}`).first()
})
</script>

<template>
    <div class="px-4 md:px-16 lg:px-32 max-w-4xl  mx-auto">
        <h1 class="text-3xl font-bold mb-4">{{ post?.title }}</h1>
    </div>
    <div class="px-4 md:px-16 lg:px-32 max-w-4xl  mx-auto">
        <ContentRenderer :value="post" />
    </div>

</template>
