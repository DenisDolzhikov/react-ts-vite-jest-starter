import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser, { OptionsJson } from 'body-parser';
// import prisma from './configs/prisma.config';
import { PrismaClient } from '@prisma/client';

import { router as postRouter } from './routes/post.router';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const prisma = new PrismaClient();

app.use(express.static(__filename));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//PRISMA TEST

async function main() {
  await prisma.user.create({
    data: {
      name: 'Rich',
      email: 'hello@prisma.com',
      posts: {
        create: {
          title: 'My first post',
          body: 'Lots of really interesting stuff',
          slug: 'my-first-post',
        },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });

// Routes
app.use(postRouter);


const server = () => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const start = () => {
  try {
    server();
    // Connect db and etc...
  } catch (error) {
    console.error(error);
  }
}

start();

// process.on('SIGINT', () => server.close());
// process.on('SIGTERM', () => server.close());

//fsaffffffffffffffffffff