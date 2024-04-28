import clientPromise from "@/app/lib/mongodb";
import Podcast from "@/types/Podcast";

export async function GET(request: Request) {
  const urlPath = new URL(request.url).pathname;
  const podcastId = urlPath.split('/').pop();
  if (!podcastId) {
    return new Response(JSON.stringify({ error: 'Missing podcastId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("podcasts");
    const podcastCollection = db.collection<Podcast>("podcasts");
    const id = {"id.attributes.im:id": podcastId };
    const podcast = await podcastCollection.findOne(id) as Podcast;

    if (!podcast) {
      return new Response(JSON.stringify({ error: 'Podcast not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return Response.json(podcast);
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
