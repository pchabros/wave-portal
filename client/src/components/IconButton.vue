<template>
  <button class="button">
    <font-awesome-icon
      class="button-icon"
      :class="{ 'button-icon-active': isActive }"
      :icon="icon"
    />
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  transform: scale(1.3);
  margin: 6px;
  border: none;
  background: none;
  &-icon {
    color: grey;
    &-active {
      color: #2c3e50;
    }
  }
}
</style>
