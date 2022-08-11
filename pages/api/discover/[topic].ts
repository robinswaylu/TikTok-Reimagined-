// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { topicPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { topic  } = req.query;
        //create graphql query
        const query = topicPostsQuery(topic);
        const searchResult = await client.fetch(query);
        res.status(200).json(searchResult);
    }
}