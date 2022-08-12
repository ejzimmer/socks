const { supabase } = require("../../../getSupabase.js")

const SIZES = {
  35: {
    circumference: 7,
    length: 228,
  },
  36: {
    circumference: 7,
    length: 235,
  },
  37: {
    circumference: 7,
    length: 238,
  },
  38: {
    circumference: 8,
    length: 245,
  },
  39: {
    circumference: 8,
    length: 251,
  },
  40: {
    circumference: 8,
    length: 254,
  },
  41: {
    circumference: 9,
    length: 257,
  },
  42: {
    circumference: 9,
    length: 260,
  },
  43: {
    circumference: 9,
    length: 267,
  },
  44: {
    circumference: 10,
    length: 273,
  },
  45: {
    circumference: 10,
    length: 279,
  },
  46: {
    circumference: 10,
    length: 282,
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
