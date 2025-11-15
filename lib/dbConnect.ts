import mongoose, { connect, connection } from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Por favor define la variable de entorno MONGODB_URI dentro de .env"
//   );
// }

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

// connection.on("connected", () => console.log("MongoDB is connected to dB"));
// connection.on("error", (err) => console.error("MongoDB Error:", err.message));
