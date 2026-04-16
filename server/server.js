import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/user", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  const token = authHeader.split(" ")[1];
  const user = router.db.get("users").find({ token }).value();
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }
  res.json(user.id);
});

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get("users").find({ email }).value();
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  const existing = router.db.get("users").find({ email }).value();
  if (existing) {
    res.status(409).json({ error: "Email already exists" });
  } else {
    const newUser = {
      id: Date.now(),
      email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5ldyBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    };
    router.db.get("users").push(newUser).write();
    res.json(newUser);
  }
});

server.post("/products/preview", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  res.json({
    title: "Бомбочки для ванны подарочный набор bonbons 360 гр",
    image: "https://ir-3.ozone.ru/s3/multimedia-1-x/8242310085.jpg",
    currentPrice: 1450,
  });
});

server.patch("/products/:id/notification", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { id } = req.params;
  const { thresholdPrice, enabled } = req.body;
  const product = router.db.get("products").find({ id }).value();
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const updatedNotification = {
    enabled: enabled !== undefined ? enabled : product.notification?.enabled,
    thresholdPrice:
      thresholdPrice !== undefined
        ? thresholdPrice
        : product.notification?.thresholdPrice,
  };
  router.db
    .get("products")
    .find({ id })
    .assign({ notification: updatedNotification })
    .write();
  res.json(updatedNotification);
});

server.patch("/products/:id/notification/unsubscribe", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { id } = req.params;
  const product = router.db.get("products").find({ id }).value();
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const updatedNotification = { enabled: false, thresholdPrice: null };
  router.db
    .get("products")
    .find({ id })
    .assign({ notification: updatedNotification })
    .write();
  res.json(updatedNotification);
});

server.post("/products", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { url } = req.body;
  const newId = "prod_" + Date.now();
  const newProduct = {
    id: newId,
    nmId: "new123",
    name: "Новый товар",
    brand: "Unknown",
    image: "",
    currentPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    lastChecked: new Date().toISOString(),
    marketplace: "unknown",
    url: url,
    description: "",
    priceHistory: [],
    notification: { enabled: false, thresholdPrice: null },
  };
  router.db.get("products").push(newProduct).write();
  res.status(201).json(newProduct);
});

server.post("/products/compare", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "ids must be an array" });
  }

  const products = router.db.get("products").value();
  const selected = products.filter((product) => ids.includes(product.id));

  if (selected.length === 0) {
    return res.status(404).json({ error: "No products found for given ids" });
  }
  res.json(selected);
});

server.get("/products/:id/related", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { id } = req.params;
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0;

  const productExists = router.db.get("products").find({ id }).value();
  if (!productExists) {
    return res.status(404).json({ error: "Product not found" });
  }

  let allProducts = router.db.get("products").value();
  let candidates = allProducts.filter((p) => p.id !== id);

  candidates = candidates.sort(() => 0.5 - Math.random());

  const total = candidates.length;
  const paginated = candidates.slice(offset, offset + limit);

  const items = paginated.map((p) => ({
    id: p.id,
    nmId: p.nmId,
    name: p.name,
    brand: p.brand,
    image: p.image,
    currentPrice: p.currentPrice,
    priceChange: p.priceChange,
    priceChangePercent: p.priceChangePercent,
    lastChecked: p.lastChecked,
    marketplace: p.marketplace,
    url: p.url,
  }));

  res.json({
    total,
    limit,
    offset,
    items,
  });
});

server.post("/products/compare/recommendation", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "ids must be a non‑empty array" });
  }

  const products = router.db.get("products").value();
  const selected = products.filter((p) => ids.includes(p.id));

  if (selected.length === 0) {
    return res.status(404).json({ error: "No products found for given ids" });
  }

  const sortedByPrice = [...selected].sort(
    (a, b) => a.currentPrice - b.currentPrice,
  );
  const cheapest = sortedByPrice[0];
  const mostExpensive = sortedByPrice[sortedByPrice.length - 1];

  const sortedByChange = [...selected].sort(
    (a, b) => a.priceChange - b.priceChange,
  );
  const bestDynamics = sortedByChange[0];

  let recommendationText = `🤖 Я проанализировал выбранные товары. `;

  if (cheapest.id === bestDynamics.id) {
    recommendationText += `Товар "${cheapest.name}" (${cheapest.currentPrice} ₽) – самый дешёвый и при этом цена снижается на ${Math.abs(cheapest.priceChange)} ₽ (${Math.abs(cheapest.priceChangePercent)}%). Однозначно лучший выбор!`;
  } else {
    recommendationText += `Самый дешёвый – "${cheapest.name}" (${cheapest.currentPrice} ₽). `;
    if (bestDynamics.priceChange < 0) {
      recommendationText += `Однако "${bestDynamics.name}" показывает самую выгодную динамику: цена упала на ${Math.abs(bestDynamics.priceChange)} ₽ (${Math.abs(bestDynamics.priceChangePercent)}%). `;
    } else {
      recommendationText += `Все товары дорожают, но "${cheapest.name}" остаётся наиболее бюджетным вариантом. `;
    }
    recommendationText += `Рекомендую обратить внимание на "${cheapest.name}".`;
  }

  if (selected.length > 1 && cheapest.id !== mostExpensive.id) {
    recommendationText += ` Разница с самым дорогим (${mostExpensive.name}) составляет ${mostExpensive.currentPrice - cheapest.currentPrice} ₽.`;
  }

  res.send(recommendationText);
});

server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
