## A NFT white list dapp using merkle tree

To run this app:

1. Clone this repository

```sh
git clone git@github.com:rizahedayati/merkle_tree.git
```

2. Install the dependencies in all directory

```sh
cd [directory_name]
npm install
```

3. go to merkle_contract directory and create .env file like .envExample

```sh
cd merkle_contract
```

4. Deploy to localhost or goerli

```sh
npx hardhat node //just for local network
npx hardhat run scripts/deploy.js --network localhost
```

5. go to merkle_contract directory

```sh
cd merkle_contract
```

6. go to merkle_server directory and create .env file like .envExample

```sh
cd merkle_contract
```

6. start mongo db service in your system

```sh
service mongod start
```

6. start mongo db service in your system

```sh
service mongod start
```

7. copy contract address from merkle_contract/config.js and paste in merkle_client/config.js

8. copy artifacs directory from merkle_contract and paste in merkle_client

9. go to merkle_client directory

```sh
cd merkle_client
```

10. start the client app

```sh
npm run dev
```

10. open your browser in http://localhost:3000
