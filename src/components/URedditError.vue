<script setup lang="ts">
import {
  UCard,
  UCardHeader,
  UCardTitle,
  UCardContent,
} from "@/components/card";
import { RefreshCw } from "lucide-vue";
import UButton from "@/components/UButton.vue";

defineProps<{ error: string }>();

const emit = defineEmits(["refresh"]);

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const refreshShortcut = isMac ? "⇧⌘R" : "Ctrl+Shift+R";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <UCard class="w-full max-w-md">
      <UCardHeader>
        <UCardTitle class="text-center text-destructive">Error</UCardTitle>
      </UCardHeader>
      <UCardContent class="text-center space-y-4">
        <p class="text-muted-foreground">{{ error }}</p>

        <div class="bg-muted/50 p-3 rounded-lg">
          <p class="text-sm text-muted-foreground mb-2">
            💡 <strong>Tip:</strong> También puedes recargar presionando
          </p>
          <code class="bg-background px-2 py-1 rounded text-sm font-mono">
            {{ refreshShortcut }}
          </code>
        </div>

        <UButton @click="emit('refresh')" class="w-full">
          <RefreshCw class="h-4 w-4 mr-1 md:mr-2" />
          Reintentar
        </UButton>
      </UCardContent>
    </UCard>
  </div>
</template>
