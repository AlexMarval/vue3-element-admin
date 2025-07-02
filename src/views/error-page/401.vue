<template>
  <div class="errPage-container">
    <el-button :icon="ArrowLeft" class="pan-back-btn" @click="back">
      Volver
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        gif de origen <a href="https://zh.airbnb.com/" target="_blank">airbnb</a> página
        <h2>No tienes permiso para acceder a esta página</h2>
        <h6>Si tienes alguna queja, contacta a tu supervisor</h6>
        <ul class="list-unstyled">
          <li>O puedes ir a:</li>
          <li class="link-type">
            <router-link to="/dashboard">
              Volver al inicio
            </router-link>
          </li>
          <li class="link-type">
            <a href="https://www.taobao.com/">Explorar libremente</a>
          </li>
          <li><a href="#" @click.prevent="dialogVisible = true">Haz clic para ver la imagen</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Vista rápida">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';
import { markRaw } from 'vue';
import errGif from '@/assets/401_images/401.gif';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Page401',
  data() {
    return {
      ArrowLeft: markRaw(ArrowLeft),
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' });
      } else {
        this.$router.go(-1);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
