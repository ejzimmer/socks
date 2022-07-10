const { supabase } = require("../../../getSupabase.js")

const handler = async () => {
  const { data, error } = await supabase.from("sizes").select("*")

  return {
    statusCode: 200,
    data: JSON.stringify(data),
    error,
  }
}

module.exports = { handler }
