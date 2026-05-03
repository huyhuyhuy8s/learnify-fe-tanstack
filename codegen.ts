import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  generates: {
    "./src/gql/": {
      preset: "client",
      documents: "./src/**/*.ts",
      config: {
        scalars: {
          DateTime: "string",
          JSON: "Record<string, unknown>",
          Upload: "File",
          BigInt: "string",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
