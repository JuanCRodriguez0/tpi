# 📸 Fotaza

Fotaza es una aplicación web desarrollada con Node.js, Express, Sequelize y PostgreSQL que permite a los usuarios compartir fotografías, interactuar con publicaciones y gestionar su perfil dentro de una red social orientada al contenido visual.

## ✨ Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Gestión de sesiones.
- Creación de publicaciones con imágenes.
- Carga de múltiples imágenes por publicación.
- Aplicación de marcas de agua (watermarks).
- Sistema de etiquetas (#tags).
- Sistema de comentarios.
- Sistema de valoraciones/interacciones.
- Gestión de perfil de usuario.
- Seguimiento de intereses en publicaciones.
- Búsqueda de usuarios y etiquetas.
- Almacenamiento de información en PostgreSQL.

---

# 🛠️ Tecnologías utilizadas

## Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Frontend

- Pug
- JavaScript

## Librerías

- express
- express-session
- pug
- bcrypt
- pg
- pg-hstore
- sequelize
- dotenv
- sharp

---

# ⚙️ Requisitos previos

Antes de ejecutar el proyecto se debe tener instalado:

- Node.js (versión 18 o superior recomendada)
- PostgreSQL
- npm

Verificar instalación:

```bash
node -v
npm -v
```

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

## 2. Ingresar al directorio

```bash
cd TPI
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

# ▶️ Inicializar la base de datos

```bash
npm run db:init
```

---

# 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto utilizando como referencia `.env.example`.

Contenido:

```env
PORT=3000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=fotaza
DB_PORT=5432

SESSION_KEY=clave_secreta
```

---

# ▶️ Ejecución

```bash
npm run start
```

---

# 🌐 Acceso a la aplicación

Una vez iniciado el servidor:

```text
http://localhost:3000
```

---

# 🧩 Base de datos

La aplicación utiliza Sequelize como ORM.

Al iniciar el servidor se ejecuta automáticamente:

```javascript
sequelize.sync(...)
```

permitiendo sincronizar los modelos con la base de datos.

Los modelos principales son:

- User
- Publication
- Image
- Comment
- Tag
- PublicationTag
- Rating
- Follower
- Message
- PublicationInterest
- PublicationReport

---

# 📋 Flujo básico de uso

1. Registrarse en la plataforma.
2. Iniciar sesión.
3. Crear publicaciones.
4. Agregar imágenes y etiquetas.
5. Interactuar con publicaciones.
6. Comentar publicaciones.
7. Gestionar el perfil personal.

---

# 👨‍💻 Usuario para test

```text
Usuario: test@test.com
Contraseña: test123
```

# 👨‍💻 Autor

Juan Cruz Rodríguez