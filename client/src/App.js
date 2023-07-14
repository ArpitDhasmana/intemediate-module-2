import './App.css';
//packages used
import { useEffect, useState } from 'react';
import { SuitHeartFill } from 'react-bootstrap-icons'; //heart icon
import artifact from './artifacts/contracts/Donation.sol/Donation.json' 
import { ethers } from 'ethers';


function App() {
  const [provider, setProvider] = useState(undefined); //default values of these variables is undefined
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  const toString = bytes32 => ethers.utils.parseBytes32String(bytes32);
  const toWei = ether => ethers.utils.parseEther(ether);
  const toEther = wei => ethers.utils.formatEther(wei).toString();

  useEffect(() => { // this hook fires when app starts
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const contract = await new ethers.Contract(
        '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        artifact.abi
      )
      setContract(contract)

      contract.connect(provider).getDonations()
        .then((result) => {
          const donations = result.map(el => [el[0], toEther(el[1])])
          setDonations(donations)
        })
    }
    init();
  }, [])

  const isConnected = () => (signer !== undefined)
//if signer is there then metamask is connected
  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }

  const connect = () => {
    getSigner(provider)
  }

  const sendDonation = async () => {
    const wei = toWei(amount) //sending ethers to backend

    await signer.sendTransaction({
      to: contract.address, //send ether to contract address
      value: wei
    })

    setAmount('0')
  }


  return (
    <div className="App">
  <header className="App-header">
    <div className="donate-container">
      <h1 className="donateHeader">Select amount to donate (ETH)</h1>

      <div className="row amountButtons-row">
        <div className="col-md-6 amountButtonLeft">
          <a
            onClick={() => setAmount('0.1')}
            className={"amountButton " + (amount === '0.1' ? 'amountClicked' : '')}
          >
            0.1
          </a>
        </div>
        <div className="col-md-6 amountButtonRight">
          <a
            onClick={() => setAmount('0.5')}
            className={"amountButton " + (amount === '0.5' ? 'amountClicked' : '')}
          >
            0.5
          </a>
        </div>
      </div>

      <div className="row amountButtons-row">
        <div className="col-md-6 amountButtonLeft">
          <a
            onClick={() => setAmount('1')}
            className={"amountButton " + (amount === '1' ? 'amountClicked' : '')}
          >
            1
          </a>
        </div>
        <div className="col-md-6 amountButtonRight">
          <a
            onClick={() => setAmount('2')}
            className={"amountButton " + (amount === '2' ? 'amountClicked' : '')}
          >
            2
          </a>
        </div>
      </div>

      <div className="row donate-button-row">
        <div className="col-md-12">
          <a onClick={() => sendDonation()} className="amountButton">Donate</a>
        </div>
      </div>

      <div className="row connection-row">
        <div className="col-md-12">
          {isConnected() ? (
            <>
              <span className="dot greenDot"></span>
              <p className="connection-text">  Connected</p>
            </>
          ) : (
            <>
              <span className="dot redDot"></span>
              <p className="connection-text">Not connected</p>
              <button onClick={connect} className="btn btn-primary">Connect Wallet</button>
            </>
          )}
        </div>
      </div>
    </div>

    <div className="recent-donations">
      <h1 className="donateHeader">Past Donations</h1>
      {donations.map((ds, idx) => (
        <div className="donationBubbleLeft" key={idx}>
          <SuitHeartFill fill="#FF7F97" />
          <span className="paddingLeft">
            {ds[1]} ETH
            &nbsp;
            <span className="byAddress">by {ds[0]}</span>
          </span>
        </div>
      ))}
    </div>
  </header>
</div>
  );
}

export default App;