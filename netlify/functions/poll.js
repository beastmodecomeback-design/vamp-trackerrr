export default async (req, context) => {
  try {
    const token = process.env.X_BEARER_TOKEN;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing X_BEARER_TOKEN" }),
        { status: 500 }
      );
    }

    // Accounts to track (we can expand this list later)
    const users = [
      "cz_binance",
      "elonmusk",
      "solana",
      "WatcherGuru",
      "Cointelegraph",
      "WhaleAlert"
    ];

    const query = users.map(u => `from:${u}`).join(" OR ");

    const url =
      "https://api.x.com/2/tweets/search/recent" +
      `?query=${encodeURIComponent(query)}` +
      "&max_results=10" +
      "&tweet.fields=created_at,author_id,public_metrics";

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
