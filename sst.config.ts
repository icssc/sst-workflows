/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      home: "aws",
      name: "sst-workflows",
      protect: ["production"].includes(input?.stage),
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    new sst.aws.Nextjs("SST_Workflows", {
      cachePolicy: "a3edb90c-ab42-429d-8750-70acf9c1f7c0",
    });
  },
});
