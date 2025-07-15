<template>
  <div class="bg-[#f5f7fa] min-h-screen py-8 px-4">
    <div class="max-w-3xl ml-0 md:ml-8">
      <div class="bg-white rounded-xl border border-gray-100">
        <div
          class="flex flex-col md:flex-row items-center px-8 py-3 border-b border-gray-100 gap-2"
        >
          <svg-icon icon-class="database" class-name="text-blue-500 mr-2 text-[32px]" />
          <div>
            <h1 class="text-xl font-bold text-gray-800 mb-0.5">Configuración de Base de Datos</h1>
            <p class="text-gray-500 text-xs">
              Completa los datos para conectar tu base de datos SQL. Todos los campos son
              obligatorios salvo instancia.
            </p>
          </div>
        </div>
        <form @submit.prevent="handleCheck" class="px-8 py-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="host" class="block text-sm font-semibold text-gray-700 mb-1">Host</label>
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
            <div>
              <label for="instance" class="block text-sm font-semibold text-gray-700 mb-1"
                >Instancia</label
              >
              <input
                v-model="form.instance"
                id="instance"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="Instancia opcional"
              />
              <p class="text-xs text-gray-400 mt-1">Nombre de la instancia (si aplica).</p>
            </div>
            <div>
              <label for="database" class="block text-sm font-semibold text-gray-700 mb-1"
                >Base de datos</label
              >
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
            <div>
              <label for="user" class="block text-sm font-semibold text-gray-700 mb-1"
                >Usuario</label
              >
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
            <div>
              <label
                for="password"
                :class="[
                  'block text-sm font-semibold mb-1',
                  passwordError ? 'text-red-500' : 'text-gray-700',
                ]"
                >Contraseña</label
              >
              <input
                v-model="form.password"
                @input="passwordError = false"
                id="password"
                type="password"
                :class="[
                  'w-full rounded-lg px-4 py-2 focus:outline-none transition-colors duration-300 ease-in-out',
                  passwordError
                    ? 'border border-red-500 focus:border-red-500'
                    : 'border border-gray-300 focus:border-blue-400',
                ]"
                placeholder="••••••••"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Contraseña del usuario de la base de datos.</p>
            </div>
            <div>
              <label for="port" class="block text-sm font-semibold text-gray-700 mb-1"
                >Puerto</label
              >
              <input
                v-model="form.port"
                id="port"
                type="number"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                placeholder="1433"
                required
              />
              <p class="text-xs text-gray-400 mt-1">Puerto por defecto: 1433 (SQL Server).</p>
            </div>
          </div>
        </form>
        <div
          class="flex flex-col md:flex-row justify-end items-center gap-4 px-8 py-4 border-t border-gray-100 bg-white rounded-b-xl"
        >
          <button
            type="button"
            @click="handleSave"
            class="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-base hover:bg-blue-700 transition cursor-pointer"
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
            type="button"
            @click="handleCheck"
            class="flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-lg font-semibold text-base border border-blue-200 hover:bg-blue-100 transition cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16v-1a4 4 0 00-3-3.87V7a1 1 0 10-2 0v4.13A4 4 0 007 15v1"
              />
              <rect x="9" y="18" width="6" height="2" rx="1" />
            </svg>
            Probar conexión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDatabaseConfig } from './composables/useDatabaseConfig'

  const { form, checked, error, handleSave, handleCheck, passwordError } = useDatabaseConfig()
</script>
