"use client"

import { Room } from '@/api/game/type';
import { IconBookFilled, IconClock, IconUsersGroup } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux';
import { selectPlayerCount } from '../../../../store/slice/players-slice';

interface LobbyHeaderProps {
    room: Room
}

export function LobbyHeader({ room }: LobbyHeaderProps) {
    const playerCount = useSelector(selectPlayerCount);

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
                            src={room?.thumbnail}
                            className='object-cover h-full'
                        />
                    </AnimatePresence>

                </div>
            </div>
            <div className="text-xl md:text-2xl font-medium w-[40%]">
                {room?.name}
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
                        <span className='text-2xl font-bold '>{room?.totalQuestion} Câu hỏi</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IconClock style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span className='text-2xl font-bold '>1h</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IconUsersGroup style={{ width: '1.5rem', height: '1.5rem' }} />
                        <span className='text-2xl font-bold '>{playerCount}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

        </motion.div>
    )
}

