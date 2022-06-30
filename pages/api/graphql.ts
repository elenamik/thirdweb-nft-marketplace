import { ApolloServer } from "apollo-server-micro";
import { queryType, makeSchema } from "nexus";

const Query = queryType({
  definition(t) {
    t.string("hello", { resolve: () => "hello world!" });
  },
});
const schema = makeSchema({
  types: [Query],
});

const server = new ApolloServer({
  schema,
});

type Config = {
  api: {
    externalResolver?: boolean;
    bodyParser?:
      | boolean
      | {
          sizeLimit: string;
        };
  };
};

export const config: Config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
