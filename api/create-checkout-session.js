const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICING_CONFIG = {
  // Quantity-based services (Slider)
  'local-citations': {
    name: 'Local Citations',
    type: 'quantity',
    unitAmount: 100, // $1.00 per citation
    description: 'Manual local citations submission service'
  },
  'social-signals': {
    name: 'Social Signals',
    type: 'package',
    packages: {
      'starter': { amount: 4900, name: 'Starter (500 Signals)' },
      'growth': { amount: 9900, name: 'Growth (1500 Signals)' },
      'authority': { amount: 17900, name: 'Authority (4000 Signals)' }
    },
    description: 'Real social engagement signals'
  },
  'premium-guest-posting': {
    name: 'Premium Guest Posting',
    type: 'quantity',
    unitAmount: 100, // $1.00 per link (based on slider)
    description: 'High-authority guest posts on real editorial sites'
  },
  'google-entity-stack': {
    name: 'Google Entity Stack',
    type: 'package',
    packages: {
      'standard': { amount: 4900, name: 'Standard Stack' }
    }
  },
  'web2-map-embeds': {
    name: 'Web2 Map Embeds',
    type: 'package',
    packages: {
      'starter': { amount: 7900, name: 'Starter (2500 Embeds)' },
      'pro': { amount: 14900, name: 'Pro (5000 Embeds)' },
      'advanced': { amount: 24900, name: 'Advanced (10000 Embeds)' }
    }
  },
  'brand-mentions': {
    name: 'Brand Mentions',
    type: 'package',
    packages: {
      'starter': { amount: 14900, name: 'Starter (5 Mentions)' },
      'professional': { amount: 29900, name: 'Professional (10 Mentions)' },
      'authority': { amount: 49900, name: 'Authority (20 Mentions)' }
    }
  },
  'forum-backlinks': {
    name: 'Forum Backlinks',
    type: 'package',
    packages: {
      'starter': { amount: 7900, name: 'Starter (20 Links)' },
      'pro': { amount: 14900, name: 'Pro (50 Links)' },
      'advanced': { amount: 24900, name: 'Advanced (100 Links)' }
    }
  },
  'cloud-stack-backlinks': {
    name: 'Cloud Stack Backlinks',
    type: 'package',
    packages: {
      'starter': { amount: 12900, name: 'Starter (5 Stacks)' },
      'pro': { amount: 22900, name: 'Pro (12 Stacks)' },
      'advanced': { amount: 37900, name: 'Advanced (25 Stacks)' }
    }
  },

  // Package-based services (Radio Buttons)
  'local-seo-service': {
    name: 'Local SEO',
    type: 'package',
    packages: {
      'basic': { amount: 29900, name: 'Basic Package' },    // $299
      'pro': { amount: 49900, name: 'Pro Package' },        // $499
      'advanced': { amount: 79900, name: 'Advanced Package' } // $799
    }
  },
  'website-design': {
    name: 'Website Design',
    type: 'package',
    packages: {
      'wordpress': { amount: 20000, name: 'WordPress Website' },  // $200
      'html': { amount: 40000, name: 'Custom HTML Website' }       // $400
    }
  },
  'press-release': {
    name: 'Press Release',
    type: 'package',
    packages: {
      'basic': { amount: 14900, name: 'Basic Distribution' },
      'standard': { amount: 24900, name: 'Standard Distribution' },
      'premium': { amount: 39900, name: 'Premium Distribution' },
      'enterprise': { amount: 59900, name: 'Enterprise Distribution' }
    }
  },
  'foundational-backlinks': {
    name: 'Foundational Backlinks',
    type: 'package',
    packages: {
      'starter': { amount: 9900, name: 'Starter Pack' },
      'growth': { amount: 19900, name: 'Growth Pack' },
      'authority': { amount: 29900, name: 'Authority Pack' }
    }
  },
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const {
      serviceId,        // maps to keys in PRICING_CONFIG e.g. 'local-citations'
      quantity,
      packageId,        // e.g. 'basic', 'pro'
      citationsAudit,
      // Contact info
      reportEmail,
      whatsappPhone,
      // Business details
      businessName,
      businessCountry,
      businessPhone,
      businessEmail,
      businessAddress,
      businessCity,
      businessState,
      businessZip,
      businessWebsite,
      businessCategory,
      businessHours,
      yearFounded,
      businessDescription,
      specialInstructions,
      getImagesFromWebsite,
      // New fields
      logoImagesLink,
      existingCitations,
      gmbUrl,
      // Press Release fields
      contactEmail,
      contactName,
      companyName,
      pressReleaseTitle,
      pressReleaseContent,
      targetAudience,
      distributionPackage,
      // Local SEO fields
      targetKeywords: targetKeywordsBody, 
      targetLocations,
      campaignGoals,
      selectedPackage
    } = req.body;

    const serviceConfig = PRICING_CONFIG[serviceId];

    if (!serviceConfig) {
      return res.status(400).json({ error: 'Invalid service ID' });
    }

    const line_items = [];
    let metadataProduct = serviceConfig.name;

    // Handle Quantity-Based Pricing
    if (serviceConfig.type === 'quantity') {
      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: serviceConfig.name,
            description: serviceConfig.description,
          },
          unit_amount: serviceConfig.unitAmount,
        },
        quantity: quantity,
      });
    }
    // Handle Package-Based Pricing
    else if (serviceConfig.type === 'package') {
      if (!packageId || !serviceConfig.packages[packageId]) {
        return res.status(400).json({ error: 'Invalid package selection' });
      }
      const pkg = serviceConfig.packages[packageId];
      metadataProduct = `${serviceConfig.name} - ${pkg.name}`;

      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${serviceConfig.name} (${pkg.name})`,
            description: serviceConfig.description || `${pkg.name} Service`,
          },
          unit_amount: pkg.amount,
        },
        quantity: 1,
      });
    }

    // Addons (Global)
    if (citationsAudit) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Citations Audit',
            description: 'Comprehensive audit of existing citations',
          },
          unit_amount: 5000,
        },
        quantity: 1,
      });
    }

    // Helper to safely truncate strings for Stripe metadata (max 500 chars per value)
    const truncate = (str, max = 500) => str ? String(str).substring(0, max) : '';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/services/${serviceId}-intake?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.origin}/services/${serviceId}-intake?canceled=true`,
      customer_email: reportEmail || contactEmail,
      metadata: {
        product: metadataProduct,
        serviceId: serviceId || '',
        quantity: quantity ? String(quantity) : '',
        packageId: packageId || selectedPackage || '',
        citationsAudit: citationsAudit ? 'true' : 'false',
        // Contact info
        reportEmail: reportEmail || '',
        contactEmail: contactEmail || '',
        contactName: contactName || '',
        whatsappPhone: whatsappPhone || '',
        // Business details
        businessName: businessName || companyName || '',
        businessCountry: businessCountry || '',
        businessPhone: businessPhone || '',
        businessEmail: businessEmail || '',
        businessAddress: businessAddress || '',
        businessCity: businessCity || '',
        businessState: businessState || '',
        businessZip: businessZip || '',
        businessWebsite: businessWebsite || '',
        businessCategory: businessCategory || '',
        businessHours: businessHours || '',
        yearFounded: yearFounded || '',
        businessDescription: truncate(businessDescription),
        specialInstructions: truncate(specialInstructions),
        getImagesFromWebsite: getImagesFromWebsite ? 'true' : 'false',
        // New Unified Form fields
        targetKeywords: truncate(targetKeywords || targetKeywordsBody),
        logoImagesLink: truncate(logoImagesLink),
        existingCitations: truncate(existingCitations),
        gmbUrl: truncate(gmbUrl),
        // Press Release fields
        pressReleaseTitle: truncate(pressReleaseTitle),
        pressReleaseContent: truncate(pressReleaseContent, 400),
        targetAudience: targetAudience || '',
        distributionPackage: distributionPackage || '',
        // Local SEO fields
        targetKeywords: truncate(targetKeywords),
        targetLocations: truncate(targetLocations),
        campaignGoals: truncate(campaignGoals)
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Error creating checkout session', message: err.message });
  }
};
