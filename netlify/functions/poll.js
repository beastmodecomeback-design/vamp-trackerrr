export default async (req, context) => {
  try {
    const token = process.env.X_BEARER_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing X_BEARER_TOKEN" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update this list any time
    const users = [
      "cz_binance",
      "elonmusk",
      "solana",
      "WatcherGuru",
      "Cointelegraph",
      "WhaleAlert",
      "ansem",
      "threadguy",
      "0xSisyphus"
    ];

    const query = users.map((u) => `from:${u}`).join(" OR ");

    const url =
      "https://api.x.com/2/tweets/search/recent" +
      `?query=${encodeURIComponent(query)}` +
      "&max_results=20" +
      "&tweet.fields=created_at,public_metrics,attachments,entities,referenced_tweets" +
      "&expansions=author_id,attachments.media_keys" +
      "&user.fields=name,username,profile_image_url,verified" +
      "&media.fields=preview_image_url,url,type,width,height";

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: res.status,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
