import http from "node:http";

// Render などの本番環境では PORT という変数が渡されるので、それを使うようにするぞ
const PORT = process.env.PORT || 8888;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // 日本語が文字化けしないよう、おまじないをかけておくぞ
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (url.pathname === "/") {
    res.writeHead(200);
    res.end("こんにちは！Codespaces からこんにちは！");
  } else if (url.pathname === "/ask") {
    const q = url.searchParams.get("q") ?? "質問がありませんな";
    res.writeHead(200);
    res.end(`お主の質問は '${q}' ですな。`);
  } else {
    res.writeHead(404);
    res.end("ページが見つかりませんぞ。");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
