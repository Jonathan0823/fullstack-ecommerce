This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 12.0.0 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [yarn](https://yarnpkg.com/) (optional, if you prefer using yarn)
- [pnpm](https://pnpm.io/) (optional, if you prefer using pnpm)
- [bun](https://bun.sh/) (optional, if you prefer using bun)


### Installation Backend


## 1. Clone the backend repository:

```bash
git clone https://github.com/Jonathan0823/ecommerce-backend.git
```

## 2. Change your directory to the backend project:

```bash
cd fullstack-ecommerce
```

## 3. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 4. Compile and run the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

the backend will be running on [http://localhost:8000](http://localhost:8000)
check the [repository](https://github.com/Jonathan0823/ecommerce-backend) for more information 


### Installation Frontend

## 1. Clone the frontend repository:

```bash
git clone https://github.com/Jonathan0823/fullstack-ecommerce.git
```

## 2. Change your directory to the frontend project:

```bash
cd fullstack-ecommerce
```

## 3. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 4. Change the BACKEND_URL in the /app/lib/constants.ts file to you backend url:

```bash
export const BACKEND_URL = 'http://localhost:8000';
```


## 5. Compile and run the project:

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

the frontend will be running on [http://localhost:3000](http://localhost:3000)

