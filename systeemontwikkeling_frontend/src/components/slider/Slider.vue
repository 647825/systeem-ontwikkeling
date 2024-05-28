
<template>
    <section class="slider">
      <button @click="prevSlide"><</button>
      <article v-for="(slide, index) in slides" :key="index" :class="{ active: index === currentSlide }" class="slide" :style="{ backgroundImage: `url(${slide.picture})` }">
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.content }}</p>
      </article>
      <button @click="nextSlide">></button>
    </section>
</template>
  
<script>
  export default {
    props: {
      slides: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentSlide: 0,
      };
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      },
    },
  };
</script>
  
<style scoped>
@import url(./slider.scss);
</style>
