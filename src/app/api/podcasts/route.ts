import clientPromise from "@/app/lib/mongodb";
import Podcast from "@/types/Podcast";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("podcasts");
    const podcastCollection = db.collection<Podcast>("podcasts");
    const podcasts = await podcastCollection.find({}).toArray();
    const now = new Date();
    
    if (podcasts.length > 0 && (now.getTime() - new Date(podcasts[0].createdAt).getTime()) < 86400000) {
      console.log('Returning cached data')
      return Response.json(podcasts);
    } else {
      const newData = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const newDataJson = await newData.json();
      console.log('Storing updated data')
      const podcastsToInsert = newDataJson.feed.entry.map((item: Podcast) => ({
        createdAt: new Date(),
        "im:name": item["im:name"],
        "im:image": item["im:image"],
        summary: item.summary,
        "im:price": item["im:price"],
        "im:contentType": item["im:contentType"],
        rights: item.rights,
        title: item.title,
        link: item.link,
        id: item.id,
        "im:artist": item["im:artist"],
        category: item.category,
        "im:releaseDate": item["im:releaseDate"]
      }));
      await podcastCollection.deleteMany({});
      await podcastCollection.insertMany(podcastsToInsert);
      return Response.json(podcastsToInsert);
    }
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
