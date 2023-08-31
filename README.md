# ConSpace

![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![License](https://img.shields.io/github/license/VladimirV99/Projektor?style=for-the-badge)

ConSpace is a microservice application for managing conferences. It supports showing all conference details and giving you the option to track your chosen seminars and network with conference speakers.

## Required software
- .NET 6
- Docker
- Node.js

## Running the application
1. Run docker compose in the solution directory:
   ```
   docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up -d --build
   ```
3. Start the client:
   ```
   cd client
   npm install
   npm run dev
   ```
4. To stop the application run:
   ```
   docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml down
   ```

## Services

### Identity

Identity server handles user and role management.  
Authentication is done using JWT and refresh tokens, while authorization is done using roles.  
Supported roles are `Administrator`, `Speaker` and `User`.

### User

User service manages the actions such as creating your own seminar schedule, adding notes and creating/receiving invites for meet-ups.

User is created in this service via its gRPC communication with Identity service.
User and Conference service communicate via RabbitMQ.

### Conference
Conference service manages the conference details such as seminars, speakers, exhibitors and FAQs.

## Authors
- [Milica Radojicic, 1043/2021](https://github.com/milicar7)
- [Ana Nikacevic, 1076/2021](https://github.com/AnaNika10)
- [Marija Lakic, 1059/2021](https://github.com/marijal74)

## License
Licensed under the [MIT](https://github.com/VladimirV99/Projektor/blob/main/LICENSE) license.
