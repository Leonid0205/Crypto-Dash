const AboutPage = () => {
  return (
    <div className="about">
      <h1>About Crypto Dash</h1>
      <p>
        Crypto Dash is a simple app that displays live cryptocurrency data using
        the CoinGecko API.
      </p>
      <p>
        You can explore the top cryptocurrency by marcket cap, filter by name or
        symbol, and sort by price, market cap, or 24h change.
      </p>
      <p>
        This project is build using Vite as the build tool, React, TypeScript,
        CoinGecko API for fetching data, and React Router for routing.
      </p>
      <p>
        🚀 Future features might include detailed coin views, favorites,
        pagination, and much more.
      </p>
    </div>
  );
};

export default AboutPage;
