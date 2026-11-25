import { useState } from "react";
import CursorTrail from "../components/cursortrail";
import { SHOES } from "../data/shoes";
import "../style/mainpage.css";

const MainPage = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    // Automatically builds filter tabs from whatever categories you put in src/data/shoes.js
    const categories = ["All", ...new Set(SHOES.map((shoe) => shoe.category))];

    const visibleShoes =
        activeFilter === "All"
            ? SHOES
            : SHOES.filter((shoe) => shoe.category === activeFilter);

    return (
        <div className="portfolio">
            <CursorTrail />

            {/* NAVBAR */}
            <nav className="navbar">
                <a href="#home" className="logo">
                    <img
                        src="/images/logoprodigal.png"
                        alt="Prodigal$ Logo"
                        className="logo-img"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    PRODIGAL<span>$.</span>
                </a>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#drops">On-Hand Pairs</a>
                    <a href="#how-to-buy">How to Buy</a>
                    <a href="#lookbook">Showcase</a>
                </div>

                <a
                    href="https://www.facebook.com/marketplace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-trigger"
                >
                    FB Marketplace ↗
                </a>
            </nav>

            {/* HERO SECTION (LOGO ONLY ON RIGHT) */}
            <section className="hero" id="home">
                <div className="hero-content">
                  LIMITED THRIFTED PAIRS!

                    <h1>
                        This is
                        <span> Prodigal$.</span>
                    </h1>

                    <p className="hero-description">
                       <span className="rules-title">SHOP RULES!</span>
                        
<ul className="rules-list">
        <li>ALWAYS READ DETAILS BEFORE BUYING, ALL SIZES & FLAWS ARE INDICATED</li>
        <li>PAYMENT FIRST POLICY — GCASH / BANK TRANSFER ONLY (NO COD OR COP)</li>
        <li>1–2 DAYS RESERVATION ONLY • NO CANCELLING • NON-REFUNDABLE DP</li>
        <li>NO RUSH SHIPPING (2–3 DAYS PROCESSING — IT STUDENT SELLERS)</li>
        <li>NO RETURN / NO EXCHANGE / NO REFUND</li>
        <li>MINE AT YOUR OWN RISK</li>
        <li>ALWAYS MANAGE YOUR EXPECTATIONS — ALL PAIRS ARE SELECTED / THRIFTED ONLY</li>
    </ul>


                    
                    </p>

                    <div className="hero-buttons">
                        <a href="#drops" className="primary-btn">
                            Browse On-Hand Pairs →
                        </a>

                        <a href="#how-to-buy" className="secondary-btn">
                            How to Order
                        </a>
                    </div>
                </div>

                {/* HERO LOGO SHOWCASE */}
                <div className="hero-profiles hero-logo-only">
                    <div className="hero-logo-orb">
                        <img
                            src="/images/logoprodigal.png"
                            alt="Prodigal$ Official Logo"
                        />
                    </div>
                    <div className="circle-decoration"></div>
                </div>

                
            </section>

  <div className="hero-logo-rect">
                        <img
                            src="/images/prodigalglow.png"
                            alt="Prodigal$ Banner Logo"
                        />
                    </div>
                    
            {/* ON-HAND SHOES */}
            <section className="section" id="drops">
                <div className="section-heading">
                    <p>01 — ON-HAND INVENTORY</p>
                    <h2>
                        The freshest thrifted.
                    </h2>
                </div>

                <div className="filter-bar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`filter-pill ${
                                activeFilter === cat ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="about-grid">
                    {visibleShoes.map((shoe, idx) => (
                        <div
                            key={shoe.id}
                            className={`person-card ${idx % 2 === 1 ? "reverse" : ""}`}
                        >
                            <div className="person-image">
                                <span className="price-badge">
                                    {shoe.price}
                                </span>
                                <img src={shoe.image} alt={shoe.name} />
                            </div>

                            <div className="person-info">
                                <span>
                                    {String(idx + 1).padStart(2, "0")} •{" "}
                                    {shoe.category.toUpperCase()}
                                </span>

                                <h3>{shoe.name}</h3>

                                <p className="role">
                                    {shoe.price} • {shoe.condition}
                                </p>

                                <p>{shoe.description}</p>

                                <div className="facts">
                                    <div>
                                        <strong>Size Available</strong>
                                        <span className="size-highlight">
                                            {shoe.sizeAvailable}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>Colorway</strong>
                                        <span>{shoe.colorway}</span>
                                    </div>

                                    <div>
                                        <strong>Condition</strong>
                                        <span>{shoe.condition}</span>
                                    </div>
                                </div>

                                <div className="shop-actions">
                                    <a
                                        href={shoe.fbMarketplaceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="primary-btn"
                                    >
                                        Buy Now on Facebook Marketplace ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW TO BUY */}
            <section className="journey section" id="how-to-buy">
                <div className="section-heading center">
                    <p>02 — HOW TO ORDER</p>
                    <h2>
                        Fast, legit,
                        <br />
                        and hassle-free.
                    </h2>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-number">01</div>
                        <div>
                            <span>CHECK ON-HAND STOCK</span>
                            <h3>Pick Your Pair & Verify Size</h3>
                            <p>
                                Since we operate as a curated reseller, each
                                listing shows the exact on-hand size and
                                condition available.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">02</div>
                        <div>
                            <span>MESSAGE ON FACEBOOK</span>
                            <h3>Tap “Buy Now” to Open Marketplace</h3>
                            <p>
                                Clicking Buy Now takes you straight to that
                                pair’s Facebook Marketplace listing where you can
                                request detailed photos, legit-check tags, or
                                reserve the item.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-number">03</div>
                        <div>
                            <span>MEETUP OR SHIPPING</span>
                            <h3>Davao Meetup or Nationwide Courier</h3>
                            <p>
                                Pay via GCash, Maya, Bank Transfer, or Cash on
                                Meetup around Davao City. Nationwide orders ship
                                double-boxed via LBC or J&T.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHOWCASE VIDEO */}
            <section className="section media-section" id="lookbook">
                <div className="section-heading">
                    <p>03 — CLOSER LOOK</p>
                    <h2>
                        Prodigal$
                        <br />
                        Shoecase.
                    </h2>
                </div>

                <a
                    href="https://www.facebook.com/reel/1169239329405209"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-container video-link-card"
                >
                    <img src="/images/logoprodigal.png" alt="Watch Prodigal$ Reel" />
                    <div className="video-label">
                        <span>▶</span> Watch! ↗
                    </div>
                </a>
            </section>

            {/* STORE GUARANTEES */}
            <section className="facts-section section">
                <div className="section-heading center">
                    <p>04 — WHY BUY FROM PRODIGAL$</p>
                    <h2>
                        Trusted local
                        <br />
                        sneaker plug.
                    </h2>
                </div>

                <div className="fact-grid">
                    <div className="fact-card">
                        <span>01</span>
                        <h3>100% Authentic</h3>
                        <p>
                            Every pair undergoes multi-point legit checking
                            before it ever hits our inventory.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>02</span>
                        <h3>On-Hand Pairs</h3>
                        <p>
                            No long pre-order waits—if it’s listed with a size,
                            it’s physically on hand and ready.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>03</span>
                        <h3>Davao Meetups</h3>
                        <p>
                            Inspect the pair in person at convenient Davao City
                            meetup spots or book instant rider delivery.
                        </p>
                    </div>

                    <div className="fact-card">
                        <span>04</span>
                        <h3>Nationwide Shipping</h3>
                        <p>
                            Bubble-wrapped and double-boxed shipping anywhere in
                            the Philippines with tracking.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="footer-title">
                    <p>LOCK IN YOUR PAIR</p>
                    <h2>
                        Step with
                        <span> Prodigal$.</span>
                    </h2>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Prodigal$ Thrift</span>
                    <span>Davao City • Philippines</span>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;