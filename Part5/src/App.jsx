import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogLikes, setNewBlogLikes] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage('Logged in successfully')
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.error("Login failed:", exception);
    }
  };
  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    setMessage('Logged out successfully')
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: newBlogLikes,
      };

      const createdBlog = await blogService.create(newBlog, user.token);
      setBlogs(blogs.concat(createdBlog));
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setNewBlogLikes(0);
      setMessage(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.error("Error creating blog:", exception);
      setMessage("Error creating blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message && <div>{message}</div>}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <div>{message}</div>}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <form onSubmit={handleCreateBlog}>
        <h2>Create new blog</h2>
        <div>
          title
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            type="number"
            value={newBlogLikes}
            onChange={({ target }) => setNewBlogLikes(Number(target.value))}
          />
        </div>
        <button type="submit">create</button> 
      </form>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>


    </div>
  );
};

export default App;
