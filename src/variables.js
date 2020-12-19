const PRODUCTION_MODE = process.env.NODE_ENV === "production";

let SERVER = "http://localhost:8080";
if (PRODUCTION_MODE) {
  SERVER = "clients";
  console.log("prod", SERVER);
} else {
  console.log("not prod", SERVER);
}

const url = SERVER

export { url }