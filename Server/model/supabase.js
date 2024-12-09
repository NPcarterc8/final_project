require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

/** 
 
@typedef {import('../../Client/src/models/supabase').Database} UserDatabase
@typedef {import('@supabase/supabase-js').SupabaseClient<UserDatabase>} UserClient
*/
// get supabase url and secret key through .env file
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Secret Key:", !!SUPABASE_SECRET_KEY);

// check if there is a url and key available, if not throw an error.
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  throw new Error("Missing Supabase configuration in environment variables.");
}

// export the connection to the database
module.exports = {
  /** 
   
@returns {UserClient}
*/
  getConnection() {
    return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
  },
};
