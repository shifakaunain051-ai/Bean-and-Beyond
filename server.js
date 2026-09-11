/**
 * BEAN & BEYOND — BACKEND SERVER & REST API
 * Node.js Native HTTP Server with Persistent JSON Data Store
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const GUESTBOOK_FILE = path.join(DATA_DIR, 'guestbook.json');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Helper: Read JSON file safely
function readData(filePath, defaultData = []) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            return defaultData;
        }
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return defaultData;
    }
}

// Helper: Write JSON file safely
function writeData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
        return false;
    }
}

// Helper: Send JSON Response
function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(payload));
}

// Helper: Parse Request Body JSON
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1e6) { // 1MB limit
                req.destroy();
                reject(new Error('Payload Too Large'));
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', err => reject(err));
    });
}

// Main HTTP Handler
const server = http.createServer(async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // =========================================================================
    // API ROUTES
    // =========================================================================

    // 1. ORDERS API
    if (pathname === '/api/orders') {
        if (method === 'GET') {
            const orders = readData(ORDERS_FILE, []);
            sendJson(res, 200, { success: true, count: orders.length, orders });
            return;
        }

        if (method === 'POST') {
            try {
                const body = await parseRequestBody(req);
                const orders = readData(ORDERS_FILE, []);

                const orderNum = 'BB-' + Math.floor(1000 + Math.random() * 9000);
                const newOrder = {
                    id: orderNum,
                    customerName: body.customerName || 'Anonymous Guest',
                    tableOrPickup: body.tableOrPickup || 'Counter Pickup',
                    speed: body.speed || 'Brew Immediately (~7 mins)',
                    items: body.items || [],
                    subtotal: body.subtotal || 0,
                    discount: body.discount || 0,
                    grandTotal: body.grandTotal || 0,
                    promoCode: body.promoCode || null,
                    status: 'queued', // queued -> brewing -> ready -> completed
                    createdAt: new Date().toISOString()
                };

                orders.unshift(newOrder);
                writeData(ORDERS_FILE, orders);

                console.log(`[ORDER] New order ${newOrder.id} placed by ${newOrder.customerName} for ${newOrder.tableOrPickup}`);
                sendJson(res, 201, { success: true, order: newOrder });
                return;
            } catch (err) {
                sendJson(res, 400, { success: false, error: err.message });
                return;
            }
        }
    }

    // 2. ORDER STATUS UPDATE (for Barista Dashboard)
    if (pathname.startsWith('/api/orders/') && pathname.endsWith('/status') && method === 'PATCH') {
        const parts = pathname.split('/');
        const orderId = parts[3];
        try {
            const body = await parseRequestBody(req);
            const orders = readData(ORDERS_FILE, []);
            const order = orders.find(o => o.id === orderId);

            if (!order) {
                sendJson(res, 404, { success: false, error: 'Order not found' });
                return;
            }

            if (body.status) {
                order.status = body.status;
                writeData(ORDERS_FILE, orders);
                console.log(`[ORDER STATUS] ${orderId} updated to: ${order.status}`);
            }

            sendJson(res, 200, { success: true, order });
            return;
        } catch (err) {
            sendJson(res, 400, { success: false, error: err.message });
            return;
        }
    }

    // 3. RESERVATIONS API
    if (pathname === '/api/reservations') {
        if (method === 'GET') {
            const reservations = readData(RESERVATIONS_FILE, []);
            sendJson(res, 200, { success: true, count: reservations.length, reservations });
            return;
        }

        if (method === 'POST') {
            try {
                const body = await parseRequestBody(req);
                const reservations = readData(RESERVATIONS_FILE, []);

                const refId = 'RES-' + Math.floor(1000 + Math.random() * 9000);
                const newRes = {
                    id: refId,
                    name: body.name || 'Guest',
                    phone: body.phone || 'N/A',
                    guests: body.guests || '2 Persons',
                    area: body.area || 'Corner Window Table',
                    date: body.date || new Date().toISOString().split('T')[0],
                    time: body.time || 'Morning Pour (08:30 AM)',
                    status: 'confirmed',
                    createdAt: new Date().toISOString()
                };

                reservations.unshift(newRes);
                writeData(RESERVATIONS_FILE, reservations);

                console.log(`[RESERVATION] New booking ${refId} for ${newRes.name} (${newRes.area})`);
                sendJson(res, 201, { success: true, reservation: newRes });
                return;
            } catch (err) {
                sendJson(res, 400, { success: false, error: err.message });
                return;
            }
        }
    }

    // 4. GUESTBOOK API
    if (pathname === '/api/guestbook') {
        if (method === 'GET') {
            const notes = readData(GUESTBOOK_FILE, []);
            sendJson(res, 200, { success: true, notes });
            return;
        }

        if (method === 'POST') {
            try {
                const body = await parseRequestBody(req);
                const notes = readData(GUESTBOOK_FILE, []);

                if (!body.text) {
                    sendJson(res, 400, { success: false, error: 'Text required' });
                    return;
                }

                const newNote = {
                    id: Date.now(),
                    text: `"${body.text.replace(/^"|"$/g, '')}"`,
                    author: body.author || 'Anonymous Coffee Lover',
                    likes: 1,
                    createdAt: new Date().toISOString()
                };

                notes.unshift(newNote);
                writeData(GUESTBOOK_FILE, notes);

                sendJson(res, 201, { success: true, note: newNote });
                return;
            } catch (err) {
                sendJson(res, 400, { success: false, error: err.message });
                return;
            }
        }
    }

    // 5. GUESTBOOK UPVOTE LIKE
    if (pathname.startsWith('/api/guestbook/') && pathname.endsWith('/like') && method === 'POST') {
        const parts = pathname.split('/');
        const noteId = parseInt(parts[3], 10);
        const notes = readData(GUESTBOOK_FILE, []);
        const note = notes.find(n => n.id === noteId);

        if (!note) {
            sendJson(res, 404, { success: false, error: 'Note not found' });
            return;
        }

        note.likes = (note.likes || 0) + 1;
        writeData(GUESTBOOK_FILE, notes);
        sendJson(res, 200, { success: true, likes: note.likes });
        return;
    }

    // 6. BARISTA STATS
    if (pathname === '/api/stats' && method === 'GET') {
        const orders = readData(ORDERS_FILE, []);
        const reservations = readData(RESERVATIONS_FILE, []);

        const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
        const activeOrders = orders.filter(o => o.status === 'queued' || o.status === 'brewing').length;
        const totalCups = orders.reduce((sum, o) => {
            return sum + (o.items || []).reduce((itemSum, i) => itemSum + (i.quantity || 1), 0);
        }, 0);

        sendJson(res, 200, {
            success: true,
            totalOrders: orders.length,
            activeOrders,
            totalRevenue,
            totalCups,
            totalReservations: reservations.length
        });
        return;
    }

    // =========================================================================
    // STATIC FILE SERVING & PAGES
    // =========================================================================

    let reqPath = pathname;
    if (reqPath === '/' || reqPath === '/index') {
        reqPath = '/index.html';
    } else if (reqPath === '/barista' || reqPath === '/admin') {
        reqPath = '/barista.html';
    }

    const filePath = path.join(__dirname, reqPath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <body style="font-family:sans-serif; text-align:center; padding:80px; background:#f6f2ea; color:#211915;">
                    <h1 style="font-size:3rem; margin-bottom:10px;">☕ 404</h1>
                    <p style="font-size:1.2rem; color:#6e6158;">This cup of coffee could not be found.</p>
                    <a href="/" style="display:inline-block; margin-top:20px; padding:12px 24px; background:#211915; color:#f6f2ea; text-decoration:none; border-radius:30px;">Return to Coffeehouse</a>
                </body>
            `);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
        });

        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`
    ☕ ================================================
    ☕ BEAN & BEYOND FULL-STACK SERVER RUNNING
    ☕ Web App:  http://localhost:${PORT}/
    ☕ Barista:  http://localhost:${PORT}/barista
    ☕ REST API: http://localhost:${PORT}/api/orders
    ☕ ================================================
    `);
});
