<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>Buttons</span>
          </div>
        </template>
        <div style="margin-bottom: 50px">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/documentation/index">
              Documentation
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn light-blue-btn" to="/icon/index"> Icons </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn pink-btn" to="/excel/export-excel"> Excel </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn green-btn" to="/table/complex-table"> Table </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn tiffany-btn" to="/example/create"> Form </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn yellow-btn" to="/theme/index"> Theme </router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>

    <el-row :gutter="20" style="margin-top: 50px">
      <el-col :span="6">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>Entrada de Material Design</span>
            </div>
          </template>
          <div style="height: 100px">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <md-input
                  v-model="demo.title"
                  :icon="IconSearch"
                  name="title"
                  placeholder="Introduce el título"
                >
                  Título
                </md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>Efecto hover en imágenes</span>
            </div>
          </template>
          <div class="component-item">
            <pan-thumb
              width="100px"
              height="100px"
              image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"
            >
              vue-element-admin
            </pan-thumb>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>Directiva v-waves de ondas de agua</span>
            </div>
          </template>
          <div class="component-item">
            <el-button type="primary">
              <span class="text" v-waves>Efecto de ondas de agua</span>
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>hover text</span>
            </div>
          </template>
          <div class="component-item">
            <mallki class-name="mallki-text" text="vue-element-admin" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 50px">
      <el-col :span="8">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>Share</span>
            </div>
          </template>
          <div class="component-item" style="height: 420px">
            <dropdown-menu
              :items="articleList"
              style="margin: 0 auto"
              title="Artículos de la serie"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { defineComponent, markRaw } from 'vue'
  import PanThumb from '@/components/PanThumb/index.vue'
  import MdInput from '@/components/MDinput/index.vue'
  import Mallki from '@/components/TextHoverEffect/Mallki.vue'
  import DropdownMenu from '@/components/Share/DropdownMenu.vue'
  import waves from '@/directive/waves' // Directiva de ondas
  import { Search as IconSearch } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'ComponentMixinDemo',
    components: {
      PanThumb,
      MdInput,
      Mallki,
      DropdownMenu,
    },
    directives: {
      waves,
    },
    data() {
      const validate = (rule, value, callback) => {
        if (value.length !== 6) {
          callback(new Error('Por favor, introduzca 6 caracteres'))
        } else {
          callback()
        }
      }
      return {
        IconSearch: markRaw(IconSearch),
        demo: {
          title: '',
        },
        demoRules: {
          title: [{ required: true, trigger: 'change', validator: validate }],
        },
        articleList: [
          { title: 'Capítulo básico', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
          {
            title: 'Capítulo de permisos de inicio de sesión',
            href: 'https://juejin.im/post/591aa14f570c35006961acac',
          },
          { title: 'Capítulo práctico', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
          {
            title: 'Capítulo de vue-admin-template',
            href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56',
          },
          { title: 'Capítulo de v4.0', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
          {
            title: 'Uso elegante de iconos',
            href: 'https://juejin.im/post/59bb864b5188257e7a427c09',
          },
        ],
      }
    },
  })
</script>

<style scoped>
  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }
  .component-item {
    min-height: 100px;
  }
</style>
