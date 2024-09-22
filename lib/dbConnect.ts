import { connect, connection } from "mongoose";

const conn: { isConnected?: number } = {};

export async function dbConnect() {
  if (conn.isConnected) return;

  connection.setMaxListeners(30);

  const db = await connect(process.env.DATABASE_URL!);
  conn.isConnected = db.connections[0].readyState;
}

// connection.on("connected", () => console.log("MongoDB is connected to dB"));
// connection.on("error", (err) => console.error("MongoDB Error:", err.message));
