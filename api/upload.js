// Global memory store (resets on cold start; use a database for production)
global.photoFeed = global.photoFeed || [];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { image, sender } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const newEntry = {
            id: Date.now(),
            sender: sender || 'Anonymous',
            image: image, // Base64 string of the image
            timestamp: new Date().toISOString()
        };

        // Add to the front of the array
        global.photoFeed.unshift(newEntry);

        // Keep only the latest 20 photos to save memory
        if (global.photoFeed.length > 20) {
            global.photoFeed.pop();
        }

        return res.status(200).json({ success: true, message: 'Photo shared successfully!' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
