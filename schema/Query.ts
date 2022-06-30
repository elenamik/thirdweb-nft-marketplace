// schema/Query.ts
import { objectType, queryType } from "nexus";
export const Framework = objectType({
  name: "Framework",
  definition(t) {
    t.id("id");
    t.string("name");
  },
});
export const Query = queryType({
  definition(t) {
    t.list.field("frameworks", {
      type: "Framework",
      resolve: () => {
        return [
          {
            id: "1",
            name: "React",
          },
          {
            id: "2",
            name: "Vue",
          },
          {
            id: "3",
            name: "Angular",
          },
          {
            id: "4",
            name: "Svelte",
          },
        ];
      },
    });
  },
});
