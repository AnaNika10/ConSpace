### Route mappings

All routing is configured in `ocelot.json` file. It contains an array of route mappings (Routes object). Each route is 
defined by an upstream and a downstream. Upstream is the endpoint exposed to the client app and downstream is the actual
 url to the underlying service.

Routes are defined in following order:
* public API 
* private API
  * Identity service
  * User service
  * Conference service

### Updating API gateway routes

Every time a change to the route is done, it is needed for docker to rebuild the apigateway image.
Stopping a specific container (apigateway) using docker-compose:

`docker-compose stop apigateway`

Rebuilding the docker image and starting apigateway:

`docker-compose up -d --no-deps --build apigateway`

### Testing

Testing can be done using Postman where the apigateway url is `localhost:8001`.

#### Roles and Identity server
Using custom claims because of: https://stackoverflow.com/a/56850496