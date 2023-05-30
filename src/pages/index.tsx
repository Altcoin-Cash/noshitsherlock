import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBalance, makeGuess } from "../lib/web3";
import Head from "next/head";

const HomePage = () => {
  const { data: balance, refetch } = useQuery("balance", () =>
    getBalance(window.ethereum.selectedAddress)
  );

  const [suspect, setSuspect] = useState<number>(0);
  const [weapon, setWeapon] = useState<number>(0);
  const [room, setRoom] = useState<number>(0);
  const [motive, setMotive] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleMakeGuess = async () => {
    await makeGuess(suspect, weapon, room, motive);
    refetch();
  };

  const handleConnect = async () => {
    try {
      await window.ethereum.enable();
      setIsConnected(true);
    } catch (error) {
      // Handle connection error
      console.error("Error connecting wallet:", error);
    }
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
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          backgroundColor: "#343541",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <header
          style={{
            backgroundColor: "#23242B",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img src="/logo.png" alt="Logo" style={{ maxWidth: "500px" }} />
        </header>
        <div
          style={{
            backgroundColor: "#343541",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            overflow: "auto",
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
            {!isConnected && (
              <>
                <div style={{ marginBottom: "20px" }}>No Shit Sherlock!</div>
                <button
                  style={{
                    backgroundColor: "#0AAD05",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={handleConnect}
                >
                  Connect
                </button>
              </>
            )}
            {isConnected && (
              <>
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
                    <option value={6}>
                      Technically you kinda lost your money
                    </option>
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
              </>
            )}
          </div>
        </div>
        <footer
          style={{ backgroundColor: "#23242B", height: "80px", width: "100%" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="https://github.com/Altcoin-Cash/noshitsherlock"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/github.png"
                alt="GitHub"
                style={{
                  marginTop: "5px",
                  marginRight: "20px",
                  maxWidth: "50px",
                }}
              />
            </a>
            <a
              href="https://discord.gg/zBfNpndpzQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/discord.png"
                alt="Discord"
                style={{
                  marginTop: "5px",
                  marginRight: "20px",
                  maxWidth: "50px",
                }}
              />
            </a>
            <a
              href="https://sepolia.etherscan.io/address/0x0Ecbe0484E99bBA9175309ae66C5690557A942D1#events"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "15px",
                color: "#FFFFFF",
              }}
            >
              Testnet events
            </a>

            <a
              href="https://etherscan.io/address/0x55af491e8b33246606FeB9010156D2597e15cAa1#events"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "15px",
                color: "#FFFFFF",
              }}
            >
              Mainnet events
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
