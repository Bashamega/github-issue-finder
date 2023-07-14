// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { term } = req.query; // Extract the label from the query parameters

    if (!term || term === '') {
        return res.status(200).json({ name: 'Not found' });
    }

    fetch(`https://api.github.com/search/issues?q=state:open+is:issue+${term}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    })
    .then(res=>res.json())
    .then(data=>{
       res.status(200).json(data) 
    })
}
