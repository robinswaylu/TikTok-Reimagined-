import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from '../types'
import VideoCards from '../components/VideoCards'
import NoResults from '../components/NoResults'
import { BASE_URL } from '../utils'

interface Iprops {
  videos: Video[]
}

const Home = ({ videos }: Iprops) => {
  console.log('this is videos: ', videos)
  return (
    <div className='flex flex-col gap-6 videos h-full items-center'>
      {videos.length
        ? videos.map((video: Video) => (
          <VideoCards post={video} key={video._id} />
        ))
        : <NoResults text={`No Videos`} />}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: { videos: response.data }
  }
}

export default Home
