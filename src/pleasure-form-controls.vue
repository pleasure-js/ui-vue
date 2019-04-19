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
      @click.native.prevent="submit"
    >
      {{ actionLabel | lang }}
    </el-button>
    <!--
        <el-button
          v-if="cancelable"
          class="full-btn"
          @click.native.prevent="closePrompt(true)"
        >
          {{ $t(form.dismiss) }}
        </el-button>
    -->
  </div>
</template>
<script>
  export default {
    props: {
      actionLabel: {
        type: String,
        default: 'Create'
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
