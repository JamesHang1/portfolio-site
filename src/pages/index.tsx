import Link from "next/link";

export default function Home() {
  return (
      <main className="mx-auto w-5xl">
        <Link href="/random-hero-picker">Random Overwatch Picker</Link>
      </main>
  );
}
