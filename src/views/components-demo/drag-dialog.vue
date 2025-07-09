<template>
  <div class="components-container">
    <el-button type="primary" @click="dialogTableVisible = true"> open a Drag Dialog </el-button>
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <div v-el-drag-dialog>
        <el-select ref="select" v-model="value" placeholder="Por favor seleccione">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
  import emitter from 'tiny-emitter/instance'

  export default defineComponent({
    name: 'DragDialogDemo',
    directives: { elDragDialog },
    data() {
      return {
        dialogTableVisible: false,
        options: [
          { value: 'Opción1', label: 'Pastel de oro' },
          { value: 'Opción2', label: 'Leche de doble piel' },
          { value: 'Opción3', label: 'Tortilla de ostras' },
          { value: 'Opción4', label: 'Fideos barba de dragón' },
        ],
        value: '',
        gridData: [
          {
            date: '2016-05-02',
            name: 'John Smith',
            address: 'No.1518,  Jinshajiang Road, Putuo District',
          },
          {
            date: '2016-05-04',
            name: 'John Smith',
            address: 'No.1518,  Jinshajiang Road, Putuo District',
          },
          {
            date: '2016-05-01',
            name: 'John Smith',
            address: 'No.1518,  Jinshajiang Road, Putuo District',
          },
          {
            date: '2016-05-03',
            name: 'John Smith',
            address: 'No.1518,  Jinshajiang Road, Putuo District',
          },
        ],
      }
    },
    mounted() {
      emitter.on('elDialogDragDialog', this.handleDrag)
    },
    beforeUnmount() {
      emitter.off('elDialogDragDialog', this.handleDrag)
    },
    methods: {
      // v-el-drag-dialog onDrag callback function
      handleDrag() {
        console.log('handleDrag')
        this.$refs.select.blur()
      },
    },
  })
</script>
