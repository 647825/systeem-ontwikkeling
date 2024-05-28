<template>
  <div class="admin-panel">
    <aside class="sidebar">
      <ul>
        <li @click="navigateTo('adminUsers')">Users</li>
        <li @click="showEventOptions = !showEventOptions">
          Events
          <ul v-if="showEventOptions">
            <li @click.stop="navigateToEvent('jazz')">Jazz</li>
            <li @click.stop="navigateToEvent('dance')">Dance</li>
            <li @click.stop="navigateToEvent('history')">History</li>
            <li @click.stop="navigateToEvent('yummy')">Yummy</li>
          </ul>
        </li>
        <li @click="navigateTo('adminOrders')">Orders</li>
        <li @click="navigateTo('adminWysiwyg')">WYSIWYG</li>
      </ul>
    </aside>
    <section class="view">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showEventOptions: false
    }
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    },
    navigateToEvent(eventType) {
      const eventTypeMapping = {
        jazz: 1,
        dance: 4,
        history: 2,
        yummy: 3
      }
      const eventTypeNumber = eventTypeMapping[eventType]
      this.$router.push({ name: 'adminEvents', params: { eventType: eventTypeNumber } })
    }
  }
}
</script>

<style>
@import 'admin.scss';
</style>
