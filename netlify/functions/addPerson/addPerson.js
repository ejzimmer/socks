const { supabase } = require("../../../getSupabase.js")

exports.handler = async (event) => {
  const person = Object.fromEntries(
    event.body.split("&").map((entry) => entry.split("="))
  )

  const { data, error } = await supabase.from("sizes").insert([person])
  console.log(data, error)

  if (error) {
    return {
      statusCode: 303,
      headers: {
        Location: `/index.html?error=${encodeURIComponent(error.details)}`,
      },
    }
  }

  return {
    statusCode: 303,
    headers: {
      Location: `/index.html?name=${person.name}`,
    },
  }
}
