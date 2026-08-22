import https from "node:https";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ykzbptfiyyzskfijbniu.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_kFHKnlrAzSQrr0fvXQ0h2A_yCeBt1Fy";

console.log(`📡 Pinging Supabase project: ${SUPABASE_URL}...`);

const url = new URL(`${SUPABASE_URL}/rest/v1/site_stats?select=id&limit=1`);

const req = https.request(
  url,
  {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ Success! Supabase responded with HTTP ${res.statusCode}.`);
        console.log(`Response: ${data}`);
      } else {
        console.error(`❌ Failed! HTTP status ${res.statusCode}: ${data}`);
        process.exit(1);
      }
    });
  },
);

req.on("error", (err) => {
  console.error(`❌ Connection error: ${err.message}`);
  process.exit(1);
});

req.end();
