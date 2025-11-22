<template>
  <BaseModal :isOpen="isOpen" title="Resume Options" @close="close">
    <p class="mb-6 text-lg">
      Choose how you'd like to access my resume:
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <Button
        variant="primary"
        size="lg"
        class="flex-1"
        @click.stop="handleDownload"
      >
        <template #icon-left>
          <Download :size="20" />
        </template>
        Download PDF
      </Button>
      <Button
        tag="a"
        :href="viewUrl"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="lg"
        class="flex-1"
        @click.stop="close"
      >
        <template #icon-left>
          <ExternalLink :size="20" />
        </template>
        View Online
      </Button>
    </div>
  </BaseModal>
</template>

<script setup>
import { Download, ExternalLink } from 'lucide-vue-next';
import BaseModal from './BaseModal.vue';
import Button from './Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  resumeUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

// Extract file ID from Google Drive URL
const getFileId = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const fileId = getFileId(props.resumeUrl);

const downloadUrl = fileId
  ? `https://drive.google.com/uc?export=download&id=${fileId}`
  : props.resumeUrl;

const viewUrl = props.resumeUrl;

const close = () => {
  emit('close');
};

const handleDownload = () => {
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  close();
};
</script>

<style scoped>
/* Styles are handled by BaseModal component */
</style>

