<template>
  <template v-for="(property, name) in _properties" :key="name">
    <template v-if="property.type === 'array'">
      <dynamic-items
        :items="property.items"
        :defs="_defs"
        :name="name"
        v-model="_model[name]"
      ></dynamic-items>
    </template>
    <template v-else>
      <dynamic-item
        :type="property.type"
        :label="name"
        :name="name"
        v-model="_model[name]"
      ></dynamic-item>
    </template>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicForm ',
  props: {
    properties: Object,
    defs: Object,
    name: String,
    modelValue: Object,
  },
  setup(props, { emit }) {
    const _properties = computed<any>(() => props.properties);
    const _defs = computed(() => props.defs);
    const _name = computed(() => props.name);

    let _model = computed<any>({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    for (const [key, property] of Object.entries<any>(_properties.value)) {
      if (property.type === 'array' && !_model.value[key]) {
        _model.value[key] = [];
      }
    }

    return {
      _model,
      _properties,
      _defs,
      _name,
    };
  },
});
</script>
