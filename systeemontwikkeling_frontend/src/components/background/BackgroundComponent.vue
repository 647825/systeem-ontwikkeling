
<template>
    <section :style="{ backgroundImage: `url(${image})` }" id="background">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'BackgroundComponent',
    props: {
        image: String,
    }
}

</script>

<style scoped>
@import './background.scss';
</style>
