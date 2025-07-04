import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>TechBlog</h1>
      <Link href="/login">
      <button type="button">SignUp</button>
      </Link>
      <Link href="/signup">
      <button type="button">Get Register</button>
      </Link>
    </div>
  );
}
