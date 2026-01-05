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
    new sst.aws.Nextjs("MyWeb");
  },
});
