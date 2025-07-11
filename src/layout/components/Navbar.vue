<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSidebar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Tamaño global de los componentes" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <el-icon class="el-icon-caret-bottom" size="small">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>Perfil</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Página Principal</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/midfar/vue3-element-admin">
              <el-dropdown-item>Repositorio</el-dropdown-item>
            </a>
            <a target="_blank" href="https://vue3-element-admin-site.midfar.com/">
              <el-dropdown-item>Documentación</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Cerrar sesión</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'pinia'
  import { useAppStore } from '@/store/modules/app'
  import settingsStore from '@/store/modules/settings'
  import { useAuthStore } from '@/store/modules/user'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import Search from '@/components/HeaderSearch'
  import { defineComponent } from 'vue'
  import { CaretBottom } from '@element-plus/icons-vue'

  export default defineComponent({
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      SizeSelect,
      Search,
      CaretBottom,
    },
    computed: {
      ...mapState(useAppStore, ['device', 'sidebar']),
      ...mapState(settingsStore, ['sidebarLogo']),
      ...mapState(useAuthStore, ['avatar']),
    },
    methods: {
      toggleSidebar() {
        useAppStore().toggleSidebar()
      },
      async logout() {
        await useAuthStore().logout()
      },
    },
  })
</script>

<style lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        line-height: 50px;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          height: 45px;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
