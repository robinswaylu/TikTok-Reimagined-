import React, { useEffect, useRef, useState } from 'react';
import { Video } from '../types'
import { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

interface IProps {
    post: Video;
}

const VideoCards: NextPage<IProps> = ({ post }) => {
    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(true);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    };

     
    {/*UseEffect hook will be called everytime isVideoMuted state updates*/ }
    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }  
    }, [isVideoMuted]);





    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>

            <div>
                <div className='flex gap-3 mb-2 cursor-pointer font-semibold rounded'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <> {/* Empty react element here because Link can't have Image as direct children */}
                                <Image
                                    width={62}
                                    height={62}
                                    className='rounded-full'
                                    src={post.postedBy.image}
                                    alt='Profile Photo'
                                    layout='responsive'
                                />
                            </>
                        </Link>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <div className='flex items-center gap-2'>
                                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} {' '}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                        <p className='text-gray-500'>{post.caption}</p>
                    </div>
                </div>

            </div>

            <div className='lg:ml-20 flex gap-4 relative' >
                <div className='rounded-3xl'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <Link href={`/detail/${post._id}`}>
                        <video
                            preload="metadata"
                            loop
                            ref={videoRef}
                            src={post.video.asset.url + '#t=0.1'}
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] rounded-2xl cursor-pointer bg-gray-100'
                        ></video>
                    </Link>
                    {isHover && (
                        <div className='absolute top-[45%] left-[45%] md:top-[inherit]    md:bottom-6 cursor-pointer  md:px-4 md:left-0 flex  lg:justify-between w-[100px] md:w-[50px] lg:w-[600px]  '>
                            {playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className='text-gray-200 text-4xl md:text-black' />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className='text-gray-200 text-4xl md:text-black' />
                                </button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)} className='hidden md:block right-16'>
                                    <HiVolumeOff className='text-black text-2xl lg:text-4x' />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)} className='hidden md:block right-16'>
                                    <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default VideoCards