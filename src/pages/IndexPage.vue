<template>
  <q-page class="row items-center justify-evenly">
    <fieldset>
      <legend>Dynamic Form</legend>
      <dynamic-form
        :properties="properties"
        :defs="defs"
        v-model="model"
      ></dynamic-form>
    </fieldset>
    <fieldset>
      <legend>Output</legend>
      <q-markdown :src="mdCode"></q-markdown>
    </fieldset>
    <fieldset>
      <legend>Schema</legend>
      <q-markdown :src="mdSchema"></q-markdown>
    </fieldset>
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
    const mdCode = computed(() => {
      return `\`\`\`json
${JSON.stringify(model.value, null, 2)}
\`\`\``;
    });
    const mdSchema = computed(() => {
      return `\`\`\`json
${JSON.stringify(schema, null, 2)}
\`\`\``;
    });
    return { properties, defs, model, mdCode, mdSchema };
  },
});
</script>
