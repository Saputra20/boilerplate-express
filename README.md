# boilerplate-express

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/Saputra20/boilerplate-express.git
cd boilerplate-express
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

run migration
```bash
npx sequelize db:migrate
```
run seeder
```bash
npx sequelize db:seed:all
```
run mode development
```bash
npm run dev
```
run nodemon - development
```bash
npm run dev
```
run pm2 
```bash
npm run start
```