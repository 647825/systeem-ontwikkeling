
<template>
    <section class="banner">
        <div class="text-content" v-if="title || description">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
            <img :src="image" :alt="title" v-if="image"/>
    </section>
</template>
<script>
export default {
    props: {
        title: String,
        description: String,
        image: String
    }
}

</script>
<style scoped>
@import './banner.scss';
</style>
