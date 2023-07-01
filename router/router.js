const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/explore', async (req, res) => {
    // get the data from database
    try {
        const places = await prisma.places.findMany({
            orderBy: {
                category: 'asc',
            },
        });
        // sort the data according to category
        const group_places = places.reduce((groups, item) => {
            const group = groups[item.category] || [];
            group.push(item);
            groups[item.category] = group;
            return groups;
        }, {});

        return res.render('explore', { group_places });
    } catch (err) {
        res.send('<h1>Error while generating the page</h1>');
    }
});
router.get('/place/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const place = await prisma.places.findFirst({
            where: {
                slug,
            },
        });
        return res.render('place', { place });
    } catch (err) {
        res.send('<h1>Error while generating the page</h1>');
    }
});
router.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(403).json({ message: '?q= query is required' });
    try {
        const search_result = await prisma.places.findMany({
            where: {
                // name: {
                //     contains: q,
                //     mode: 'insensitive',
                // },
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { location: { contains: q, mode: 'insensitive' } },
                ],
            },
        });
        // res.send(search_result);
        return res.render('search', { search_result, searchquery: q });
    } catch (err) {
        res.send('<h1>Error while generating the page</h1>');
    }
});
router.get('/api/data', async (req, res) => {
    try {
        // get the data from database
        const places = await prisma.places.findMany({
            orderBy: {
                category: 'asc',
            },
        });
        // sort the data according to category
        const group_places = places.reduce((groups, item) => {
            const group = groups[item.category] || [];
            group.push(item);
            groups[item.category] = group;
            return groups;
        }, {});
        res.send(group_places);
    } catch (err) {
        return res.send(err);
    }
});
module.exports = router;
