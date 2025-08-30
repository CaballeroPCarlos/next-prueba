# 📘 Proyecto Next.js + Prisma (con PostgreSQL)

Este proyecto contiene una configuración base para iniciar un desarrollo web utilizando **Next.js** y **Prisma** como ORM para bases de datos (probado con **Neon Postgres**).

---

## 🚀 Configuración Inicial

### 1. Abrir la terminal
Puedes abrir PowerShell de dos formas:
- Dentro de **Visual Studio Code**: `Ctrl + Shift + Ñ`  
- Desde el **Explorador de archivos**: `Shift + clic derecho` sobre la carpeta del proyecto → “Abrir PowerShell aquí”

### 2. Instalar Node.js
Descarga e instala desde:  
👉 [https://nodejs.org/es](https://nodejs.org/es) (archivo `.msi` recomendado).

Si es necesario, habilita la ejecución de scripts en PowerShell:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
````

### 3. Crear un nuevo proyecto

```powershell
npx create-next-app@latest next-vacio
```

* Reemplaza **`next-vacio`** con el nombre de tu proyecto.
* Presiona **Y** para confirmar.
* Selecciona **No** en todas las opciones si deseas un proyecto limpio.

Entra a la carpeta del proyecto:

```powershell
cd next-vacio
```

Si clonaste el proyecto desde GitHub, solo ejecuta:

```powershell
npm install
```

### 4. Iniciar el servidor de desarrollo

```powershell
npm run dev
```

Abre tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 🧼 Limpieza Inicial (opcional)

Puedes eliminar archivos innecesarios para tener un proyecto más limpio:

* `public/next.svg`
* `public/vercel.svg`
* `styles/Home.module.css`

---

## 🖌️ Archivos Clave

* `styles/globals.css`: define los estilos globales.
* `pages/index.js`: página principal (puede quedar solo con la función `Home()`).
* `_document.js`: modifica el `<head>` del HTML; útil para agregar Bootstrap u otros estilos externos.
Perfecto 🙌, te lo dejo corregido y formateado para que quede claro en el **README.md**:
* `_app.js`: puedes agregar lo siguiente para que la aplicación sea "**responsiva**":

```javascript
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

---

## 🛢️ Uso de Base de Datos con Prisma

### 1. Instalar Prisma

```powershell
npm install prisma --save-dev
npx prisma init
npm install @prisma/client
```

Esto generará:

* `.env` → contiene la variable `DATABASE_URL`
* `prisma/schema.prisma` → define tu modelo de datos

### 2. Configurar `schema.prisma`

Ejemplo:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Persona {
  id     Int    @id @default(autoincrement())
  nombre String
  edad   Int
}
```

En el archivo `.env`, reemplaza el valor de `DATABASE_URL` por la cadena de conexión de tu base de datos.

---

## 🔧 Script de build para Vercel

En `package.json`, asegúrate de incluir:

```json
"scripts": {
  "build": "prisma generate && prisma migrate deploy && next build"
}
```

---

## 🛠️ Migraciones

Crear o sincronizar las tablas en (con) la base de datos (con los `model`s definidos en `schema.prisma`):

```powershell
npx prisma migrate dev --name init
```

Cada vez que modifiques el esquema, ejecuta:

```powershell
npx prisma generate
```

---

✅ Con estos pasos, tu entorno estará listo para comenzar a desarrollar una app moderna con **Next.js** y **Prisma** conectada a una base de datos **PostgreSQL**.
