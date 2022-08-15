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

### API Endpoints

Lista de rutas disponibles:

**Rutas de usuarios**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

**Rutas de publicaciones**:\
`POST /v1/posts` - create a post\
`GET /v1/posts` - get all posts\
`GET /v1/posts/:postId` - get post\
`PATCH /v1/posts/:postId` - update post\
`DELETE /v1/posts/:postId` - delete post

Para los metodos de "GET ALL", es posible usar los siguientes metodos para temas de paginación:
- `limit` - limit data\
Ej:
Url: `v1/users?limit=100`
Response: usuarios (con un maximo de 100 datos)

## Manejo de errores

El middleware de manejo de errores envía una respuesta de error, que tiene el siguiente formato:

```json
{
  "code": 404,
  "message": "Not found"
}
```