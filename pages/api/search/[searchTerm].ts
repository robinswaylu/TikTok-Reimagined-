// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next' 

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {  
    const { searchTerm } = req.query;
    //create graphql query
    const query = searchPostsQuery(searchTerm);   
    const searchResult = await client.fetch(query); 

    res.status(200).json(searchResult);
  }  
}