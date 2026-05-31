const STATIC_REVIEWS = [
    {
        name: "James R.",
        role: "Restoration Agency, Dallas TX",
        rating: 5,
        text: "SMBify cleaned up citations, reworked our GBP, and helped one water damage client move into the local 3-pack. The fulfillment was white-label ready from day one."
    },
    {
        name: "Chloe M.",
        role: "HVAC Marketing Partner, Phoenix AZ",
        rating: 5,
        text: "We needed a fulfillment partner who understood service-area businesses. SMBify handled citations, entity work, and local SEO tasks without constant hand-holding."
    },
    {
        name: "Daniel P.",
        role: "Roofing Agency, Raleigh NC",
        rating: 5,
        text: "Our roofing client's location pages finally matched the SEO strategy. Rankings improved, lead quality improved, and the monthly delivery stayed consistent."
    },
    {
        name: "Sarah L.",
        role: "Plumbing Consultant, Chicago IL",
        rating: 5,
        text: "The citation audit and GBP updates fixed inconsistencies that were holding us back. Within weeks we saw better map visibility and more calls from non-branded searches."
    },
    {
        name: "Emma T.",
        role: "Dental Growth Consultant, London UK",
        rating: 5,
        text: "SMBify gave us a dependable white-label process. Reports were clear, turnaround times were predictable, and the recommendations matched real local search intent."
    }
];

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ7RJFM85FJjkReBlwUEOtLuQ";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("google-reviews-container");
    if (!container) return;

    // Preserve the server-rendered reviews for crawlers and no-JS visitors.
    if (container.querySelector(".review-card")) return;

    renderReviews(STATIC_REVIEWS, container);
});

function renderReviews(reviews, container) {
    const cards = reviews.map((review) => `
        <article class="review-card" style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <h5 style="margin: 0; font-size: 1rem;">${review.name}</h5>
                    <span style="font-size: 0.85rem; color: var(--text-tertiary);">${review.role}</span>
                </div>
                <span style="font-size: 0.9rem; color: #F4B400;">${"★".repeat(review.rating)}</span>
            </div>
            <p class="review-text" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin: 0;">
                "${review.text}"
            </p>
        </article>
    `).join("");

    container.innerHTML = `
        <div class="reviews-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${cards}
        </div>
        <div class="text-center mt-lg">
            <a href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
                Write a Review on Google
            </a>
        </div>
    `;
}
