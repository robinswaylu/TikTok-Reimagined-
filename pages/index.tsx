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
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length
        ? videos.map((video: Video) => (
          <VideoCards post={video} key={video._id} />
        ))
        : <NoResults text={`No Videos`} />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: { videos: data }
  }
}



export default Home
