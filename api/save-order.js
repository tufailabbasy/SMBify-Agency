const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Google Sheets webhook URL (deployed Google Apps Script web app)
const GOOGLE_SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

// WhatsApp notification via CallMeBot (free)
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE;   // Your WhatsApp number with country code, e.g. 923437967815
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;  // API key from CallMeBot

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { sessionId, orderData } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: 'Missing session ID' });
        }

        // Verify the Stripe session is paid
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        // Map serviceId to a friendly sheet/tab name
        const serviceSheetMap = {
            'local-citations': 'Local Citations',
            'press-release': 'Press Release',
            'local-seo-service': 'Local SEO',
            'social-signals': 'Social Signals',
            'website-design': 'Website Design',
            'foundational-backlinks': 'Foundational Backlinks',
            'cloud-stack-backlinks': 'Cloud Stack Backlinks',
            'google-entity-stack': 'Google Entity Stack',
            'forum-backlinks': 'Forum Backlinks',
            'web2-map-embeds': 'Web2 Map Embeds',
            'brand-mentions': 'Brand Mentions',
            'premium-guest-posting': 'Premium Guest Posting'
        };
        const serviceId = orderData.serviceId || session.metadata?.serviceId || '';
        const sheetName = serviceSheetMap[serviceId] || 'Other Orders';

        // Build the row data for Google Sheets
        const totalPaid = '$' + (session.amount_total / 100).toFixed(2);
        const customerEmail = orderData.reportEmail || orderData.contactEmail || session.customer_email || '';
        const businessName = orderData.businessName || orderData.companyName || '';

        const rowData = {
            sheetName: sheetName,
            timestamp: new Date().toISOString(),
            stripeSessionId: sessionId,
            paymentIntent: session.payment_intent,
            totalPaid: totalPaid,
            // Service details
            serviceId: serviceId,
            quantity: orderData.quantity || '',
            citationsAudit: orderData.citationsAudit ? 'Yes' : 'No',
            // Contact info
            reportEmail: customerEmail,
            whatsappPhone: orderData.whatsappPhone || '',
            // Business details
            businessName: businessName,
            businessCountry: orderData.businessCountry || '',
            businessPhone: orderData.businessPhone || '',
            businessEmail: orderData.businessEmail || '',
            businessAddress: orderData.businessAddress || '',
            businessCity: orderData.businessCity || '',
            businessState: orderData.businessState || '',
            businessZip: orderData.businessZip || '',
            businessWebsite: orderData.businessWebsite || '',
            businessCategory: orderData.businessCategory || '',
            businessHours: orderData.businessHours || '',
            yearFounded: orderData.yearFounded || '',
            businessDescription: orderData.businessDescription || '',
            specialInstructions: orderData.specialInstructions || '',
            getImagesFromWebsite: orderData.getImagesFromWebsite ? 'Yes' : 'No',
            // Press Release fields
            contactName: orderData.contactName || '',
            pressReleaseTitle: orderData.pressReleaseTitle || '',
            pressReleaseContent: orderData.pressReleaseContent || '',
            targetAudience: orderData.targetAudience || '',
            distributionPackage: orderData.distributionPackage || '',
            // Local SEO fields
            targetKeywords: orderData.targetKeywords || session.metadata?.targetKeywords || '',
            targetLocations: orderData.targetLocations || '',
            campaignGoals: orderData.campaignGoals || '',
            // New Unified Citation fields
            logoImagesLink: orderData.logoImagesLink || session.metadata?.logoImagesLink || '',
            existingCitations: orderData.existingCitations || session.metadata?.existingCitations || '',
            gmbUrl: orderData.gmbUrl || session.metadata?.gmbUrl || '',
            selectedPackage: orderData.selectedPackage || orderData.packageId || '',
            status: 'Paid'
        };

        // Send to Google Sheets via Apps Script webhook
        if (GOOGLE_SHEETS_WEBHOOK) {
            const sheetsResponse = await fetch(GOOGLE_SHEETS_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rowData)
            });

            if (!sheetsResponse.ok) {
                console.error('Google Sheets webhook error:', await sheetsResponse.text());
            }
        } else {
            console.warn('GOOGLE_SHEETS_WEBHOOK_URL not set. Order data is still available in Stripe Dashboard metadata.');
        }

        // Send WhatsApp notification via CallMeBot
        if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
            try {
                const message = [
                    `🛒 *New Order on SMBify!*`,
                    ``,
                    `📦 *Service:* ${sheetName}`,
                    `💰 *Amount:* ${totalPaid}`,
                    `🏢 *Business:* ${businessName || 'N/A'}`,
                    `📧 *Email:* ${customerEmail || 'N/A'}`,
                    `📱 *WhatsApp:* ${orderData.whatsappPhone || 'N/A'}`,
                    orderData.quantity ? `🔢 *Qty:* ${orderData.quantity}` : '',
                    orderData.selectedPackage || orderData.packageId ? `📋 *Package:* ${orderData.selectedPackage || orderData.packageId}` : '',
                    ``,
                    `⏰ ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}`,
                ].filter(Boolean).join('\n');

                const encodedMsg = encodeURIComponent(message);
                const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodedMsg}&apikey=${CALLMEBOT_APIKEY}`;

                await fetch(callmebotUrl);
                console.log('WhatsApp notification sent successfully');
            } catch (waErr) {
                // Don't fail the order if WhatsApp notification fails
                console.error('WhatsApp notification error:', waErr.message);
            }
        }

        res.status(200).json({ success: true, message: 'Order saved successfully' });

    } catch (err) {
        console.error('Save order error:', err);
        res.status(500).json({ error: 'Error saving order', message: err.message });
    }
};
