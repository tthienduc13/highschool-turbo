"use client"

import ZoomableImage from '@/components/ui/zoomable-image'
import { useEffect, useState } from 'react'
import QrCode from 'qrcode'

interface LobbyHeaderProps {
    gameId: string
}

export function LobbyHeader({ gameId }: LobbyHeaderProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    useEffect(() => {
        const generateQrCode = async () => {
            const url = await QrCode.toDataURL(`http://coolket.vercel.app/play?roomId=${gameId}`, {
                width: 130,
                margin: 0,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            });
            setQrCodeUrl(url);
        };

        generateQrCode();
    }, [gameId]);

    return (
        <div className="w-[55vw] flex justify-around items-center bg-primary pt-3 pb-5 text-white rounded-xl my-5 shadow-inset-gray-shadow">
            <div className="p-2 rounded-lg w-24 h-24 relative">
                <div className='w-[7rem] h-[7rem] absolute -top-2'>
                    {
                        qrCodeUrl && <ZoomableImage src={qrCodeUrl} />
                    }

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

