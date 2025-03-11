import React, { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/get-ntid", {
            credentials: "include", // Ensures Windows authentication is passed
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched User:", data); // Debugging log
                setUser(data.username);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user information.");
            });
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Windows Authentication</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : user ? (
                <h2>Welcome, {user}!</h2>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
}

export default App;