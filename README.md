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

**Rutas de paginas**:\
`POST /v1/pages` - create a page\
`GET /v1/pages` - get all pages\
`GET /v1/pages/:pageId` - get page\
`PATCH /v1/pages/:pageId` - update page\
`DELETE /v1/pages/:pageId` - delete page

**Rutas de categorias**:\
`POST /v1/categories` - create a category\
`GET /v1/categories` - get all categories\
`GET /v1/categories/:categoryId` - get category\
`PATCH /v1/categories/:categoryId` - update category\
`DELETE /v1/categories/:categoryId` - delete category

**Rutas de publicaciones**:\
`POST /v1/posts` - create a post\
`GET /v1/posts` - get all posts\
`GET /v1/posts/:postId` - get post\
`PATCH /v1/posts/:postId` - update post\
`DELETE /v1/posts/:postId` - delete post\
`GET /v1/posts/search/:dataToSearch` - get query post data

**Rutas de ordenes**:\
`POST /v1/orders` - create a order\
`GET /v1/orders` - get all orders\
`GET /v1/orders/:orderId` - get order\
`PATCH /v1/orders/:orderId` - update order\
`DELETE /v1/orders/:orderId` - delete order


**Rutas generales**:\
`GET /v1/uploads/:filepath` - get file-model\


Para los metodos de "GET ALL", es posible usar los siguientes metodos para temas de paginación:
- `limit` - limit data\
- `sortBy` - (desc|asc)\
- `page` - (default = 1)\
Ej:
Url: `v1/users?limit=100`\
Response: usuarios (con un maximo de 100 datos)

## Manejo de errores

El middleware de manejo de errores envía una respuesta de error, que tiene el siguiente formato:

```json
{
  "code": 404,
  "message": "Not found"
}
```
