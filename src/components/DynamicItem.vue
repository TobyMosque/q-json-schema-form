<template>
  <template v-if="_type === 'string'">
    <q-input type="text" :label="_name" v-model="_model" />
  </template>
  <template v-if="_type === 'boolean'">
    <q-checkbox type="text" :label="_name" v-model="_model" />
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicItem',
  props: {
    type: String,
    name: String,
    modelValue: [String, Boolean],
  },
  setup(props, { emit }) {
    const _type = computed(() => props.type);
    const _name = computed(() => props.name);
    let _model = computed<any>({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });
    if (_model.value === undefined) {
      switch (_type.value) {
        case 'string':
          _model.value = '';
          break;
        case 'boolean':
          _model.value = false;
          break;
      }
    }

    return {
      _model,
      _name,
      _type,
    };
  },
});
</script>
