'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RarityBadge } from '@/components/animation/tag/rarity-badge'
import { Avatar } from '@/api/user/type'
import { IconChevronLeft, IconChevronRight, IconLock } from '@tabler/icons-react'
import Image from 'next/image'
import { Button } from '@highschool/ui/components/ui/button'
import { cn } from '@highschool/ui/lib/utils'

const ITEMS_PER_PAGE = 16

interface BookAvatarProps {
    avatars: Avatar[]
    onChangeAvatar: (avatar: Avatar) => void
    ownerAvatars?: string[]
}

export const BookAvatar = ({ avatars, onChangeAvatar, ownerAvatars }: BookAvatarProps) => {
    const [currentPage, setCurrentPage] = useState(0)
    const totalPages = Math.ceil(avatars.length / ITEMS_PER_PAGE)

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1)
        }
    }

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    // Animation variants for each animal card
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    }


    const AnimalCard = ({ avatar, isUnLock }: { avatar: Avatar, isUnLock: boolean }) => (
        <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group relative"
            onClick={() => onChangeAvatar(avatar)}
            disabled={!isUnLock}
        >
            {
                isUnLock && (
                    <RarityBadge rarity={avatar.rarity} />
                )
            }
            {/* <div className={`absolute -inset-0.5 rounded-xl opacity-0 blur transition duration-500 group-hover:opacity-100 ${renderColorTag(avatar.rarity)}`} /> */}
            <div className="relative flex flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-amber-900/5">
                {
                    !isUnLock && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
                            <IconLock className="w-8 h-8 text-muted-foreground" />
                        </div>
                    )
                }
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={avatar.image ?? ""}
                        alt={avatar.name}
                        width={100} height={100}
                        className="h-12 w-12 object-cover xl:h-20 xl:w-20"
                    />
                </div>
                <span className="text-sm font-medium text-amber-900">
                    {avatar.name}
                </span>
            </div>
        </motion.button>
    )

    return (
        <div className="w-[56vw] h-[80vh]">

            {/* Book container */}
            <div className="relative mx-auto aspect-[2/1.4]">
                {/* Book binding and shadow */}
                <div className="absolute inset-0 rounded-lg bg-game-winter shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
                    <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 " />
                </div>

                {/* Book pages container */}
                <div className="relative mx-auto grid h-full grid-cols-2 gap-px overflow-hidden rounded-l p-4">
                    {/* Left page */}
                    <div className="relative rounded-l-lg bg-[#fffbf2] p-6">
                        <div className="absolute inset-y-0 right-0 w-8" />
                        <div className="absolute bottom-0 left-0 right-0 h-8" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
                            >
                                {avatars
                                    .slice(
                                        currentPage * ITEMS_PER_PAGE,
                                        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE / 2
                                    )
                                    .map((avatar) => (
                                        <AnimalCard key={avatar.id} avatar={avatar} isUnLock={
                                            ownerAvatars?.findIndex((item) => item === avatar.id) !== -1
                                        } />
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right page */}
                    <div className="relative rounded-r-lg bg-[#fffbf2] p-6">
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/5" />
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/5 to-transparent" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="grid md:grid-cols-2 xl:grid-cols-4 gap-4"
                            >
                                {avatars
                                    .slice(
                                        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE / 2,
                                        (currentPage + 1) * ITEMS_PER_PAGE
                                    )
                                    .map((avatar) => (
                                        <AnimalCard key={avatar.id} avatar={avatar} isUnLock={
                                            ownerAvatars?.findIndex((item) => item === avatar.id) !== -1
                                        } />
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons */}
                    <Button
                        variant="ghost"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white",
                            (currentPage === 0) && "opacity-50"
                        )}
                    >
                        <IconChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={cn(
                            "absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white",
                            (currentPage === totalPages - 1) && "opacity-50"
                        )}
                    >
                        <IconChevronRight className="h-6 w-6" />
                    </Button>
                </div>

                {/* Page numbers */}
                <div className="-mt-[2.2rem] text-center font-serif text-lg text-amber-900">
                    <span className="inline-block rounded-md bg-white/80 px-4 py-1 backdrop-blur-sm">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                </div>
            </div>

        </div>
    )
}