global.photoFeed = global.photoFeed || [];

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Return the latest shared photos to the client
    return res.status(200).json({ photos: global.photoFeed });
}
