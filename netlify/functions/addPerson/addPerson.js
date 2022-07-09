// Grab our credentials from a .env file or environment variables
require("dotenv").config()

const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env

// Connect to our database
const { createClient } = require("@supabase/supabase-js")
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY)

// Our standard serverless handler function
exports.handler = async (event) => {
  const person = Object.fromEntries(
    event.body.split("&").map((entry) => entry.split("="))
  )

  // Insert a row
  const { data, error } = await supabase.from("sizes").insert([person])

  // Did it work?
  console.log(data, error)
}
