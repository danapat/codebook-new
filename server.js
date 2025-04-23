const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Assuming 'db.json' is your database file
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Bind the router with the database to the app
server.db = router.db;  // This is where you bind the db

// Apply the authentication middleware
server.use(jsonServerAuth);

// Create a custom protected route for '/600/users/:id'
server.get('/600/users/:id', (req, res) => {
  console.log('Authorization header:', req.headers['authorization']);
  
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract the user ID from the URL
  const { id } = req.params;

  // Find the user by ID
  const user = server.db.get('users').find({ id: parseInt(id) }).value();

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // If authenticated and user found, respond with the user's data
  res.status(200).json(user);
});

// Create a custom protected route for '/660/orders'
server.get('/660/orders/:id', (req, res) => {
  console.log('Authorization header:', req.headers['authorization']);
  
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Extract the user ID from the URL
  const { id } = req.params;
  
  // Fetch all orders from the database
  const orders = server.db.get('orders').filter(item => item.id = id).value();

  if (!orders || orders.length === 0) {
    return res.status(404).json({ error: 'No orders found' });
  }

  // If authenticated, respond with the orders data
  res.status(200).json(orders);
});

// Optionally, you can add POST method to create new orders
server.post('/660/orders', (req, res) => {
  // Ensure the user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Create a new order and add it to the "orders" database
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newOrder = { id: Date.now(), userId, items, totalAmount };

  // Add the new order to the "orders" collection
  server.db.get('orders').push(newOrder).write();

  res.status(201).json({ message: 'Order created successfully', order: newOrder });
});

// Register route (for creating new users)
server.post('/register', (req, res) => {
  try {
    // Example: Saving a new user in the "users" database
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new user
    const newUser = { id: Date.now(), username, email, password };

    // Add the new user to the "users" database
    server.db.get('users').push(newUser).write();

    // Success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use the router to serve API endpoints
server.use(router);

// Set the port
server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});
