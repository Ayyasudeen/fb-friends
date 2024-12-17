import React, { useEffect, useState } from "react";
import { supabase } from './utils/supabase.js'
import "./App.css";


function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", profile_url: "" });

  // Fetch data from Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.from("fbfriendsurl").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data);
    }
  };

  // Add new data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.profile_url) {
      const { error } = await supabase
        .from("fbfriendsurl")
        .insert([{ name: form.name, profile_url: form.profile_url }]);
      if (error) {
        console.error("Error adding data:", error);
      } else {
        setForm({ name: "", profile_url: "" });
        fetchData(); // Refresh the list
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>FB Friends</h1>

      {/* List of Friends */}
      <div className="list-box">
        {data.map((item) => (
          <div
            key={item.id}
            className="box"
            onClick={() => window.open(item.profile_url, "_self")}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Add Friend Form */}
      <h2>Add New Friend</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile URL:</label>
          <input
            type="profile_url"
            name="profile_url"
            value={form.profile_url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default App;
