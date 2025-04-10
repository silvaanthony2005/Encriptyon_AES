# Sistema de Encriptación AES

Este proyecto es un sistema de encriptación y desencriptación basado en el estándar **AES (Advanced Encryption Standard)**. Combina un backend desarrollado en **Django** y un frontend interactivo construido con **React**, proporcionando una interfaz moderna y funcional para proteger datos sensibles.

## Características

- **Encriptación AES**: Soporte para claves de 128, 192 y 256 bits.
- **Desencriptación AES**: Recupera datos encriptados utilizando la clave generada.
- **Frontend interactivo**: Interfaz minimalista y moderna con animaciones y diseño responsivo.
- **Backend robusto**: Implementación segura de encriptación y desencriptación utilizando la biblioteca `cryptography`.
- **Almacenamiento de datos**: Guarda contraseñas encriptadas en una base de datos PostgreSQL.

---

## Tecnologías utilizadas

### **Frontend**
- **React**: Framework de JavaScript para construir interfaces de usuario.
- **CSS**: Estilos personalizados con animaciones y diseño responsivo.

### **Backend**
- **Django**: Framework de Python para el desarrollo del backend.
- **cryptography**: Biblioteca para la encriptación y desencriptación de datos.
- **PostgreSQL**: Base de datos relacional para almacenar contraseñas encriptadas.

---

## Requisitos previos

### **Software necesario**
- Python 3.10 o superior
- Node.js 16 o superior
- PostgreSQL 13 o superior

### **Dependencias del proyecto**

Las dependencias del proyecto están listadas en los archivos `requirements.txt` (para el backend) y `package.json` (para el frontend).

---

## Instalación

### **1. Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/sistema-encriptacion.git
cd sistema-encriptacion
```

### **2. Configurar el backend**

- Crea un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

pip install -r requirements.txt
```

#### **2.1. Configura la base de datos PostgreSQL**
- En el archivo settings.py modifica los datos de tu base de datos
```bash
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "Passwords",
        "USER": "postgres",
        "PASSWORD": "admin",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```

#### **2.2. Aplica las migraciones**
```bash
python manage.py makemigrations
python manage.py migrate
```

### **3. Configurar el frontend**
- ve a la carpeta del frontend:
```bash
cd frontend
```

- Instala las dependencias:
```bash
npm install
```
- Inicia el servidor de desarrollo:
```bash
npm start
```

---

## **Uso**

1. Abre el navegador y accede a http://localhost:3000 para interactuar con la interfaz.
2. Ingresa una contraseña en el campo de texto.
3. Selecciona el tamaño de clave (AES-128, AES-192 o AES-256).
4. Haz clic en "Encriptar" para generar la contraseña encriptada y la clave.
5. Usa la clave generada para desencriptar la contraseña.

---

## **Funcionalidades principales**

### **Frontend**

* Interfaz moderna: Diseño minimalista con animaciones y degradados en tonos azules.
* Inputs estilizados: Campos de entrada con líneas en lugar de bordes.
* Resultados dinámicos: Visualización clara de los datos encriptados, clave generada y tiempo de procesamiento.

### **Backend**

* Encriptación segura: Uso de AES en modo CBC con relleno PKCS7.
* Desencriptación robusta: Validación de datos y manejo de errores.
* Almacenamiento: Guarda contraseñas encriptadas en PostgreSQL.

---

### ***Autor Anthony Silva***

Desarrollador Full Stack apasionado por la seguridad informática y el diseño de interfaces modernas.