import { css } from "@emotion/css";
import { useContext, useState } from "react";
import { ethers } from "ethers";
import { AccountContext } from "../context";
import axios from "axios";
import Whitelist from "./../artifacts/contracts/Whitelist.sol/Whitelist.json";

export default function Home(props) {
  const [address, setAddress] = useState("");
  const signer = useContext(AccountContext);
  

  async function addAddress() {
    const account = await signer.getAddress();
    const res = await axios.post(`http://localhost:8080/mint`, {
      data: {
        address: address,
      }
    });

    console.log(res,"res");

    let result = res.data.data;
    const contract = new ethers.Contract(
      `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`,
      Whitelist.abi,
      signer
    );

    const transaction = await contract.addAddress(result.size,result.nodeHash,result.proofs);
    await transaction.wait();
    
  }
  async function mint() {
    const account = await signer.getAddress()
    const res = await axios.post(`http://localhost:8080/mint`, {
      data: {
        signer: account,
      }
    });

    let proofs = res.data.data;
    const contract = new ethers.Contract(
      `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`,
      Whitelist.abi,
      signer
    );

    const transaction = await contract.mint(proofs);
    await transaction.wait();
   
  }

  return (
    <div className={container}>
      <div className={grayContainer}>
        <input
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          placeholder="wallet address"
          value={address}
          className={titleStyle}
        />

        <button className={buttonStyle} type="button" onClick={addAddress}>
          ADD
        </button>

        <button className={buttonStyle} type="button" onClick={mint}>
          MINT
        </button>
      </div>
    </div>
  );
}

const grayContainer = css`
  background-color: #f5f5f5;
  padding: 25px;
  border-radius: 20px;
`;

const container = css`
  display: flex;
  justify-content: center;
`;

const buttonStyle = css`
  margin: 10px;
  background-color: #fafafa;
  outline: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  padding: 16px 70px;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const titleStyle = css`
  margin-top: 40px;
  border: none;
  border-color: #f5f5f5;
  outline: none;
  background-color: inherit;
  font-size: 30px;
  font-weight: 600;
  &::placeholder {
    color: #999999;
    padding: 10px;
  }
`;
