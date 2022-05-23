<template>
  <q-card>
    <q-card-section v-for="(_, index) of _model" :key="index">
      <template v-if="_items.type">
        <dynamic-item
          :type="_items.type"
          :name="_name"
          v-model="_model[index]"
        ></dynamic-item>
      </template>
      <template v-if="_items.$ref">
        <dynamic-def
          :def="_items.$ref"
          :defs="_defs"
          :name="_name"
          v-model="_model[index]"
        ></dynamic-def>
      </template>
    </q-card-section>
    <q-card-actions>
      <q-btn :label="'Add ' + _name" @click="add"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicItems',
  props: {
    items: Object,
    defs: Object,
    name: String,
    modelValue: Array,
  },
  setup(props, { emit }) {
    const _items = computed<any>(() => props.items);
    const _defs = computed(() => props.defs);
    const _name = computed(() => props.name);

    let _model = computed<any[]>({
      get() {
        return props.modelValue || [];
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return {
      _model,
      _items,
      _defs,
      _name,
      add() {
        if (_items.value.$ref) {
          _model.value.push({});
        }
        if (_items.value.type) {
          switch (_items.value.type) {
            case 'string':
              _model.value.push('');
              break;
            case 'boolean':
              _model.value.push(false);
              break;
          }
        }
      },
    };
  },
});
</script>
