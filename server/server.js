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
  const { tresholdPrice, enabled } = req.body;
  const product = router.db.get("products").find({ id }).value();
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const updatedNotification = {
    enabled: enabled !== undefined ? enabled : product.notification?.enabled,
    tresholdPrice:
      tresholdPrice !== undefined
        ? tresholdPrice
        : product.notification?.tresholdPrice,
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
  const updatedNotification = { enabled: false, tresholdPrice: null };
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
    notification: { enabled: false, tresholdPrice: null },
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

server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
