import PostCard from "./PostCard";
export default async function RecentPosts({ limit }) {
  let posts = null;
  console.log("one time recent", process.env.NEXT_PUBLIC_URL);
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: limit, order: "desc" }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("two time recent", process.env.NEXT_PUBLIC_URL);
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
