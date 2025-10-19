const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize posts file if it doesn't exist
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, '[]', 'utf-8');
}

// Helper function to read posts
const readPosts = () => {
  const data = fs.readFileSync(POSTS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write posts
const writePosts = (posts) => {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
};

// Routes
app.get('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.post('/api/posts', (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const posts = readPosts();
    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      author: author || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : [])
    };

    posts.push(newPost);
    writePosts(posts);
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});