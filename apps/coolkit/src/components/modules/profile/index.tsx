import { FlipBook } from "@/components/animation/book/flip-book";

const pages = [
    {
        front: {
            content: (
                <div className="text-center pt-8">
                    <h1 className="font-serif text-4xl mb-2">Flip Book</h1>
                    <em>A lil dive into 3d css</em>
                </div>
            ),
            backgroundColor: '#e76f51',
            isExternal: true
        },
        back: {
            content: (
                <>
                    <div className="pageNumber">i</div>
                    <img src="https://picsum.photos/200/301" alt="" className="w-full rounded-lg w-20 h-20" />
                </>
            ),
            backgroundColor: '#2a9d8f'
        }
    },
    {
        front: {
            content: (
                <>
                    <div className="pageNumber">ii</div>
                    <h2 className="font-serif text-2xl mb-4">Contents</h2>
                    <div className="flex items-center gap-2">
                        <span>How To</span>
                        <div className="flex-1 border-b border-dashed" />
                        <span>1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Lorem Ipsum</span>
                        <div className="flex-1 border-b border-dashed" />
                        <span>3</span>
                    </div>
                </>
            ),
            backgroundColor: '#2a9d8f'
        },
        back: {
            content: (
                <>
                    <div className="pageNumber">1</div>
                    <h2 className="font-serif text-2xl mb-4">How to</h2>
                    <p className="mb-4">Step 1, screen record it off of codepen.</p>
                    <p className="mb-4">Step 2, Put it into canva or something and put some stuff around to make it feel like yours</p>
                    <p>Step 3, Post it wherever you want.</p>
                </>
            ),
            backgroundColor: '#e9c46a'
        }
    },
    // Add remaining pages following the same pattern...
]


export default function ProfileModule() {
    return (
        <>
            <div>okokoko</div>
            <FlipBook pages={pages} />
        </>
    )
}