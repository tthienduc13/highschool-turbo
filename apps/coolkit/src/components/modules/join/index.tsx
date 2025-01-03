'use client'

import { ChannelProvider } from "ably/react"
import { JoinModule } from "./join-module"
import { useRouter, useSearchParams } from "next/navigation"


export const JoinProviderModule = () => {

    const searchParam = useSearchParams()
    const router = useRouter()

    const id = searchParam.get('id')

    if (!id) {
        router.back()
    }


    return (
        <ChannelProvider channelName={`room:${id}`}>
            <JoinModule roomId={id as string} />
        </ChannelProvider>
    )
}