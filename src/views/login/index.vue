<template>
  <div class="min-h-screen w-full bg-[#2d3a4b] overflow-hidden flex items-center justify-center">
    <form
      @submit.prevent="handleLogin"
      autocomplete="on"
      class="relative w-full max-w-[520px] px-8 pt-40"
    >
      <div class="text-[26px] text-[#eee] font-bold text-center mb-10">Iniciar sesión</div>

      <!-- Usuario -->
      <base-input
        v-model="loginForm.username"
        icon="user"
        placeholder="Usuario"
        autocomplete="on"
        :container-class="'mb-4'"
      />

      <!-- Contraseña -->
      <base-input
        v-model="loginForm.password"
        :type="passwordType"
        icon="password"
        placeholder="Contraseña"
        autocomplete="on"
        :container-class="'mb-6 relative'"
        @focus="capsTooltip = false"
        @blur="capsTooltip = false"
        @keyup.enter="handleLogin"
      >
        <template #right>
          <span
            class="absolute right-3 inset-y-0 flex items-center text-[#889aa4] cursor-pointer select-none"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </template>
      </base-input>

      <!-- Tooltip -->
      <p v-if="capsTooltip" class="text-yellow-300 text-sm mb-2">Bloq Mayús activado</p>

      <!-- Botón Entrar -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white py-3 rounded-md mb-6 hover:bg-blue-600 disabled:opacity-60 cursor-pointer"
      >
        <span v-if="!loading">Entrar</span>
        <span v-else>Cargando...</span>
      </button>
    </form>

    <el-dialog title="O conecta con" v-model="showDialog">
      No se puede simular en local, ¡combina tu propia lógica de negocio!
      <br /><br /><br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useLogin } from './composables/useLogin'
  import SocialSign from './components/SocialSignin.vue'

  const {
    loginForm,
    passwordType,
    capsTooltip,
    loading,
    showDialog,
    redirect,
    otherQuery,
    checkCapslock,
    showPwd,
    handleLogin,
  } = useLogin()
</script>
