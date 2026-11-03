import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Called by the portal right after a website is added, removed or changed, so the demo pages update
 * at once instead of waiting for the next scheduled refresh. It only clears the cache, so it is safe to leave open.
 */
export async function POST() {
  revalidateTag("demos");
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
