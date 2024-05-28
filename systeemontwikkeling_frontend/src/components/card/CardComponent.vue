
<template>
    <section :class="['card', event ?? '']">
        <img :src="image" :alt="title" v-if="image"/>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <RouterLink :to="redirect_link" v-if="redirect_link" class="redirect">read more</RouterLink>
        <slot></slot>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    props: {
        image: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        event: {
            type: String,
            required: false
        },
        redirect_link: {
            type: String,
            required: false
        }
    },
    components: {
        RouterLink
    }
}

</script>

<style scoped>
@import './card.scss';
</style>
