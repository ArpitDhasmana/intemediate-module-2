# Decentralized Donation App

This is a decentralized donation application that allows users to deposit ethers which will be treated as donation.

![dapp screenshot](https://i.imgur.com/EBx3jGH.jpeg)

## Prerequisites
- MetaMask wallet extension installed in your browser
- Node.js (v14.0.0 or higher)
- Solidity 


## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Rishabh-198/Donation-Dapp
```

2. Install the dependencies ( IF THE DEPENDENCIES DOES NOT INSTALL CORRECTLY THEN USE --force ):

```bash
npm i
```

3. Open two additional terminals in your VS code.
 
4. In the second terminal type: npx hardhat node.
   
5. In the third terminal, type: npx hardhat run --network localhost scripts/01_deploy.js.
  
6. Back in the first terminal, type npm start to launch the front-end.

7. Open the application in your browser, the project will be running on your localhost. Typically at:

```bash
http://localhost:3000
```

8. Connect your MetaMask wallet and interact with the interface.

## How to use 
1. Open the application in your web browser.
2. Connect your Ethereum wallet (preferrably metamask) to the application.
3. Select the amount of ether you want to donate.
4. Click the "Donate" button.
5. Confirm the transaction. It will be reflected in the past donations on the Dapp.

## Contributing

Contributions to this repository are not accepted as it is for personal assignments. However, if you have suggestions or feedback, feel free to open an issue.

## License

This project is licensed under the [MIT License](LICENSE). You are free to modify and distribute the code for personal and educational purposes.
