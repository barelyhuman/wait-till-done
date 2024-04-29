<script setup>
const user = useUser();
if (!user) {
  await navigateTo("/");
}
</script>
<template></template>
