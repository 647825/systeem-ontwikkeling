
<template>
    <section :class="['homeCard', textRight && 'textRight', textBlack && 'textBlack']" :style="{ backgroundImage: `url(${image})` }">
        <p>{{ description }}</p>
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'HomeCard',
    props: {
        image: String,
        description: String,
        textRight: Boolean,
        textBlack: Boolean 
    }
}
</script>

<style scoped>
@import url(./homeCard.scss);
</style>
