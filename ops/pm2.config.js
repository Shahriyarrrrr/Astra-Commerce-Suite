module.exports = {
  apps: [
    {
      name: "astra-server",
      script: "server/server.js",
      instances: 1,
      exec_mode: "fork",
      watch: false
    }
  ]
}
