import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@highschool/ui/components/ui/dialog'
import Image from 'next/image'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'


export default function ZoomableImage({
    src,
    alt,
    className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    if (!src) return null
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Image
                    src={src}
                    alt={alt || ''}
                    sizes="100vw"
                    className={className}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    width={500}
                    height={100}
                />
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogContent className="bg-transparent p-0 border-none">
                <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
                    <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain" />
                </div>
            </DialogContent>
        </Dialog>
    )
}
