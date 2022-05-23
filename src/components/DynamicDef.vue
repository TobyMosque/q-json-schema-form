<template>
  <div>
    <dynamic-form
      :properties="properties"
      :defs="_defs"
      :name="_name"
      v-model="_model"
    ></dynamic-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicDef',
  props: {
    def: String,
    defs: Object,
    name: String,
    modelValue: Object,
  },
  setup(props, { emit }) {
    const _def = computed(() => props.def);
    const _name = computed(() => props.name);
    const _defs = computed<any>(() => props.defs);
    const properties = computed(() =>
      _def.value
        ? _defs.value[_def.value.replace('#/$defs/', '')].properties
        : {}
    );

    let _model = computed<any>({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return {
      _model,
      _defs,
      _name,
      properties,
    };
  },
});
</script>
