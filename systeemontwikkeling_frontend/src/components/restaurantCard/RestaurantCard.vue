
<template>
  <Card :image="image" :title="title" :description="description" event="restaurant" >
    <span>{{ rating }}</span>
    <img class="star" :src="Star" alt="Star image">
    <router-link :to="route">
      <button class="reservation-button">Reservation</button>
    </router-link>
  </Card>
</template>

<script>
import Star from '@/assets/images/Yummy/star.svg';
import Card from '@/components/card/CardComponent.vue';

export default {
  components: {
    Card
  },
  props: ['image', 'title', 'description', 'rating', 'route'],
  data() {
    return {
      Star: Star
    }
  }
}
</script>

<style scoped>
@import url(./restaurantCard.scss);
</style>
