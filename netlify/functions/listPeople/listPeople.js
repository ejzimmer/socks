const { supabase } = require("../../../getSupabase.js")

const handler = async () => {
  const { data, error } = await supabase.from("sizes").select("*")

  console.log(data)
  console.log(error)

  return {
    statusCode: 200,
    data,
    error,
  }
}

module.exports = { handler }
