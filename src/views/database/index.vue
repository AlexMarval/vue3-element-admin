<template>
  <div class="bg-[#f5f7fa] min-h-screen py-8 px-4">
    <div class="max-w-3xl ml-0 md:ml-8">
      <div class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg">
        <div class="flex items-center px-6 py-4 border-b border-gray-100">
          <svg-icon icon-class="database" class-name="text-blue-500 mr-3 text-[32px]" />
          <h1 class="text-xl font-bold text-gray-800">Configuración de Base de Datos</h1>
        </div>
        <form @submit.prevent="handleCheck" class="px-6 py-6">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
            <label for="host" class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Host</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.host"
                id="host"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="localhost"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Ejemplo: localhost o IP del servidor.</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
            <label
              for="instance"
              class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Instancia</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.instance"
                id="instance"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="Instancia opcional"
              />
              <p class="text-xs text-gray-400 mt-1">Nombre de la instancia (si aplica).</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
            <label
              for="database"
              class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Base de datos</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.database"
                id="database"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="Nombre de la base de datos"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Nombre de la base de datos a conectar.</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
            <label for="user" class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Usuario</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.user"
                id="user"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="root"
                required
              />
              <p class="text-xs text-gray-400 mt-1">
                Usuario con permisos de acceso a la base de datos.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
            <label
              for="password"
              class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Contraseña</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.password"
                id="password"
                type="password"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="••••••"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Contraseña del usuario de la base de datos.</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
            <label for="port" class="md:col-span-3 col-span-1 text-sm font-semibold text-gray-700"
              >Puerto</label
            >
            <div class="md:col-span-6 col-span-1">
              <input
                v-model="form.port"
                id="port"
                type="number"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="3306"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Puerto por defecto: 3306 (MySQL).</p>
            </div>
          </div>
          <div class="flex justify-end items-center gap-2 mt-8">
            <button
              type="button"
              @click="handleSave"
              class="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-base shadow hover:bg-blue-700 transition"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Guardar
            </button>
            <button
              type="submit"
              class="flex items-center gap-2 bg-gray-100 text-blue-600 px-5 py-2 rounded-lg font-semibold text-base border border-blue-200 shadow hover:bg-blue-50 transition"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
              </svg>
              Check conexión
            </button>
          </div>
        </form>
        <div v-if="checked" class="px-6 pb-4 text-green-600 font-semibold text-center">
          ¡Conexión exitosa!
        </div>
        <div v-if="error" class="px-6 pb-4 text-red-600 font-semibold text-center">
          Error de conexión: {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDatabaseConfig } from './composables/useDatabaseConfig'

  const { form, checked, error, handleSave, handleCheck } = useDatabaseConfig()
</script>
