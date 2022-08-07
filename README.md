# RESTful API Consulting

## Estructura de proyecto

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentación

Para ver la lista de API disponibles y sus especificaciones, ejecute el servidor y vaya a `http://localhost:3000/v1/docs` en su navegador. Esta página de documentación se genera automáticamente usando las definiciones [swagger](https://swagger.io/) escritas como comentarios en los archivos de ruta.

### API Endpoints

Lista de rutas disponibles:

**Rutas de publicaciones**:\
`POST /v1/posts` - create a post
`GET /v1/posts` - get all posts
`GET /v1/posts/:postId` - get post
`PATCH /v1/posts/:postId` - update post
`DELETE /v1/posts/:postId` - delete post

## Manejo de errores

El middleware de manejo de errores envía una respuesta de error, que tiene el siguiente formato:

```json
{
  "code": 404,
  "message": "Not found"
}
```