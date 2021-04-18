// index.ts
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "@generated/type-graphql";

const prisma = new PrismaClient();

const app = async () => {
  const schema = await buildSchema({ resolvers });

  const context = () => {
    return {
      prisma,
    };
  };

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log("🚀 Server ready at: http://localhost:4000")
  );
};

app();
