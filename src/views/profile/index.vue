<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/store/modules/user'
  import UserCard from './components/UserCard.vue'
  import Activity from './components/Activity.vue'
  import Timeline from './components/Timeline.vue'
  import Account from './components/Account.vue'

  const userStore = useAuthStore()
  const { name, avatar, roles } = storeToRefs(userStore)

  const activeTab = ref('activity')

  const user = computed(() => ({
    name: name.value,
    role: roles.value.join(' | '),
    email: 'admin@test.com', // Este email es estático en el código original
    avatar: avatar.value,
  }))
</script>
