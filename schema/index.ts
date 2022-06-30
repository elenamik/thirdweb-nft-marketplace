import { makeSchema } from "nexus";
import * as QueryTypes from "./Query";
const schema = makeSchema({
  types: [QueryTypes],
});
export default schema;
