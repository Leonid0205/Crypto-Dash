import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_API_URL;
type CoinDeatailsPageProps = {
  id: string;
  symbol: string;
  name: string;
  categories: string[];
  description: { en: string };
  image: { thumb: string; small: string; large: string };
  last_updated: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: { usd: number };
    ath_change_percentage: number;
    ath_date: { usd: string };
    atl: { usd: number };
    atl_change_percentage: number;
    atl_date: { usd: string };
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
};

const CoinDeatailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDeatailsPageProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
          throw new Error("Faild to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          setError(err.message);
        } else {
          setError("An unknown error uccured!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);
  return (
    <div className="coin-details-container">
      <Link to="/">← Back Home</Link>
      <h1 className="coin-detail-title">
        {coin
          ? `${coin.name} (${coin.symbol.toLocaleUpperCase()})`
          : "Coin Details"}
      </h1>
      {loading && <Spinner />}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin?.image.large}
            alt={coin?.name}
          />
          <p>{coin?.description.en.split(".")[0] + "."}</p>
          <div className="coin-details-info">
            <h3>🪜 Rank: {coin?.market_cap_rank}</h3>
            <h3>
              $ Current Price: $
              {coin?.market_data.current_price.usd.toLocaleString("en-US")}
            </h3>
            <h4>
              💹 Market Cap: $
              {coin?.market_data.market_cap.usd.toLocaleString("en-US")}
            </h4>
            <h4>
              ⬆️ 24 High: $
              {coin?.market_data.high_24h.usd.toLocaleString("en-US")}
            </h4>
            <h4>
              ⬆️ 24 Low: $
              {coin?.market_data.low_24h.usd.toLocaleString("en-US")}
            </h4>
            <h4>
              ⇅% 24 Price Change: $
              {coin?.market_data.price_change_24h.toFixed(2)}{" "}
              {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
            </h4>
            <h4>
              📊 Circulating Supply:
              {coin?.market_data.circulating_supply.toLocaleString("en-US")}
            </h4>
            <h4>
              🧰 Total Supply:
              {coin?.market_data.total_supply?.toLocaleString("en-US") || "N/A"}
            </h4>
            <h4>
              ⚡️ All-Time High: $
              {coin?.market_data.ath.usd.toLocaleString("en-US")} on{" "}
              {new Date(coin?.market_data.ath_date.usd ?? "").toLocaleString()}
            </h4>
            <h4>
              🪫 All-Time Low: $
              {coin?.market_data.atl.usd.toLocaleString("en-US")} on{" "}
              {new Date(coin?.market_data.atl_date.usd ?? "").toLocaleString()}
            </h4>
            <h4>
              🗞️ Last Updated:{" "}
              {new Date(coin?.last_updated ?? "").toLocaleString()}
            </h4>
          </div>
          <CoinChart coinId={coin?.id ?? ""} />
          <div className="coin-details-links">
            {coin?.links.homepage[0] && (
              <p>
                🔵{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coin?.links.blockchain_site[0] && (
              <p>
                🧩{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin?.categories && coin?.categories.length > 0 && (
              <p>📚 Categories: {coin.categories.join(", ")}</p>
            )}
          </div>
        </>
      )}
      {!loading && !error && !coin && <p>🤷‍♀️ Coin not found!</p>}
    </div>
  );
};

export default CoinDeatailsPage;
