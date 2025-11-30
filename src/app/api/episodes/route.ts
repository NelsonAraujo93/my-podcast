import clientPromise from "@/app/lib/mongodb";
import Track from "@/types/Track";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get('id');

  if (!collectionId) {
    return new Response(JSON.stringify({ error: 'Missing collectionId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const collectionIdNumber = parseInt(collectionId);
  if (isNaN(collectionIdNumber)) {
    return new Response(JSON.stringify({ error: 'Invalid collectionId' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const client = await clientPromise;
    const db = client.db("podcasts");
    const episodesCollection = db.collection<Track>("episodes");
    const episodes = await episodesCollection.find({ collectionId: collectionIdNumber }).toArray();
    const now = new Date();

    if (episodes.length > 0 && (now.getTime() - new Date(episodes[0].createdAt).getTime()) < 86400000) {
      console.log('Returning cached data - episodes');
      return Response.json(episodes);
    } else {
      const newData = await fetch(`https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=100`);
      const newDataJson = await newData.json();
      console.log('Storing updated data - episodes');
      const episodesToInsert = newDataJson.results.map((item: any) => ({
        createdAt: new Date(),
        country: item.country,
        previewUrl: item.previewUrl,
        closedCaptioning: item.closedCaptioning,
        collectionId: item.collectionId,
        collectionName: item.collectionName,
        collectionViewUrl: item.collectionViewUrl,
        trackTimeMillis: item.trackTimeMillis,
        shortDescription: item.shortDescription,
        trackId: item.trackId,
        trackName: item.trackName,
        episodeUrl: item.episodeUrl,
        feedUrl: item.feedUrl,
        artistIds: item.artistIds,
        genres: item.genres,
        episodeGuid: item.episodeGuid,
        description: item.description,
        releaseDate: item.releaseDate,
        contentAdvisoryRating: item.contentAdvisoryRating,
        trackViewUrl: item.trackViewUrl,
        artworkUrl60: item.artworkUrl60,
        artistViewUrl: item.artistViewUrl,
        artworkUrl600: item.artworkUrl600,
        artworkUrl160: item.artworkUrl160,
        episodeFileExtension: item.episodeFileExtension,
        episodeContentType: item.episodeContentType,
        kind: item.kind,
        wrapperType: item.wrapperType,
      }));

      await episodesCollection.deleteMany({ collectionId: collectionIdNumber });
      await episodesCollection.insertMany(episodesToInsert);
      return Response.json(episodesToInsert);
    }
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
