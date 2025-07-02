<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target="_blank"
      href="https://vue3-element-admin-site.midfar.com/zh/guide/essentials/router-and-nav.html">Documentación en chino</a>
    <a class="document-btn" target="_blank"
      href="https://github.com/midfar/vue3-element-admin">Repositorio en Github</a>
    <dropdown-menu class="document-btn" :items="articleList" title="Artículos de la serie" />
    <!-- <a class="document-btn" target="_blank" href="https://vue3-element-admin-site.midfar.com/zh/job/">Reclutamiento interno</a> -->
  </div>
</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: 'Parte básica', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: 'Parte de permisos de inicio de sesión', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: 'Parte práctica', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'Parte de plantilla vue-admin', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'Parte v4.0', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: 'Componente personalizado', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: 'Uso elegante de iconos', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' }
        // { title: 'webpack4 (primera parte)', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        // { title: 'webpack4 (segunda parte)', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ]
    };
  },
  created() {
    console.log('documentation created');
  }
});
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
