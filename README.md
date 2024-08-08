# Sistema de Gestión de Biblioteca

Este proyecto es un sistema de gestión de biblioteca que permite a los usuarios registrarse, iniciar sesión, buscar libros, reservar libros, gestionar préstamos y devoluciones, recibir notificaciones de vencimiento de préstamos, y generar reportes de uso de la biblioteca.

## Funcionalidades

- **Registro y login de usuarios**: Los usuarios pueden registrarse y luego iniciar sesión en el sistema.
- **Dashboard**: Visualización de un resumen de los préstamos actuales.
- **Búsqueda de libros**: Los usuarios pueden buscar libros disponibles en la biblioteca.
- **Reserva de libros**: Los usuarios pueden reservar libros.
- **Gestión de préstamos y devoluciones**: Los administradores pueden gestionar los préstamos y devoluciones de libros.
- **Notificaciones de vencimiento de préstamos**: Los usuarios reciben notificaciones cuando sus préstamos están a punto de vencer.
- **Generación de reportes**: Los administradores pueden generar reportes de uso de la biblioteca.

## Requisitos

- Node.js
- PostgreSQL

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/Aldair2003/Sistema-Gestion-Biblioteca.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd Sistema-Gestion-Biblioteca
    ```

3. Instala las dependencias del backend:
    ```sh
    npm install
    ```

4. Configura las variables de entorno en un archivo `.env`:
    ```
    PORT=3001
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=library_management
    DB_PASSWORD=123456
    DB_PORT=5432
    JWT_SECRET=un_secreto_muy_seguro
    ```

5. Configura la base de datos PostgreSQL:
    ```sql
    CREATE DATABASE library_management;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT,
        available BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE loans (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        user_id INTEGER REFERENCES users(id),
        due_date DATE,
        status VARCHAR(50) DEFAULT 'pending'
    );

    CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        user_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE reports (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        period VARCHAR(255)
    );

    INSERT INTO books (title, author, description) VALUES
    ('Código Limpio', 'Robert C. Martin', 'Libro sobre buenas prácticas de programación'),
    ('El Programador Pragmático', 'Andrew Hunt', 'Guía sobre desarrollo de software profesional'),
    ('Introducción a los Algoritmos', 'Thomas H. Cormen', 'Libro de texto sobre algoritmos y estructuras de datos');
    ```

6. Inicia el servidor backend:
    ```sh
    npm start
    ```

7. Navega al directorio del frontend:
    ```sh
    cd frontend
    ```

8. Instala las dependencias del frontend:
    ```sh
    npm install
    ```

9. Inicia el servidor frontend:
    ```sh
    npm start
    ```

## Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
```sh
npm test
