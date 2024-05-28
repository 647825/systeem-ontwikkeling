
<template>
  <h1>Orders 🤯</h1>
  <div>
    <button @click="exportCsv">Export to CSV</button>
    <button @click="exportExcel">Export to Excel</button>
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <h2>Select Columns to Export</h2>
      <div v-for="column in columns" :key="column.key">
        <input
          type="checkbox"
          v-model="selectedColumns"
          :value="column.key"
          :disabled="column.key === 'paymentDate'"
        />
        <label>{{ column.label }}</label>
      </div>
      <button @click="processExport" class="export-button">Export</button>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Username</th>
        <th>Event name</th>
        <th>Quantity</th>
        <th>Comment</th>
        <th>Payment Date</th>
        <th>Checked In</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.username }}</td>
        <td>{{ order.eventName }}</td>
        <td>
          <input type="number" v-model="order.quantity" placeholder="0" />
        </td>
        <td><input type="text" v-model="order.comment" placeholder="no comment" /></td>
        <td>
          <button @click="setPaymentDate(order.id)" class="edit button" v-if="!order.paymentDate">
            Set payment date
          </button>
          <span v-else>{{ order.paymentDate }}</span>
        </td>
        <td><input type="checkbox" v-model="order.checkedIn" /></td>
        <td>
          <button @click="save(order)" class="edit button">save</button>
          <button @click="deleteOrder(order.id)" class="delete button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from '../../../axios-auth'
import { requestHeader } from '@/helpers/requestHeader.js'
import { exportToCsv, exportToExcel } from '@/helpers/exportData.js'

export default {
  data() {
    return {
      orders: [],
      columns: [
        { key: 'id', label: 'Order ID' },
        { key: 'username', label: 'Username' },
        { key: 'eventName', label: 'Event name' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'comment', label: 'Comment' },
        { key: 'paymentDate', label: 'Payment Date' },
        { key: 'checkedIn', label: 'Checked In' }
      ],
      selectedColumns: ['paymentDate'],
      showModal: false,
      exportFormat: ''
    }
  },
  mounted() {
    axios
      .get('/orders', {
        headers: requestHeader()
      })
      .then((response) => {
        this.orders = response.data
      })
      .catch((error) => {
        console.error('There was an error fetching the orders:', error)
      })
  },
  methods: {
    setPaymentDate(orderId) {
      this.orders.find((order) => order.id === orderId).paymentDate =
        new Date().toLocaleDateString()
    },
    save(order) {
      axios
        .put(`/orders`, order, {
          headers: requestHeader()
        })
        .catch((error) => {
          console.error('There was an error saving the order:', error)
        })
    },
    deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?, this action cannot be undone.')) {
        axios
          .delete(`/orders/${orderId}`, {
            headers: requestHeader()
          })
          .then(() => {
            this.orders = this.orders.filter((order) => order.id !== orderId)
          })
          .catch((error) => {
            console.error('There was an error deleting the order:', error)
          })
      }
    },
    exportCsv() {
      this.exportFormat = 'csv'
      this.showExportModal()
    },
    exportExcel() {
      this.exportFormat = 'excel'
      this.showExportModal()
    },
    showExportModal() {
      this.showModal = true
    },
    processExport() {
      const dataToExport = this.orders.map((order) => {
        let exportRow = {}
        this.selectedColumns.forEach((key) => {
          exportRow[key] = order[key]
        })
        return exportRow
      })

      if (this.exportFormat === 'csv') {
        exportToCsv(dataToExport, this.selectedColumns)
      } else if (this.exportFormat === 'excel') {
        exportToExcel(dataToExport, this.selectedColumns)
      }

      this.showModal = false
    }
  }
}
</script>
<style scoped>
@import 'orders.scss';
</style>
