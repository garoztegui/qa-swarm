# QA Swarm Lab

Base de un proyecto TypeScript para trabajar con agentes de QA.

## Estructura

```text
src/
├── agents/
│   ├── qa-analyst.ts
│   ├── automation-engineer.ts
│   └── qa-reviewer.ts
├── orchestrator.ts
└── index.ts
tests/
reports/
.env
.gitignore
package.json
README.md
```

También se conservan `tsconfig.json` y `package-lock.json` existentes.
Los archivos `.gitkeep` permiten versionar las carpetas inicialmente vacías.

## Primera instalación

### Requisitos

- Git para clonar el repositorio.
- Node.js 22 o superior y npm. Verificar con `node --version` y `npm --version`.
- Una clave de API de OpenAI con acceso a la API. La ejecución del swarm realiza llamadas a OpenAI y puede generar costos.

### Preparar y ejecutar

1. Clonar el repositorio y entrar en su carpeta:

   ```sh
   git clone <URL-del-repositorio>
   cd qa-swarm
   ```

2. Instalar las dependencias fijadas en `package-lock.json`:

   ```sh
   npm ci
   ```

3. Crear un archivo `.env` en la raíz del proyecto con la clave de API:

   ```dotenv
   OPENAI_API_KEY=tu_clave_de_api
   ```

   Reemplazar el valor por una clave real. El archivo está excluido de Git.

4. Verificar los tipos y ejecutar el swarm:

   ```sh
   npm run typecheck
   npm run dev
   ```

   El programa procesa el requisito de ejemplo definido en `src/index.ts` y muestra el análisis, la propuesta de automatización y la revisión en la consola.

En PowerShell, si la política de ejecución bloquea `npm.ps1`, usar `npm.cmd` en lugar de `npm` en los comandos anteriores.

## Estado inicial

El punto de entrada carga `.env` y ejecuta los tres agentes en secuencia. Las
pruebas de Playwright se proponen en el informe; el swarm no las ejecuta.

Agregar las pruebas en `tests/` y los reportes generados en `reports/`.
El comando `npm test` conserva el marcador original y fallará hasta configurar
las pruebas. `.env` y los reportes generados están excluidos de Git.

## para iniciar codex en YOLO

codex --sandbox danger-full-access --ask-for-approval never

npx tsx src/index.ts