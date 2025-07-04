<template>
  <div class="min-h-screen w-full bg-[#2d3a4b] overflow-hidden flex items-center justify-center">
    <form
      @submit.prevent="handleLogin"
      autocomplete="on"
      class="relative w-full max-w-[520px] px-8 pt-40"
    >
      <div class="text-[26px] text-[#eee] font-bold text-center mb-10">Login Form</div>

      <!-- Username -->
      <div
        class="flex items-center border border-white/10 bg-black/10 rounded-md mb-4 text-[#454545] overflow-hidden"
      >
        <span class="px-4 py-2 text-[#889aa4]">
          <svg-icon icon-class="user" />
        </span>
        <input
          v-model="loginForm.username"
          type="text"
          name="username"
          placeholder="Username"
          class="bg-transparent outline-none text-white w-full py-3 px-4 caret-white autofill:shadow-[inset_0_0_0_1000px_#283443] autofill:text-white"
          autocomplete="on"
        />
      </div>

      <!-- Password -->
      <div
        class="relative flex items-center border border-white/10 bg-black/10 rounded-md mb-6 text-[#454545] overflow-hidden"
      >
        <span class="px-4 py-2 text-[#889aa4]">
          <svg-icon icon-class="password" />
        </span>
        <input
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          placeholder="Password"
          class="bg-transparent outline-none text-white w-full py-3 px-4 caret-white"
          autocomplete="on"
          @keyup="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter="handleLogin"
        />
        <span
          class="absolute right-3 inset-y-0 flex items-center text-[#889aa4] cursor-pointer select-none"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </div>

      <!-- Tooltip -->
      <p v-if="capsTooltip" class="text-yellow-300 text-sm mb-2">Caps lock is On</p>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white py-3 rounded-md mb-6 hover:bg-blue-600 disabled:opacity-60 cursor-pointer"
      >
        <span v-if="!loading">Login</span>
        <span v-else>Loading...</span>
      </button>

      <!-- Demo tips -->
      <div class="relative text-white text-sm space-y-2">
        <div>
          <span class="mr-4">Username: admin</span>
          <span>Password: any</span>
        </div>
        <div>
          <span class="mr-4">Username: editor</span>
          <span>Password: any</span>
        </div>

        <!-- Third-party button -->
        <button
          type="button"
          class="absolute right-0 bottom-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 hidden sm:block cursor-pointer"
          @click="showDialog = true"
        >
          Or connect with
        </button>
      </div>
    </form>

    <el-dialog title="Or connect with" v-model="showDialog">
      Can not be simulated on local, so please combine your own business simulation!!!
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
