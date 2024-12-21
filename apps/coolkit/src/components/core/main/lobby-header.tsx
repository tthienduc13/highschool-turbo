"use client"

import ZoomableImage from '@/components/ui/zoomable-image'
import QRCodeStyling, { Options } from 'qr-code-styling'
import { useEffect, useRef, useState } from 'react'

interface LobbyHeaderProps {
    gameId: string
}

export function LobbyHeader({ gameId }: LobbyHeaderProps) {
    const [optionQrCode, setOptionQrCode] = useState<Options>({
        width: 130,
        height: 130,
        data: `http://coolket.vercel.app/play?roomId=${gameId}`,
        dotsOptions: {
            color: 'white',
            type: 'rounded',
            roundSize: true
        },
        backgroundOptions: {
            color: "transparent",
            round: 100
        }
    })

    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(optionQrCode));
    const refQr = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refQr.current) {
            qrCode.append(refQr.current);
        }
        console.log('QRCode', qrCode);
    }, [qrCode, refQr]);

    return (
        <div className="w-[55vw] flex justify-around items-center bg-primary pt-3 pb-5 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className="p-2 rounded-lg w-24 h-24">
                <div className='w-[10rem] h-[10rem] relative'>
                    <div ref={refQr} className='absolute -left-6 -top-6 scale-110'>

                    </div>
                </div>
            </div>
            <div className="text-xl md:text-2xl font-medium">
                Truy cập <span className="underline">coolket.vn</span>
                <br />
                và nhập Game ID:
            </div>
            <div>
                <span className='text-5xl font-bold'>{gameId}</span>
            </div>
        </div>
    )
}

