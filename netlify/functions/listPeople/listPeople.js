const { supabase } = require("../../../getSupabase.js")

const handler = async () => {
  const { data } = await supabase.from("sizes").select("*")

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

module.exports = { handler }
