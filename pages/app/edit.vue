<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-end gap-2">
      <button @click="updateData()" class="mb-10">Save</button>
    </div>
    <MonacoEditor
      ref="editorRef"
      class="w-full flex-1"
      v-model="value"
      lang="json"
      v-bind:options="editorOptions"
    />
  </div>
</template>

<script lang="ts" setup>
import { addAppThemes } from "@/lib/monaco/theme";

const user = useUser();
if (!user.value?.id) {
  await navigateTo("/");
}

const editorRef = ref(null);
const value = ref("");

onMounted(async () => {
  await fetchInput();
});

async function fetchInput() {
  const data = await $fetch("/api/anime-edit-list");
  value.value = JSON.stringify(data, null, 4);
}

async function updateData() {
  const currentState = JSON.stringify(JSON.parse(value.value), null, 4);
  const newContent = btoa(currentState);
  await $fetch("/api/anime-edit-list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: newContent,
    }),
  });
  await fetchInput();
}

let editorOptions: import("monaco-editor").editor.IStandaloneEditorConstructionOptions =
  {
    cursorSmoothCaretAnimation: "on",
    cursorBlinking: "smooth",
    theme: "vs-dark",
  };

watch(editorRef, () => {
  // @ts-expect-error monaco issues
  if (editorRef.value?.$editor) {
    // @ts-expect-error monaco issues
    const ed = editorRef.value?.$editor;
    addAppThemes(ed);
    ed.setTheme("Sequoia Moonlight");
  }
});
</script>
