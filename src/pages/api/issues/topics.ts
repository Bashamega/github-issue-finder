import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  items: Array<any>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { label } = req.query; // Extract the label from the query parameters

  if (!label || label === "") {
    return res.status(200).json({ items: [] });
  }
  const token = process.env.TOKEN;

  fetch(
    `https://api.github.com/search/issues?q=state:open+is:issue+label:${label}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
}
