import express from "express";
import { collections, products, carousels } from "./data";
import axios from "axios";

const router = express.Router();

router.get('/:type', (req, res) => {
    try {
        const { type } = req.params;
        let data;

        switch (type) {
            case 'collections': data = collections; break;
            case 'products': data = products; break;
            case 'carousels': data = carousels; break;
            default: return res.status(400).json({ error: 'Invalid data type requested' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error while fetching data', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:type', (req, res) => {
    try {
        const { data } = req.body;
        const parsedData = JSON.parse(data);
        const { type } = req.params;

        switch (type) {
        case 'collections':
            collections.splice(0, collections.length, ...parsedData);
            break;
        case 'products':
            products.splice(0, products.length, ...parsedData);
            break;
        case 'carousels':
            carousels.splice(0, carousels.length, ...parsedData);
            break;
        default:
            return res.status(400).json({ error: 'Invalid data type requested' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error while parsing the data', error);
        res.status(400).json({ error: 'Invalid JSON data' });
    }
});
  
router.get('/collections/:title', (req, res) => {
    const collection = collections.find(a => a.title === req.params.title);
    if (!collection) return res.status(404).json({ error: 'Collection not found' });

    const fullInfo = {
        ...collection,
        products: collection.products.map(id => products.find(p => p.id === id)),
    };

    res.status(200).json(fullInfo);
});

router.post('/image', async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching image', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

export default router;
