import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState({});
  const [searchText, setSearchText] = useState(""); // for search
  const [darkMode, setDarkMode] = useState(false); // for dark mode

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading data");
        setLoading(false);
      });
  }, []);

  function toggleDetails(id) {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  // filter users by search text
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div
      className={
        darkMode
          ? "dark bg-[#010101] text-[#f1f1f1] min-h-screen py-5 px-10 lg:px-20"
          : "bg-blue-200 min-h-screen py-5 px-10 lg:px-20"
      }
    >
      {/* Dark mode toggle button*/}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 bg-[#010101] text-white px-3 py-1 rounded border border-[#f1f1f1] dark:border-[#f1f1f1]"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h1 className="text-2xl font-bold mb-4">User Profile Directory</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
        className=" border border-[#f1f1f1] py-2 px-5 rounded w-full md:w-[50%] lg:w-[30%] rounded-4xl mb-4 placeholder-gray-500 dark:placeholder-white dark:bg-[#010101]"
      />

      {/* users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="shadow p-4 rounded border rounded-4xl">
            <p className="font-bold text-lg mb-1">{user.id}.</p>
            <h2 className="font-bold text-lg mb-2">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>
            <p>City: {user.address.city}</p>

            {showMore[user.id] && (
              <div className="mt-5 text-sm dark:text-[#f1f1f1]">
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Username: {user.username}</p>
              </div>
            )}

            <button
              onClick={() => toggleDetails(user.id)}
              className="mt-2 bg-[#010101] text-white px-2 py-1 rounded border border-gray-300 dark:border-[#f1f1f1]"
            >
              {showMore[user.id] ? "Hide Details" : "View More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
