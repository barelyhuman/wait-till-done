<template>
  <div class="font-sans min-h-screen h-full w-full p-2">
    <NuxtPage />
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>
<style global>
:root {
  --dark: #23283d;
  --gray: #8692c1;
  --light: #e9ecf8;
  --accent: #10b981;

  --bg: #fff;
  --fg: var(--dark);
}

@media (prefers-color-scheme: dark) {
  :root {
    --dark: #eceff4;
    --gray: #555;
    --light: #333;
    --accent: #34d399;
    --bg: #181819;
  }
}

html,
body {
  background: var(--bg);
  color: var(--fg);
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-weight: 400;
}

body {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

a {
  color: var(--gray);
}

a:hover {
  color: var(--dark);
  text-decoration: underline;
  cursor: pointer;
}

input {
  width: 100%;
  background: transparent;
  border-radius: 6px;
  padding: 8px;
  outline: black;
  color: var(--dark);
  border: 1px solid var(--light);
}

::placeholder {
  color: var(--gray);
  opacity: 1;
}

button,
.btn {
  cursor: pointer;
  background: transparent;
  border-radius: 6px;
  color: var(--gray);
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid var(--light);
}

button:hover,
.btn:hover {
  border: 1px solid var(--dark);
  color: var(--dark);
}
</style>
