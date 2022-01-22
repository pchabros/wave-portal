<template>
  <div class="navbar">
    <div class="navbar-panel">
      <div class="navbar-left">
        <p class="navbar-title">{{ title }}</p>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-right">
        <icon-button icon="pen" @click="toggleNewPost" />
        <icon-button
          icon="wallet"
          :isActive="isConnected"
          @click="connectAccount"
        />
      </div>
    </div>
    <div class="navbar-dropdown">
      <div class="new-post" :class="{ 'new-post-visible': newPostVisible }">
        <textarea v-model="newPostContent" />
        <button @click="createPost">Create Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: "Navbar",
  components: {
    IconButton,
  },
  data() {
    return {
      newPostVisible: false,
      newPostContent: "",
    };
  },
  props: {
    title: String,
    connectAccount: Function,
    isConnected: Boolean,
    contract: Object,
  },
  methods: {
    toggleNewPost: function () {
      this.newPostVisible = !this.newPostVisible;
    },
    createPost: async function () {
      const createPostTxn = await this.contract.createPost(
        this.newPostContent,
        { gasLimit: 300000 }
      );
      await createPostTxn.wait();
      this.newPostVisible = false;
      this.newPostContent = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 9;
  height: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 10px lightgrey;
  position: sticky;
  top: 0;
  padding: 0 30px;
  margin: -10px;
  &-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }
  &-title {
    font-size: 20px;
    font-weight: 600;
  }
  &-center {
    flex-grow: 1;
  }
  &-dropdown {
    display: flex;
    justify-content: center;
  }
  .new-post {
    background-color: white;
    box-shadow: 5px 10px 15px lightgrey;
    border-radius: 0 0 10px 10px;
    width: 80%;
    padding: 20px;
    top: 51px;
    transform: scaleY(0);
    transform-origin: top center;
    transition: all 0.2s;
    &-visible {
      transform: scaleY(1);
    }
    textarea {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      padding: 10px;
      width: 95%;
      height: 50px;
      opacity: 0.7;
    }
    button {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      background-color: white;
      border: 1px solid grey;
      border-radius: 5px;
      margin-top: 5px;
    }
  }
}
</style>
