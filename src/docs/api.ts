export namespace Documentation {
  export const Api = {
    openapi: "3.0.3",
    info: {
      title: "PSY",
      description: "PsyApp",
      version: "1.0.0",
      contact: {
        email: "daniel.ddhm@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local Server",
      },
      {
        url: `${process.env.URL_APP || ""}`,
        description: "Local Server",
      },
    ],
    tags: [
      { name: "Auth" },
      { name: "Call" },
      { name: "Chat" },
      { name: "Consults" },
      { name: "Diagnostics" },
      { name: "Mood" },
      { name: "Psychologists" },
      { name: "Staff" },
      { name: "Users" },
    ],

    paths: {},
    components: {
      schemas: {},
      securitySchemes: {},
    },
  }
}
