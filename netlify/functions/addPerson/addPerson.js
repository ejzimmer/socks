const { supabase } = require("../../../getSupabase.js")

const SIZES = {
  38: {
    circumference: 8,
    length: 237,
  },
  39: {
    circumference: 8,
    length: 246,
  },
  40: {
    circumference: 8,
    length: 254,
  },
  41: {
    circumference: 9,
    length: 258,
  },
  42: {
    circumference: 9,
    length: 262,
  },
  43: {
    circumference: 9,
    length: 271,
  },
  44: {
    circumference: 10,
    length: 275,
  },
  45: {
    circumference: 10,
    length: 283,
  },
  46: {
    circumference: 10,
    length: 288,
  },
}

exports.handler = async (event) => {
  const person = Object.fromEntries(
    event.body.split("&").map((entry) => entry.split("="))
  )

  const size = `${person.size}`
  const circumference = person.circumference || SIZES[size].circumference
  const length = person.length || SIZES[size].length

  const entry = {
    name: person.name,
    circumference,
    length,
  }

  const { data, error } = await supabase.from("sizes").insert([entry])
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
