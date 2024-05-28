
<template>
  <form>
    <select v-model="pageData.parentId" v-if="!isParent" required>
      <option v-for="parent in parentOptions" :key="parent.id" :value="parent.id">{{ parent.name }}</option>
    </select>
    <button @click.prevent="savePage" class="savePage button" type="submit">Save</button>
      <section class="banner">
          <div class="text-content">
            <input type="text" v-model="pageData.name" class="title pageEditField" placeholder="title" required>
            <textarea type="text" v-model="pageData.intro" class="content pageEditField" placeholder="page intro" required></textarea>
          </div>
          <div class="image">
            <img :src="pageData.picture" :alt="pageData.title" v-if="pageData.picture"/>
            <input type="file" @change="onFileChange($event, pageData)" class="fileInput" accept="image/*"/>
          </div>
          
      </section>
      
      <section id="infoTexts">
          <div v-for="info in infoText" :key="info.id">
            <div class="image">
              <img :src="info.picture" :alt="info.title" v-if="info.picture"/>
              <input type="file" @change="onFileChange($event, info)" class="fileInput" accept="image/*"/>
            </div>
            <input type="text" v-model="info.title" class="title pageEditField" placeholder="title" required/>
            <textarea type="text" v-model="info.content" class="content pageEditField" placeholder="info text" required></textarea>
            <button @click="deleteInfo(info.id)">Delete</button>
          </div>
          <button @click="addInfo" class="add button">Add info text</button>
      </section>

      <section class="cards">
        <section class="card" v-for="card in pageData.cards" :key="card.id">
          <div class="image">
            <img :src="card.picture" :alt="card.title" v-if="card.picture"/>
            <input type="file" @change="onFileChange($event, card)" class="fileInput" accept="image/*"/>
          </div>
          <input type="text" v-model="card.title" class="title pageEditField" placeholder="title" required/>
          <textarea type="text" v-model="card.text" class="text pageEditField" placeholder="card text" required></textarea>
          <label for="redirect_link">Redirect link</label>
          <select v-model="card.redirect_link" required>
            <option v-for="link in links" :key="link.link" :value="link.link">{{ link.name }}</option>
            <option value="">No redirect</option>
          </select>
          <button @click="deleteCard(card.id)">Delete</button>
        </section>
        <button @click="addCard" class="add button">Add Card</button>
    </section>
  </form>

</template>


<script>
import axios from '../../../../axios-auth';
import { useAuthStore } from '../../../../stores/auth.js';

export default {
  data() {
        return {
            pageData: {},
            infoText: [],
            links: [],
            new: true,
            isParent: false,
            parentOptions: [],
            token: null,
        }
  },
  mounted() {
    const authStore = useAuthStore();
    this.token = authStore.getJwt;

    const pageId = this.$route.params.id;
    if (pageId !== 'new') {
    axios.get(`/pages/${pageId}`)
      .then(response => {
        this.pageData = response.data;
        this.pageData.infoText.forEach((info) => {
          this.infoText.push(info);
        })
        this.new = false;
      }).catch(error => {
        console.error('There was an error fetching the content:', error);
      });
    }

    axios.get('/pages/links')
      .then(response => {
        this.links = response.data;
      })
    axios.get('/pages/parent').then(response => {
      this.parentOptions = response.data;
    });

  },
  updated() {
    this.isParent = this.parentOptions.some(parent => parent.id === this.pageData.id);
  },
  methods: {
    onFileChange(e, imageProperty) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File size is too big. Max size is 2MB');
        return;
      }

      // convert image to base64
      const reader = new FileReader();
      reader.onload = e => {
        imageProperty.picture = e.target.result;
      };

      reader.onerror = error => {
        console.error('Error: ', error);
      };
      reader.readAsDataURL(file);
    },
    deleteInfo(id) {
      this.infoText = this.infoText.filter(info => info.id !== id);
    },
    deleteCard(id) {
      this.pageData.cards = this.pageData.cards.filter(card => card.id !== id);
    },
    addInfo() {
      if (!this.pageData.infoText) {
        this.pageData.infoText = [];
      }
      this.infoText.push({
        id: Date.now(),
        title: '',
        content: '',
        picture: ''
      });
    },
    addCard() {
      if (!this.pageData.cards) {
        this.pageData.cards = [];
      }
      this.pageData.cards.push({
        id: Date.now(),
        title: '',
        text: '',
        picture: ''
      });
    },
    savePage() {
      if (this.new) {
        this.pageData.infoText = this.infoText;
        axios.post('/pages', this.pageData, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.pageData.infoText = this.infoText;
      axios.put(`/pages/${this.pageData.id}`, this.pageData, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }

};

</script>

<style>
@import 'EditPage.scss'
</style>
