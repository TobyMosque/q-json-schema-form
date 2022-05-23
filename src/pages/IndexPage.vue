<template>
  <q-page class="row items-center justify-evenly">
    <dynamic-form
      :properties="properties"
      :defs="defs"
      v-model="model"
    ></dynamic-form>
    <q-markdown :src="code"></q-markdown>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import schema from './schema.json';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const properties = ref(schema.properties);
    const defs = ref(schema.$defs);
    const model = ref({});
    const code = computed(() => {
      return `\`\`\`json
${JSON.stringify(model.value, null, 2)}
\`\`\``;
    });
    return { properties, defs, model, code };
  },
});
</script>
