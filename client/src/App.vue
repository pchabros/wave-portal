<template>
  <Navbar
    title="Wave Portal"
    :connectAccount="connectAccount"
    :isConnected="isConnected"
    :contract="wavePortalContract"
  />
  <div v-if="!isConnected" class="message">
    Please login by connecting your wallet.
  </div>
  <div v-else class="wall">
    <Post
      v-for="(post, i) in posts"
      :key="i"
      :author="post.author"
      :content="post.content"
      :contract="wavePortalContract"
    />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Post from "./components/Post.vue";
import { ethers } from "ethers";
import WavePortalContract from "./artifacts/contracts/WavePortal.sol/WavePortal.json";
import addresses from "./.env/contract-addresses.json";

export default {
  name: "App",
  components: {
    Navbar,
    Post,
  },
  data() {
    return {
      isConnected: false,
      wavePortalContract: null,
      posts: [],
    };
  },
  methods: {
    connectAccount: async function () {
      try {
        if (!window.ethereum) {
          alert("Get Metamask!");
          return;
        }
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addresses.length !== 0) {
          this.isConnected = true;
          this.createContracts();
          this.fetchPosts();
        }
      } catch (error) {
        console.log(error);
      }
    },
    createContracts: async function () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          addresses.waveContract,
          WavePortalContract.abi,
          signer
        );
        wavePortalContract.on("NewPost", this.appendPost);
        this.wavePortalContract = wavePortalContract;
      } catch (error) {
        console.log(error);
      }
    },
    fetchPosts: async function () {
      const posts = await this.wavePortalContract.getAllPosts();
      posts.forEach(this.appendPost);
    },
    appendPost: function (post) {
      this.posts.push(post);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.message {
  margin-top: 40vh;
  font-size: 20px;
}
</style>
