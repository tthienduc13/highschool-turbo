import { auth, signOut } from "@/auth";

async function HomePage() {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session?.user)}
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                {" "}
                <button type="submit">signout</button>
            </form>
        </div>
    );
}

export default HomePage;
