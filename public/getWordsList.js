const https = require("https");
const fs = require("fs");

const url = "https://raw.githubusercontent.com/enz/german-wordlist/main/words";

https.get(url, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const words = data
      .split("\n")
      .filter(Boolean)
      .map((w) => w.trim().toUpperCase());
    fs.writeFileSync("wordsList.json", JSON.stringify(words, null, 2), "utf-8");
    console.log(`${words.length} Wörter gespeichert.`);
  });
});
