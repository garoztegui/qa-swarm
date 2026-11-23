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

## Comenzar

1. Instalar las dependencias con `npm install` si todavía no están instaladas.
2. Completar `OPENAI_API_KEY` en `.env` antes de implementar llamadas a OpenAI.
3. Ejecutar `npm run dev` para iniciar el punto de entrada.
4. Ejecutar `npm run typecheck` para verificar los tipos sin generar archivos.

## Estado inicial

El punto de entrada carga `.env` y muestra un mensaje de inicio. Los agentes y
el orquestador contienen únicamente comentarios y módulos vacíos para comenzar
su implementación. Todavía no se realizan llamadas a OpenAI.

Agregar las pruebas en `tests/` y los reportes generados en `reports/`.
El comando `npm test` conserva el marcador original y fallará hasta configurar
las pruebas. `.env` y los reportes generados están excluidos de Git.
