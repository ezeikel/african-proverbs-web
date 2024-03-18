"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const renderAuthLink = () => {
    if (status === "loading") {
      return <li>Loading...</li>;
    }

    if (status === "authenticated") {
      return (
        <li>
          <p>Signed in as {userEmail}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </li>
      );
    }

    return (
      <li>
        <button onClick={() => signIn("github")}>Sign in</button>
      </li>
    );
  };

  return (
    <header>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/proverbs">Proverbs</Link>
        </li>
        <li>
          <Link href="/proverb/create">Create Proverb</Link>
        </li>
        {renderAuthLink()}
      </ul>
    </header>
  );
};

export default Header;
