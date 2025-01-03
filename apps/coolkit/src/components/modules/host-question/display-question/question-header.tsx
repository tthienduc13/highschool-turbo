"use client"

import { ButtonAudio } from '@/components/core/common/button-screen/button-audio'
import { ButtonScreen } from '@/components/core/common/button-screen/button-screen'
import { motion } from 'motion/react'

export function QuestionHeader() {


    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-[55vw] flex justify-between items-center bg-primary pt-3 pb-5 px-4 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className='flex gap-3'>
                <ButtonScreen className='bg-transparent text-white hover:bg-transparent p-0' heightShadow='0' />
                <ButtonAudio className='bg-transparent text-white hover:bg-transparent p-0' heightShadow='0' />
                <div className='self-center'>
                    <span className='font-extrabold text-xl'>ID: 123456</span>
                </div>
            </div>
            <div className='font-extrabold text-xl'>
                <span>QUESTION 2/15</span>
            </div>

        </motion.div>
    )
}

