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
      {process.env.NEXT_PUBLIC_APP_URL}
    </div>
  );
}

export default HomePage;
