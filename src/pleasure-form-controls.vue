<template>
  <div class="pleasure-form-controls">
    <el-button
      v-if="formVisible"
      class="full-btn"
      :name="method === 'update' ? 'update' : 'create'"
      :disabled="actionDisabled"
      :loading="loading"
      type="primary"
      native-type="submit"
      @click.native.prevent="actionCallback"
    >
      {{ actionLabel | lang }}
    </el-button>
    <el-button
      v-if="cancelable"
      class="full-btn"
      @click.native.prevent="cancelCallback"
    >
      {{ cancelLabel }}
    </el-button>
  </div>
</template>
<style lang="postcss">
  .pleasure-form-controls {
    margin-top: var(--pleasure-input-gap-between);
  }
</style>
<script>
  export default {
    props: {
      actionCallback: {
        type: Function,
        default () {}
      },
      cancelCallback: {
        type: Function,
        default () {}
      },
      actionLabel: {
        type: String,
        default: 'Create'
      },
      cancelLabel: {
        type: String,
        default: 'Cancel'
      },
      formVisible: {
        type: Boolean,
        default: true
      },
      actionDisabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: `messages.loading`
      },
      method: {
        type: String,
        required: true
      },
      cancelable: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
