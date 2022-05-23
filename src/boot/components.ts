import { boot } from 'quasar/wrappers';
import { defineAsyncComponent } from 'vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component(
    'dynamic-def',
    defineAsyncComponent(() => import('components/DynamicDef.vue'))
  );
  app.component(
    'dynamic-form',
    defineAsyncComponent(() => import('components/DynamicForm.vue'))
  );
  app.component(
    'dynamic-item',
    defineAsyncComponent(() => import('components/DynamicItem.vue'))
  );
  app.component(
    'dynamic-items',
    defineAsyncComponent(() => import('components/DynamicItems.vue'))
  );
});
