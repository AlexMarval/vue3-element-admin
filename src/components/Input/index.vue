<template>
  <div
    class="flex items-center border border-white/10 bg-black/10 rounded-md mb-4 text-[#454545] overflow-hidden focus-within:border-blue-400 transition-colors duration-200"
    :class="containerClass"
  >
    <span v-if="icon" class="px-4 py-2 text-[#889aa4]">
      <svg-icon :icon-class="icon" />
    </span>
    <input
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="[
        'bg-transparent outline-none text-white w-full py-3 px-4 caret-white',
        'autofill:shadow-[inset_0_0_0_1000px_#283443] autofill:text-white',
        'border-none focus:ring-0',
        inputClass,
      ]"
      v-model="inputValue"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="$emit('update:modelValue', inputValue)"
      @keyup.enter="$emit('enter', $event)"
    />
    <slot name="right" />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  /**
   * BaseInput - Un input reutilizable y estilizado para formularios.
   * @prop {string | number} modelValue - Valor del input (v-model)
   * @prop {string} icon - Nombre del icono SVG opcional a mostrar a la izquierda
   * @prop {string} type - Tipo de input (text, password, email, etc)
   * @prop {string} placeholder - Placeholder del input
   * @prop {string} autocomplete - Autocompletado del input
   * @prop {string} inputClass - Clases extra para el input
   * @prop {string} containerClass - Clases extra para el contenedor
   * @slot right - Slot para contenido a la derecha del input (ej: icono de ojo)
   */
  const props = defineProps({
    /** Valor del input (v-model) */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /** Nombre del icono SVG opcional a mostrar a la izquierda */
    icon: {
      type: String,
      default: '',
    },
    /** Tipo de input (text, password, email, etc) */
    type: {
      type: String,
      default: 'text',
    },
    /** Placeholder del input */
    placeholder: {
      type: String,
      default: '',
    },
    /** Autocompletado del input */
    autocomplete: {
      type: String,
      default: 'on',
    },
    /** Clases extra para el input */
    inputClass: {
      type: String,
      default: '',
    },
    /** Clases extra para el contenedor */
    containerClass: {
      type: String,
      default: '',
    },
  })

  const inputValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    val => {
      inputValue.value = val
    }
  )
</script>
