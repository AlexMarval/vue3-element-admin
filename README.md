## Introducción

Esta plantilla utiliza las últimas versiones de Vue 3 y el framework UI Element Plus, la herramienta de construcción Vite, gestión de estado con Pinia, gestión de rutas con Vue Router, simulación de datos con MockJS e integración de TypeScript. Las funcionalidades están migradas desde Vue Element Admin. Para más detalles consulta [esta documentación](https://vue3-element-admin-site.midfar.com/zh/guide/essentials/router-and-nav.html).

## Características

- **Última tecnología**: Desarrollado con Vue 3, Vite 3 y otras tecnologías modernas de frontend
- **TypeScript**: Lenguaje JavaScript a nivel de aplicación
- **Mock de datos**: Solución de datos simulados incorporada
- **Permisos**: Generación dinámica de rutas con permisos
- **Componentes**: Varios componentes comunes encapsulados

## Ejemplo en línea

[vue3 element admin](https://vue3-element-admin.midfar.com/)

[element plus](https://element-plus.midfar.com/)

## Preparación
Antes de desarrollar, asegúrate de estar familiarizado con las siguientes tecnologías:

- vue: https://cn.vuejs.org/
- TypeScript: https://www.tslang.cn/index.html
- element-plus: https://element-plus.midfar.com/
- pinia: https://pinia.vuejs.org/zh/
- vue-router: https://router.vuejs.org/zh/

Nota: Lee toda la documentación anterior antes de comenzar. Si vas a usar esto en un proyecto real, modifica el contenido del readme.

## IDEs y plugins recomendados

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactiva los plugins antiguos Vetur y Volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Configuración de Vite

Consulta la [configuración de Vite](https://vitejs.dev/config/).

## Estructura principal

```
- mock // Datos simulados
- public
- src
  - components // Componentes
  - views // Vistas
    - tableTemplates // Módulo de ejemplo
      - index.ts
   - login // Módulo de login
      - index.vue
 - settings.ts // Configuración global
 - main.ts // Archivo principal
-  types // Tipos de TypeScript
- package.json
- CODE_OF_CONDUCT.md // Reglas de desarrollo
- README.md // Manual de uso
```

## Uso

### Asegúrate de tener node >=20. Probado localmente con v20.18.0.

```sh
node -v
```

### Instalar dependencias

```sh
npm install
```

### Modo desarrollo (conexión a servidor de pruebas)

```sh
npm run dev:test
```

### Compilar para pruebas

```sh
npm run build:test
```

### Lint de código [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Navegadores soportados

| Chrome          | Edge            | Firefox         | Safari          | 
| --------------- | --------------- | --------------- | --------------- | 
| Chrome ≥ 85     | Edge ≥ 85       | Firefox ≥ 79    | Safari ≥ 14.1   | 

## Contribuciones

¡Tu contribución es bienvenida! Puedes colaborar de las siguientes formas:

- Contactar a los mantenedores: midfar@qq.com
- Enviar un pull request
- Corregir bugs
- Compartir casos de uso
