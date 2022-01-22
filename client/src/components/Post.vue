<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <p class="card-header-author">Author:</p>
        <p class="card-header-key">{{ author }}</p>
      </div>
      <div class="separator"></div>
      <div>
        <icon-button icon="coins" @click="sendMoney" />
      </div>
    </div>
    <div class="card-body">
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";

export default {
  name: "Post",
  components: {
    IconButton,
  },
  props: {
    author: String,
    content: String,
    contract: Object,
  },
  methods: {
    sendMoney: async function () {
      await this.contract.sendMoney(this.author, 1000000000000000);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 3px 3px 10px lightgrey;
  border-radius: 10px;
  padding: 0;
  padding-bottom: 10px;
  margin: 20px 50px;
  &-header {
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 8px lightgrey;
    padding: 0 20px;
    &-left {
      display: flex;
    }
    &-author {
      font-weight: 800;
      padding: 0 10px;
    }
    .separator {
      flex-grow: 1;
    }
  }
  &-body {
    padding: 20px;
  }
}
</style>
