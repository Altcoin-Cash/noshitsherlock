import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBalance, makeGuess } from "../lib/web3";

const HomePage = () => {
  const { data: balance, refetch } = useQuery("balance", () =>
    getBalance(window.ethereum.selectedAddress)
  );

  const [suspect, setSuspect] = useState<number>(0);
  const [weapon, setWeapon] = useState<number>(0);
  const [room, setRoom] = useState<number>(0);
  const [motive, setMotive] = useState<number>(0);

  const handleMakeGuess = async () => {
    await makeGuess(suspect, weapon, room, motive);
    refetch();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      window.ethereum.on("accountsChanged", () => {
        refetch();
      });
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#343541",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#444654",
          border: "2px solid #696B82",
          borderRadius: "5px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "10px" }}>Balance: {balance}</div>
        <div style={{ marginBottom: "10px" }}>
          Suspect:
          <select
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #696B82",
              borderRadius: "5px",
              padding: "5px",
            }}
            value={suspect}
            onChange={(e) => setSuspect(parseInt(e.target.value))}
          >
            <option value={0}>Craig 'Faketoshi' Wright</option>
            <option value={1}>Sam Bankman-Fried</option>
            <option value={2}>Do Kwon</option>
            <option value={3}>Justin Sun</option>
            <option value={4}>Arthur Hayes</option>
            <option value={5}>Charlie Shrem</option>
            <option value={6}>Brock Pierce</option>
            <option value={7}>Shitboy Brypto</option>
            <option value={8}>Gary Gensler</option>
            <option value={9}>Roger Ver</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          Weapon:
          <select
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #696B82",
              borderRadius: "5px",
              padding: "5px",
            }}
            value={weapon}
            onChange={(e) => setWeapon(parseInt(e.target.value))}
          >
            <option value={0}>Hopium</option>
            <option value={1}>Rugpull</option>
            <option value={2}>Falling Knives</option>
            <option value={3}>Rekt Rocket</option>
            <option value={4}>Liquidation Laser</option>
            <option value={5}>FUD Flame</option>
            <option value={6}>Technically you kinda lost your money</option>
            <option value={7}>Short Squeeze</option>
            <option value={8}>Shillfest</option>
            <option value={9}>SEC whistleblower</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          Room:
          <select
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #696B82",
              borderRadius: "5px",
              padding: "5px",
            }}
            value={room}
            onChange={(e) => setRoom(parseInt(e.target.value))}
          >
            <option value={0}>Tether Treasury</option>
            <option value={1}>Bitfinex Basement</option>
            <option value={2}>Pump Palace</option>
            <option value={3}>Moon Mission Control</option>
            <option value={4}>Satoshi's Secret Lab</option>
            <option value={5}>Binance HQ (location unknown)</option>
            <option value={6}>FOMO Factory</option>
            <option value={7}>Crypto Castle</option>
            <option value={8}>Wassie murder fridge</option>
            <option value={9}>Ruins of Cryptopia</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          Motive:
          <select
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #696B82",
              borderRadius: "5px",
              padding: "5px",
            }}
            value={motive}
            onChange={(e) => setMotive(parseInt(e.target.value))}
          >
            <option value={0}>Greed</option>
            <option value={1}>Fear</option>
            <option value={2}>Jealousy</option>
            <option value={3}>Revenge</option>
            <option value={4}>Power</option>
            <option value={5}>Control</option>
            <option value={6}>Deception</option>
            <option value={7}>Manipulation</option>
            <option value={8}>Hypocrisy</option>
            <option value={9}>Misdirection</option>
          </select>
        </div>
        <button
          style={{
            backgroundColor: "#0AAD05",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={handleMakeGuess}
        >
          Make Guess
        </button>
      </div>
    </div>
  );
};

export default HomePage;
