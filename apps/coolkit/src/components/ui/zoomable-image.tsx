import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@highschool/ui/components/ui/dialog'
import Image from 'next/image'

interface ZoomableImageProps {
    readonly src?: string
    readonly alt?: string
    readonly className?: string
    readonly ref?: React.Ref<HTMLDivElement>
}

export default function ZoomableImage({
    src,
    alt,
    className,
    ref
}: ZoomableImageProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    src ? (
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
                    ) : (
                        <div ref={ref}></div>
                    )
                }
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
                <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
                    {
                        src ? (
                            <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain" />
                        ) : (
                            <div ref={ref}></div>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
