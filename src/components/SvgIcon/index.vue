<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { isExternal as validateIsExternal } from '@/utils/validate'

  const props = defineProps({
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  })

  const isExternal = computed(() => validateIsExternal(props.iconClass))

  const iconName = computed(() => `#icon-${props.iconClass}`)

  const svgClass = computed(() => {
    if (props.className) {
      return 'svg-icon ' + props.className
    }
    return 'svg-icon'
  })

  const styleExternalIcon = computed(() => ({
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
  }))
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    pointer-events: auto;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
