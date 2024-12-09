// get connection to db
const { getConnection } = require("./supabase");

const supabase = getConnection();
// test connection to db
async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) {
      console.error("Error connecting to the database:", error.message);
      return;
    }

    console.log("Connection successful! Sample data:", data);
  } catch (err) {
    console.error("Unexpected error:", err.message);
  }
}

// test the connection
testDatabaseConnection();
