
<template>
  <section class="account-view" v-if="user">
    <figure>
      <img :src="'data:image/jpeg;base64,' + user.img" alt="Profile Picture" class="profile-picture">
    </figure>

    <ul>
      <li v-if="!isEditingProfileInfo"><strong>Username:</strong> {{ user.username }}</li>
      <li v-else><strong>Username:</strong> <input v-model="user.username"></li>
      <li v-if="!isEditingProfileInfo"><strong>Email:</strong> {{ user.email }}</li>
      <li v-else><strong>Email:</strong> <input v-model="user.email"></li>
      <li v-if="!isEditingProfileInfo"><strong>Phone Number:</strong> {{ user.phoneNumber }}</li>
      <li v-else><strong>Phone Number:</strong> <input v-model="user.phoneNumber"></li>
      <li v-if="!isEditingProfileInfo"><strong>Address:</strong> {{ user.address }}</li>
      <li v-else><strong>Address:</strong> <input v-model="user.address"></li>
      <li v-if="isEditingProfileInfo">
        <button class="small-button" @click="onDoneButtonClick">Done</button>
        <button class="small-button" @click="onCancelButtonClick">Cancel</button>
      </li>
      
      <li v-if="!isChangingPassword"><strong>Password:</strong> ********</li>
      <li v-else>
        <strong>Current Password:</strong> <input type="password" v-model="currentPassword">
        <strong>New Password:</strong> <input type="password" v-model="newPassword">
      </li>
      <li v-if="isChangingPassword">
        <button class="small-button" @click="onConfirmButtonClick">Confirm</button>
        <button class="small-button" @click="onCancelButtonClick">Cancel</button>
      </li>
    </ul>

    <button @click="onEditProfilePictureButtonClick">Edit Profile Picture</button> 
    <input type="file" ref="fileInput" @change="onFileInputChange" style="display: none;"> 

    <button @click="onEditProfileInfoButtonClick">Edit Profile Info</button>

    <button @click="onChangePasswordButtonClick">Change Password</button> 
  </section>
  <p v-else>Loading...</p>
</template>
  
<script>
import axios from '../../axios-auth.js';
import { useAuthStore } from '../../stores/auth.js';
import { requestHeader } from '@/helpers/requestHeader.js'

export default {
  name: 'AccountView',
  data() {
    return {
      user: null,
      tempUser: null,
      isEditingProfileInfo: false,
      isChangingPassword: false,
      currentPassword: '',
      newPassword: '',
      token: null,
    };
  },
  async mounted() {
    const authStore = useAuthStore();
    this.token = authStore.getJwt;
    const userId = authStore.getUserId;

    try {
      const response = await axios.get(`/users/${userId}`, {
        headers: requestHeader(),
      });
      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
  onCancelButtonClick() {
    this.user = this.tempUser;
    this.currentPassword = '';
    this.newPassword = '';
    this.isEditingProfileInfo = false;
    this.isChangingPassword = false;
  },

  onChangePasswordButtonClick() {
    this.tempUser = { ...this.user };
    this.isChangingPassword = true;
  },

  async onConfirmButtonClick() {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/changePassword`, {
        id: this.user.id,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      }, {
        headers: requestHeader(),
      });

      this.isChangingPassword = false;
      this.currentPassword = '';
      this.newPassword = '';
    } catch (error) {
      console.error(error);
    }
  },

  onEditProfileInfoButtonClick() {
    this.tempUser = { ...this.user };
    this.isEditingProfileInfo = true;
  },

  async onDoneButtonClick() {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users`, {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
        role: this.user.role,
      }, {
        headers: requestHeader(),
      });

      this.isEditingProfileInfo = false;
      this.currentPassword = '';
      this.newPassword = '';
    } catch (error) {
      console.error(error);
    }
  },
  
  onEditProfilePictureButtonClick() {
    this.$refs.fileInput.click();
  },

  async onFileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/users/uploadProfilePicture`, {
          id: this.user.id,
          base64Image,
        }, {
          headers: requestHeader(),
        });

        this.user.img = base64Image;
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsDataURL(file);
  },
},
};
</script>
  
<style scoped>
@import url(./account.scss);
</style>
