<template>
  <div class="min-h-screen w-full bg-[#2d3a4b] overflow-hidden flex items-center justify-center">
    <form
      @submit.prevent="handleLogin"
      autocomplete="on"
      class="relative w-full max-w-[520px] px-8 pt-40"
    >
      <div class="text-[26px] text-[#eee] font-bold text-center mb-10">Login Form</div>

      <!-- Username -->
      <div class="flex items-center border border-white/10 bg-black/10 rounded-md mb-4 text-[#454545] overflow-hidden">
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
      <div class="relative flex items-center border border-white/10 bg-black/10 rounded-md mb-6 text-[#454545] overflow-hidden">
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
          class="absolute right-3 top-2 text-[#889aa4] cursor-pointer select-none"
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
import { ref, reactive, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validUsername } from '@/utils/validate';
import SocialSign from './components/SocialSignin.vue';
import store from '@/store';

interface QueryType {
  // 自定义key 任意字符串
  [propname: string]: string;
}

const route = useRoute();
const router = useRouter();

const loginForm = reactive({
  username: 'admin',
  password: '111111',
});

const passwordType = ref<'password' | ''>('password');
const capsTooltip = ref(false);
const loading = ref(false);
const showDialog = ref(false);
const redirect = ref<string | undefined>(undefined);
const otherQuery = ref<Record<string, string>>({});

function checkCapslock(e: KeyboardEvent) {
  const { key } = e;
  capsTooltip.value = !!(key && key.length === 1 && key >= 'A' && key <= 'Z');
}

function showPwd() {
  passwordType.value = passwordType.value === 'password' ? '' : 'password';
  nextTick(() => {
    // focus en el input de password si es necesario
  });
}

function handleLogin() {
  // Validación manual
  if (!loginForm.username || !validUsername(loginForm.username)) {
    window.alert('Please enter the correct user name');
    return;
  }
  if (!loginForm.password || loginForm.password.length < 6) {
    window.alert('The password can not be less than 6 digits');
    return;
  }
  loading.value = true;
  store.user().login(loginForm)
    .then(() => {
      router.push({ path: redirect.value || '/', query: otherQuery.value });
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

function getOtherQuery(query: QueryType) {
  return Object.keys(query).reduce((acc: QueryType, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

watch(
  () => route.query,
  (query) => {
    if (query) {
      redirect.value = query.redirect as string;
      otherQuery.value = getOtherQuery(query as QueryType);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // Opcional: focus inicial
});
</script>
