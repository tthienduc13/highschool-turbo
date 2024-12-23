"use client"

import { IconBookFilled, IconClock, IconUsersGroup } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react'

export function LobbyHeader() {

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-[55vw] flex justify-around items-center bg-primary pt-3 pb-5 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className="p-2 rounded-lg w-24 h-24 relative">
                <div className='w-[7rem] h-[7rem] absolute -top-2'>
                    <AnimatePresence>
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            alt='thumbnail'
                            src={'https://play-lh.googleusercontent.com/proxy/2tj1HTTkxfLUCHMYCMY7Ik_u9Dv-ctrQ7tteluo8MkL9bUzSFutbEcvkGroJxU6PTS84IHjfzCYjRsCflXcZ5k_CV2OAD2Al4i_fUCrb6cBVNvtB4TZhu97Z=s3840-w3840-h2160'}
                            className='object-cover h-full'
                        />
                    </AnimatePresence>

                </div>
            </div>
            <div className="text-xl md:text-2xl font-medium w-[40%]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis nam, ad ver
            </div>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='flex flex-col gap-1'
                >
                    <div className='flex items-center gap-2'>
                        <IconBookFilled style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span className='text-2xl font-bold '>41 Câu hỏi</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IconClock style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span className='text-2xl font-bold '>1h</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IconUsersGroup style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span className='text-2xl font-bold '>40</span>
                    </div>
                </motion.div>
            </AnimatePresence>

        </motion.div>
    )
}

