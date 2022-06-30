import { ApolloServer } from "apollo-server-micro";

const server = new ApolloServer({});

// tell next.js to not parse the body, since we are using GQL
export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
