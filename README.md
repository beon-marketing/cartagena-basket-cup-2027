# Cartagena Basket Cup 2027 — Landing Page

Landing page de pre-inscripción para la **2ª Edición** del torneo, con formulario de captación de leads conectado a Google Sheets.

---

## 🚀 Deploy en Vercel

1. Sube este repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com) → **Add New Project**
3. Importa el repositorio de GitHub
4. Click en **Deploy** (sin configuración extra necesaria)

---

## 📊 Conectar el formulario a Google Sheets

### Paso 1 — Crear la hoja de cálculo

1. Ve a [Google Sheets](https://sheets.google.com) y crea una hoja nueva
2. En la fila 1 añade estas columnas:
   `Timestamp | Nombre | Apellido | Teléfono | Email | Equipo | Cargo | Categorías`

### Paso 2 — Crear el Apps Script

1. En tu hoja, ve a **Extensiones → Apps Script**
2. Borra todo el código y pega esto:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.nombre,
    data.apellido,
    data.telefono,
    data.email,
    data.equipo,
    data.cargo,
    data.categorias
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Guarda el script (Ctrl+S)

### Paso 3 — Desplegar como Web App

1. Click en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo** (tu cuenta de Google)
4. Acceso: **Cualquier usuario** (para que el formulario pueda enviar sin login)
5. Click en **Implementar**
6. **Copia la URL** que te da (empieza por `https://script.google.com/macros/s/...`)

### Paso 4 — Pegar la URL en el código

En `index.html`, busca esta línea (cerca del final):

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Sustitúyela por:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_ID_AQUI/exec';
```

---

## 🖼️ Añadir imágenes reales

En el archivo `index.html`, busca los comentarios `<!-- 📸 IMAGEN -->` para sustituir los placeholders.

Las imágenes del álbum de Google Photos se pueden descargar y subir a:
- Una carpeta `/images/` en este repositorio (máx. recomendado: 500KB por imagen)
- O usar un CDN como Cloudinary, Imgix o Bunny.net

---

## 📁 Estructura del proyecto

```
cartagena-basket-cup-2027/
├── index.html      ← Landing completa (HTML + CSS + JS todo en uno)
└── README.md       ← Este archivo
```

---

## 📞 Contacto del torneo

- **Teléfono:** (+34) 675 86 97 97
- **Email:** cartagenabasketcup@gmail.com
- **Instagram:** @cartagenabasketcup
- **Web:** cartagenabasketcup.com
