module.exports = {
  apps: [{
    name: "PDF_QR",
    script: "./server.js",
    watch: true,
    max_memory_restart: '1000M',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      NODE_ENV: "production",
      PORT: "3050",
      HOST: "0.0.0.0",
      DOMINIO: "https://rec.netbot.ec/pdfqr",
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}