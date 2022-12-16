var config = {
  PORT: process.env.APP_PORT || 8080,
  ENV: process.env.NODE_ENV || "development",
  LOGDIR: process.env.LOGDIR || "logs",
  CRYPTO_ALGORITHM: "aes-256-ctr",
  SECRET_KEY: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
  DB: {
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
  },

  DICTATOR_CONTRACT_ADDRESS: "0xCC0968398B76b7BF81b2089f6f39a892C8f7C4F4",
  PROVIDER: `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`,
  PROVIDER_OPTION: {
    timeout: 30000, // ms
    // Enable auto reconnection
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false,
    },
  },
  AWS_CONFIG: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  },

  AWS_S3: {
    endpoint: "https://s3.filebase.com",
    signatureVersion: "v4",
    params: { Bucket: "dictator" },
  },

  NFT_COUNT: 3397,
};
module.exports = config;
