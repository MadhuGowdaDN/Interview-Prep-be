src
│
├── common
│   ├── constants
│   ├── decorators
│   │   ├── roles.decorator.ts
│   │   └── current-user.decorator.ts
│   ├── filters
│   │   ├── http-exception.filter.ts
│   ├── guards
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   ├── index.ts
│   └── interceptors
│   │   ├── response.interceptor.ts
│   │   ├── index.ts
│   └── utils
│
├── config
│   └── cookies
│   │   ├── cookie.config.ts
│   └── database
│   │   ├── database.config.ts
│   │   ├── database.module.ts
│   │   ├── mongo.provider.ts
│   │   ├── index.ts
│   └── jwt
│   │   ├── jwt.config.ts
│   │   ├── index.ts
│   ├── index.ts
│
├── modules
│   ├── auth
│   │   ├── controller
│   │   │   ├── auth.controller.ts
│   │   ├── dto
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   ├── service
│   │   │   ├── auth.service.ts
│   │   ├── strategies
│   │   │   └── jwt.strategy.ts
│   │   ├── auth.module.ts
│   │   ├── index.ts
│   │   │
│   ├── users
│   │   ├── controller
│   │   │   ├── user.controller.ts
│   │   │   ├── index.ts
│   │   ├── dto
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   │   ├── index.ts
│   │   ├── repository
│   │   │   ├── user.repository.ts
│   │   │   ├── index.ts
│   │   ├── schemas
│   │   │   ├── user.schema.ts
│   │   │   ├── index.ts
│   │   ├── service
│   │   │   ├── user.service.ts
│   │   ├── user.module.ts
│   │   ├── index.ts
│   ├── assessment-generate
│   │   ├── controller
│   │   │   ├── generate.controller.ts
│   │   │   ├── index.ts
│   │   ├── dto
│   │   │   ├── create-generate.dto.ts
│   │   │   ├── index.ts
│   │   ├── service
│   │   │   ├── generate.service.ts
│   │   ├── generate.module.ts
│   │   ├── index.ts
│   ├── assessments-prepare
│   │   ├── controller
│   │   │   ├── prepare.controller.ts
│   │   │   ├── index.ts
│   │   ├── dto
│   │   │   ├── create-prepare.dto.ts
│   │   │   ├── index.ts
│   │   ├── service
│   │   │   ├── prepare.service.ts
│   │   ├── prepare.module.ts
│   │   ├── index.ts
│   ├── assessments-mapping
│   │   ├── controller
│   │   │   ├── mapping.controller.ts
│   │   │   ├── index.ts
│   │   ├── dto
│   │   │   ├── create-mapping.dto.ts
│   │   │   ├── index.ts
│   │   ├── service
│   │   │   ├── mapping.service.ts
│   │   ├── mapping.module.ts
│   │   ├── index.ts
│   ├── assessments
│   │