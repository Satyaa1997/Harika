import { useEffect, useState } from "react";
import "./App.css";

const assets = import.meta.glob("./assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});
const asset = (name) => assets[`./assets/${name}`];

const plotSlides = [
  { title: "Hari Udyan", image: "Hari Udyan Garden Escape.png" },
  { title: "Hari Sarovar", image: "Hari Sarovar Lakeside Garden.png" },
  { title: "Hari Vatika", image: "Hari vatika.png" },
  { title: "Hari Nikunj", image: "Hari nikunj.png" },
  { title: "Hari Ambar", image: "Hari Ambar.png" },
  { title: "Hari Upvan", image: "Hari Upvan.png" },
  { title: "Hari Vanam", image: "Hari vanam.png" },
];

const amenities = [
  [
    "road",
    "Well-planned roads",
    "Thoughtfully laid out internal roads",
    "planedroad.webp",
  ],
  [
    "club",
    "Club house",
    "A place to gather and unwind",
    "HARIKA PARADISE VIEW-12.jpg_result.jpg",
  ],
  [
    "leaf",
    "Green open spaces",
    "Landscaped spaces to breathe",
    "Green landspace.avif",
  ],
  [
    "play",
    "Children’s play area",
    "Room for little adventures",
    "Kids’ Play Zones.png",
  ],
  [
    "light",
    "Street lighting",
    "Well-lit community streets",
    "streetlight (2).jpg",
  ],
  [
    "nature",
    "Natural surroundings",
    "A calmer everyday setting",
    "01_00384.jpg_result.jpg",
  ],
  [
    "shop",
    "Daily needs shops",
    "Convenient essentials close by",
    "Dailyneed shop.jpg",
  ],
  ["gate", "Grand entrance gate", "A warm welcome home", "grand interence.jpg"],
  [
    "water",
    "Water supply",
    "Planned water supply provision",
    "watersupply.jpg",
  ],
  [
    "drain",
    "Underground drainage",
    "Planned drainage system",
    "underground dranage.jpg",
  ],
];

const gallery = [
  ["01_00027.jpg_result.jpg", "A welcoming address"],
  ["01_00384.jpg_result.jpg", "Green open spaces"],
  ["01_00540.jpg_result.jpg", "Landscaped community"],
  ["01_00634.jpg_result.jpg", "Grand entrance"],
  ["HARIKA PARADISE VIEW-6.jpg (1)_result.jpg", "Everyday conveniences"],
  ["HARIKA PARADISE VIEW-10.jpg_result.jpg", "The plotted master plan"],
  ["HARIKA PARADISE VIEW-12.jpg_result.jpg", "Outdoor entertainment"],
  ["HARIKA PARADISE VIEW-5.jpg_result.jpg", "A place to reconnect"],
];

const stories = [
  {
    image: "characterimage femail3.jfif",
    name: "Priya Sharma",
    place: "Lucknow",
    text: "The open spaces and greenery are what caught my attention. It feels like a place where the family can enjoy a calmer routine.",
  },
  {
    image: "characterimage1.avif",
    name: "Amit Verma",
    place: "Gomti Nagar",
    text: "I liked the planned layout and the choice of plot sizes. It made it easier to picture a home that suits our needs.",
  },
  {
    image: "characterimagefemale1.jfif",
    name: "Neha Singh",
    place: "Lucknow",
    text: "The children’s play area and landscaped spaces stood out to me. I can imagine the family spending time outdoors here.",
  },
  {
    image: "characterimage3.avif",
    name: "Rahul Mishra",
    place: "Indira Nagar",
    text: "The Satrikh Road location works well for us, and I appreciate that everyday facilities have been considered in the plan.",
  },
  {
    image: "charcterimagefemale2.jfif",
    name: "Anjali Gupta",
    place: "Lucknow",
    text: "The community feels thoughtfully planned, from the entrance to the roads and green areas. It has a welcoming feel.",
  },
  {
    image: "characterimge2.avif",
    name: "Vivek Yadav",
    place: "Chinhut",
    text: "There are several plot configurations to consider, which gives us flexibility as we plan for the future.",
  },
];

const navLinks = [
  ["Overview", "overview"],
  ["Master plan", "master-plan"],
  ["Amenities", "amenities"],
  ["Gallery", "gallery"],
  ["Location", "location"],
  ["Reviews", "reviews"],
];

const socialLinks = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
];

const callingCodes = [
  ["+91", "India (+91)"],
  ["+93", "Afghanistan (+93)"],
  ["+1", "United States / Canada (+1)"],
  ["+44", "United Kingdom (+44)"],
  ["+971", "United Arab Emirates (+971)"],
  ["+977", "Nepal (+977)"],
  ["+880", "Bangladesh (+880)"],
  ["+92", "Pakistan (+92)"],
  ["+61", "Australia (+61)"],
  ["+65", "Singapore (+65)"],
];

function Icon({ name, size = 22, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className,
  };
  const paths = {
    road: (
      <>
        <path d="M8 3 5 21M16 3l3 18M12 3v3m0 3v3m0 3v3m0 3v1" />
        <path d="M3 9h4m10 0h4m-4 6h4M3 15h4" />
      </>
    ),
    club: (
      <>
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M8 21v-7h8v7M9 8h.01M15 8h.01" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-8 0-14 4-14 11a5 5 0 0 0 5 5c7 0 9-8 9-16Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </>
    ),
    play: (
      <>
        <path d="M3 11h18M5 11l1 9h12l1-9M7 11V7h10v4M9 7V4h6v3" />
        <path d="M9 15v2m6-2v2" />
      </>
    ),
    light: (
      <>
        <path d="M12 3v2m0 14v2M5.6 5.6 7 7m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    nature: (
      <>
        <path d="M12 21v-8m0 2c-5 0-8-3-8-8 5 0 8 3 8 8Zm0-3c0-5 3-8 8-8 0 5-3 8-8 8Z" />
      </>
    ),
    shop: (
      <>
        <path d="M3 10h18l-2-6H5l-2 6Zm1 0v10h16V10M8 20v-6h8v6" />
        <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      </>
    ),
    gate: (
      <>
        <path d="M4 21V5h16v16M8 21V9h8v12M2 21h20" />
        <path d="M11 12h.01M13 15h.01" />
      </>
    ),
    water: (
      <>
        <path d="M12 3s7 7.3 7 12a7 7 0 0 1-14 0c0-4.7 7-12 7-12Z" />
        <path d="M9 16a3 3 0 0 0 3 3" />
      </>
    ),
    drain: (
      <>
        <path d="M4 5h16M4 10h16M4 15h16M4 20h16" />
        <path d="m8 3-2 4m10 1-2 4m2 1-2 4m-6 1-2 4" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2-3-5Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: (
      <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h1.7V1.4C17 1.2 15.8 1 14.5 1 11 1 9 3 9 6.7V9H6v4h3v8h5Z" />
    ),
    youtube: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </>
    ),
  };
  return <svg {...common}>{paths[name] || paths.leaf}</svg>;
}

function CountUp({ value, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return undefined;
    let frame;
    let startedAt;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const animate = (timestamp) => {
          if (startedAt === undefined) startedAt = timestamp;
          const progress = Math.min((timestamp - startedAt) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          setCount(value * easedProgress);
          if (progress < 1) frame = window.requestAnimationFrame(animate);
          else setCount(value);
        };
        frame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [duration, node, value]);

  const digits = Number.isInteger(value) ? 0 : 2;
  return <b ref={setNode}>{count.toFixed(digits)}</b>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [plotSlide, setPlotSlide] = useState(0);
  const [plotSliderPaused, setPlotSliderPaused] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [amenityIndex, setAmenityIndex] = useState(0);
  const [amenityPaused, setAmenityPaused] = useState(false);
  const [visibleAmenities, setVisibleAmenities] = useState(4);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storiesPaused, setStoriesPaused] = useState(false);
  const [visibleStories, setVisibleStories] = useState(3);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerDismissed, setOfferDismissed] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (amenityPaused) return undefined;
    const slideCount = amenities.length - visibleAmenities + 1;
    const timer = window.setInterval(
      () => setAmenityIndex((index) => (index + 1) % slideCount),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [amenityPaused, visibleAmenities]);

  useEffect(() => {
    if (plotSliderPaused) return undefined;
    const timer = window.setInterval(
      () => setPlotSlide((index) => (index + 1) % plotSlides.length),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [plotSliderPaused]);

  useEffect(() => {
    if (storiesPaused) return undefined;
    const slideCount = stories.length - visibleStories + 1;
    const timer = window.setInterval(
      () => setStoryIndex((index) => (index + 1) % slideCount),
      3800,
    );
    return () => window.clearInterval(timer);
  }, [storiesPaused, visibleStories]);

  useEffect(() => {
    const updateVisibleStories = () => {
      const visible =
        window.innerWidth <= 420 ? 1 : window.innerWidth <= 780 ? 2 : 3;
      setVisibleStories(visible);
      setStoryIndex((index) => Math.min(index, stories.length - visible));
      const amenityVisible =
        window.innerWidth <= 420 ? 1 : window.innerWidth <= 1060 ? 3 : 4;
      setVisibleAmenities(amenityVisible);
      setAmenityIndex((index) =>
        Math.min(index, amenities.length - amenityVisible),
      );
    };
    updateVisibleStories();
    window.addEventListener("resize", updateVisibleStories);
    return () => window.removeEventListener("resize", updateVisibleStories);
  }, []);

  useEffect(() => {
    if (!galleryOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setGalleryOpen(false);
      if (event.key === "ArrowRight")
        setActiveImage((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft")
        setActiveImage(
          (index) => (index - 1 + gallery.length) % gallery.length,
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryOpen]);

  useEffect(() => {
    if (offerDismissed) return undefined;
    const timer = window.setTimeout(() => setOfferOpen(true), 3200);
    return () => window.clearTimeout(timer);
  }, [offerDismissed]);

  const openOffer = () => {
    setMenuOpen(false);
    setOfferDismissed(false);
    setFormMessage("");
    setOfferOpen(true);
  };

  const goToContact = openOffer;

  const closeOffer = () => {
    setOfferOpen(false);
    setOfferDismissed(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    if (formData.countryCode && formData.phone)
      formData.phone = `${formData.countryCode} ${formData.phone}`;
    setIsSubmitting(true);
    setFormMessage("Sending your enquiry…");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "We could not send your enquiry.");

      form.reset();
      setFormMessage(result.message);
      return true;
    } catch (error) {
      setFormMessage(
        error.message ||
          "Could not reach the enquiries service. Please try again later.",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-shell min-h-screen">
      <div className="topline">
        <div className="top-socials" aria-label="Harika Paradise on social media">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name}>
              <Icon name={social.icon} size={16} />
            </a>
          ))}
        </div>
        <a className="top-call-link" href="tel:05224205350" aria-label="Call Harika Paradise at 05224205350">
          <Icon name="phone" size={14} /> 05224205350
        </a>
      </div>
      <header className="site-header sticky top-0 z-30">
        <a className="brand" href="#home" aria-label="Harika Paradise home">
          <img src={asset("logo.png")} alt="Harika Paradise" />
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="nav-cta" onClick={openOffer}>
            Enquire now <Icon name="arrow" size={17} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero relative isolate" id="home">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={asset("01_00634.jpg_result.jpg")}
          >
            <source src={asset("hero vedio.mp4")} type="video/mp4" />
          </video>
          <div className="hero-inner mx-auto">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" /> A thoughtfully planned
                community
              </span>
              <h1>
                Find your space.
                <br />
                <em>Grow your story.</em>
              </h1>
              <p>
                Welcome to Harika Paradise—a considered address where open green
                spaces, modern comforts and a sense of belonging come together.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#overview">
                  Explore the community <Icon name="arrow" size={18} />
                </a>
                <button
                  className="text-link-light hero-enquire-link"
                  onClick={openOffer}
                >
                  Register for best offers <span>↗</span>
                </button>
              </div>
              <div className="hero-location">
                <Icon name="pin" size={17} /> Satrikh Road, Lucknow <span />{" "}
                Residential plots
              </div>
            </div>
          </div>
        </section>

        <section className="highlights" aria-label="Project highlights">
          <div>
            <span className="highlight-icon">
              <Icon name="leaf" />
            </span>
            <span>
              <b>10.38 acres</b>
              <small>Planned community</small>
            </span>
          </div>
          <div>
            <span className="highlight-icon">
              <Icon name="gate" />
            </span>
            <span>
              <b>Residential plots</b>
              <small>Space to make your own</small>
            </span>
          </div>
          <div>
            <span className="highlight-icon">
              <Icon name="pin" />
            </span>
            <span>
              <b>Satrikh Road</b>
              <small>Lucknow</small>
            </span>
          </div>
          <div>
            <span className="highlight-icon">
              <Icon name="check" />
            </span>
            <span>
              <b>Nagar Panchayat</b>
              <small>Approved project</small>
            </span>
          </div>
        </section>

        <section className="section overview-section" id="overview">
          <div className="overview-image-wrap">
            <img
              src={asset("grand interence.jpg")}
              alt="Harika Paradise landscaped entrance"
            />
            <div className="image-stamp">
              <span>Harika</span>
              <small>Paradise · Lucknow</small>
            </div>
          </div>
          <div className="overview-copy">
            <span className="eyebrow">A place to belong</span>
            <h2>
              Where thoughtful planning meets <em>everyday living.</em>
            </h2>
            <p>
              Harika Paradise is a well-planned residential community designed
              around open spaces, green surroundings and the freedom to create a
              home that feels like yours.
            </p>
            <p>
              From a welcoming entrance to everyday conveniences and carefully
              considered infrastructure, each detail is planned to make life
              feel a little more connected.
            </p>
            <a className="inline-link" href="#amenities">
              Discover the community <Icon name="arrow" size={17} />
            </a>
            <div className="mini-stats">
              <div>
                <CountUp value={10.38} />
                <span>Acres of community</span>
              </div>
              <div>
                <CountUp value={10} />
                <span>Everyday amenities</span>
              </div>
              <div>
                <CountUp value={9} />
                <span>Plot configurations</span>
              </div>
            </div>
          </div>
        </section>

        <section className="plots-section" id="plots">
          <div className="section-heading section-heading-center">
            <span className="eyebrow">Make room for what matters</span>
            <h2>
             Seven worlds of nature, one <em>beautiful destination.</em>
            </h2>
            <p>
              Find your favourite among the signature places of Harika Paradise.
            </p>
          </div>
          <div
            className="plot-carousel"
            onMouseEnter={() => setPlotSliderPaused(true)}
            onMouseLeave={() => setPlotSliderPaused(false)}
            onFocusCapture={() => setPlotSliderPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setPlotSliderPaused(false);
            }}
          >
            <div className="plot-slide-stage">
              <img
                key={plotSlides[plotSlide].image}
                src={asset(plotSlides[plotSlide].image)}
                alt={plotSlides[plotSlide].title}
              />
              <div className="plot-slide-shade" />
              <div className="plot-slide-caption">
                <span>Harika Paradise · Signature spaces</span>
                <h3>{plotSlides[plotSlide].title}</h3>
              </div>
              <div className="plot-slide-count">
                {String(plotSlide + 1).padStart(2, "0")} / {String(plotSlides.length).padStart(2, "0")}
              </div>
              <button
                className="plot-slide-arrow plot-slide-prev"
                onClick={() => setPlotSlide((plotSlide - 1 + plotSlides.length) % plotSlides.length)}
                aria-label="Previous signature space"
              >
                <Icon name="arrow" size={21} className="arrow-reverse" />
              </button>
              <button
                className="plot-slide-arrow plot-slide-next"
                onClick={() => setPlotSlide((plotSlide + 1) % plotSlides.length)}
                aria-label="Next signature space"
              >
                <Icon name="arrow" size={21} />
              </button>
              <div className="plot-slide-dots" aria-label="Choose a signature space">
                {plotSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    className={plotSlide === index ? "is-active" : ""}
                    onClick={() => setPlotSlide(index)}
                    aria-label={`Show ${slide.title}`}
                    aria-current={plotSlide === index ? "true" : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="plot-cta">
            <div>
              <span className="eyebrow eyebrow-light">
                Your next chapter starts here
              </span>
              <h3>Need help choosing a plot?</h3>
              <p>
                Tell us what matters to you. We’ll help you explore the options.
              </p>
            </div>
            <button className="button button-light" onClick={goToContact}>
              Talk to our team <Icon name="arrow" size={17} />
            </button>
          </div>
        </section>

        <section className="section master-section" id="master-plan">
          <div className="section-heading">
            <span className="eyebrow">A community in balance</span>
            <h2>
              Thoughtfully planned.
              <br />
              <em>Easy to explore.</em>
            </h2>
            <p>
              See how plots, internal roads and landscaped community spaces come
              together across Harika Paradise.
            </p>
            <div className="master-points">
              <span>
                <Icon name="check" size={17} /> Organised plot layout
              </span>
              <span>
                <Icon name="check" size={17} /> Wide internal roads
              </span>
              <span>
                <Icon name="check" size={17} /> Green spaces within reach
              </span>
            </div>
            <a
              className="button button-primary"
              href={asset("Brochure_Aadi Shakti_25-10-2026.pdf")}
              target="_blank"
              rel="noreferrer"
            >
              Open project brochure <Icon name="arrow" size={18} />
            </a>
          </div>
          <a
            className="master-image"
            href={asset("HARIKA PARADISE VIEW-10.jpg_result.jpg")}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Harika Paradise master plan image"
          >
            <img
              src={asset("HARIKA PARADISE VIEW-10.jpg_result.jpg")}
              alt="Harika Paradise plotted master plan with colour-coded plot blocks"
            />
            <span className="master-image-label">
              <Icon name="road" size={18} /> Community master plan <b>↗</b>
            </span>
          </a>
        </section>

        <section className="amenities-section" id="amenities">
          <div className="section-heading section-heading-center">
            <span className="eyebrow">The little things make a difference</span>
            <h2>
              Space to live well, <em>every day.</em>
            </h2>
            <p>
              Designed with practical comforts and welcoming shared spaces in
              mind.
            </p>
          </div>
          <div
            className="amenity-carousel"
            onMouseEnter={() => setAmenityPaused(true)}
            onMouseLeave={() => setAmenityPaused(false)}
            onFocusCapture={() => setAmenityPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setAmenityPaused(false);
            }}
          >
            <div className="amenity-track-window">
              <div
                className="amenity-track"
                style={{
                  transform: `translateX(calc(-${(amenityIndex * 100) / visibleAmenities}% - ${(amenityIndex * (visibleAmenities === 4 ? 18 : visibleAmenities === 3 ? 14 : 12)) / visibleAmenities}px))`,
                }}
              >
                {amenities.map(([icon, title, detail, photo]) => (
                  <article className="amenity-card" key={title}>
                    <img src={asset(photo)} alt={title} />
                    <div className="amenity-card-meta">
                      <strong>{title}</strong>
                      <span aria-hidden="true" />
                      <p>{detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="amenity-controls">
              <div className="amenity-dots" aria-label="Amenity slides">
                {Array.from(
                  { length: amenities.length - visibleAmenities + 1 },
                  (_, index) => (
                    <button
                      key={index}
                      className={amenityIndex === index ? "is-active" : ""}
                      onClick={() => setAmenityIndex(index)}
                      aria-label={`Show amenities slide ${index + 1}`}
                      aria-pressed={amenityIndex === index}
                    />
                  ),
                )}
              </div>
              <div className="amenity-arrows">
                <button
                  onClick={() =>
                    setAmenityIndex(
                      (amenityIndex -
                        1 +
                        amenities.length -
                        visibleAmenities +
                        1) %
                        (amenities.length - visibleAmenities + 1),
                    )
                  }
                  aria-label="Previous amenity"
                >
                  <Icon name="arrow" size={17} className="arrow-reverse" />
                </button>
                <button
                  onClick={() =>
                    setAmenityIndex(
                      (amenityIndex + 1) %
                        (amenities.length - visibleAmenities + 1),
                    )
                  }
                  aria-label="Next amenity"
                >
                  <Icon name="arrow" size={17} />
                </button>
              </div>
            </div>
          </div>
          <div className="amenity-image-row">
            <img
              src={asset("HARIKA PARADISE VIEW-2.jpg_result.jpg")}
              alt="Landscaped green community area"
            />
            <div>
              <span className="eyebrow eyebrow-light">
                Move · Breathe · Reconnect
              </span>
              <h3>
                Room to slow down
                <br />
                and enjoy the outdoors.
              </h3>
              <p>
                Green surroundings and shared spaces make the outdoors part of
                everyday life.
              </p>
              <a className="text-link-light" href="#gallery">
                Explore the gallery <span>↗</span>
              </a>
            </div>
            <img
              src={asset("HARIKA PARADISE VIEW-12.jpg_result.jpg")}
              alt="Outdoor entertainment space at Harika Paradise"
            />
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="gallery-heading">
            <div>
              <span className="eyebrow">A glimpse of what’s taking shape</span>
              <h2>
                See the <em>possibilities.</em>
              </h2>
            </div>
            <div className="gallery-count">
              <b>{String(activeImage + 1).padStart(2, "0")}</b>
              <span>/ {String(gallery.length).padStart(2, "0")}</span>
            </div>
          </div>
          <button
            className="gallery-feature"
            onClick={() => setGalleryOpen(true)}
            aria-label={`Open ${gallery[activeImage][1]} in image viewer`}
          >
            <img
              src={asset(gallery[activeImage][0])}
              alt={gallery[activeImage][1]}
            />
            <div className="gallery-feature-caption">
              <span>{gallery[activeImage][1]}</span>
              <span>Click to view full image ↗</span>
            </div>
          </button>
          <div className="gallery-thumbs">
            {gallery.map(([src, caption], index) => (
              <button
                className={activeImage === index ? "is-active" : ""}
                key={src}
                onClick={() => setActiveImage(index)}
                aria-label={`View ${caption}`}
                aria-pressed={activeImage === index}
              >
                <img src={asset(src)} alt="" />
                <span>{caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="location-section" id="location">
          <div className="location-copy">
            <span className="eyebrow">Connected to what’s next</span>
            <h2>
              A convenient address on <em>Satrikh Road.</em>
            </h2>
            <p>
              Harika Paradise sits along Satrikh Road, with key Lucknow
              destinations connected by established road corridors.
            </p>
            <div className="connectivity-list">
              <div>
                <span className="connectivity-pin">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <b>Ayodhya Road</b>
                  <small>Approx. 5 km</small>
                </span>
              </div>
              <div>
                <span className="connectivity-pin">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <b>Kishan Path</b>
                  <small>Approx. 9 km</small>
                </span>
              </div>
              <div>
                <span className="connectivity-pin">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <b>Chinhut</b>
                  <small>Approx. 15.6 km</small>
                </span>
              </div>
              <div>
                <span className="connectivity-pin">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <b>Polytechnic</b>
                  <small>Approx. 18 km</small>
                </span>
              </div>
              <div>
                <span className="connectivity-pin">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <b>Ahmamau</b>
                  <small>Approx. 27 km</small>
                </span>
              </div>
            </div>
            <a
              className="inline-link"
              href="https://www.google.com/maps/search/?api=1&query=Satrikh+Road%2C+Lucknow"
              target="_blank"
              rel="noreferrer"
            >
              Explore the location <Icon name="arrow" size={17} />
            </a>
            <small className="distance-note">
              Distances are approximate and based on the project brochure.
            </small>
          </div>
          <div className="location-visual">
            <img
              src={asset("01_01670.jpg_result.jpg")}
              alt="Aerial view of the Harika Paradise community plan"
            />
            <div className="location-tag">
              <span className="location-tag-icon">
                <Icon name="pin" size={20} />
              </span>
              <span>
                <b>Harika Paradise</b>
                <small>Satrikh Road, Lucknow</small>
              </span>
            </div>
            <span className="map-caption">
              A considered address, close to everyday connections.
            </span>
          </div>
        </section>

        <section className="stories-section" id="reviews">
          <div className="section-heading section-heading-center">
            <span className="eyebrow">
              A neighbourhood shaped by its people
            </span>
            <h2>
              What our customers <em>say.</em>
            </h2>
            <p>Stories from people exploring a place to call their own.</p>
          </div>
          <div
            className="stories-carousel"
            onMouseEnter={() => setStoriesPaused(true)}
            onMouseLeave={() => setStoriesPaused(false)}
            onFocusCapture={() => setStoriesPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setStoriesPaused(false);
            }}
          >
            <div className="stories-track-window">
              <div
                className="stories-track"
                style={{
                  transform: `translateX(calc(-${(storyIndex * 100) / visibleStories}% - ${(storyIndex * (visibleStories === 3 ? 16 : 12)) / visibleStories}px))`,
                }}
              >
                {stories.map((story) => (
                  <article className="story-card" key={story.name}>
                    <div className="story-person">
                      <img
                        src={asset(story.image)}
                        alt={`Illustrated portrait representing ${story.name}`}
                      />
                      <span>
                        <span className="story-label">{story.place}</span>
                        <b>{story.name}</b>
                      </span>
                      <span className="story-star">
                        <Icon name="star" size={18} />
                      </span>
                    </div>
                    <p>“{story.text}”</p>
                    <span className="story-quote-mark" aria-hidden="true">
                      ”
                    </span>
                  </article>
                ))}
              </div>
            </div>
            <div className="stories-controls">
              <div
                className="stories-dots"
                aria-label="Customer feedback slides"
              >
                {Array.from(
                  { length: stories.length - visibleStories + 1 },
                  (_, index) => (
                    <button
                      key={index}
                      className={storyIndex === index ? "is-active" : ""}
                      onClick={() => setStoryIndex(index)}
                      aria-label={`Show feedback slide ${index + 1}`}
                      aria-pressed={storyIndex === index}
                    />
                  ),
                )}
              </div>
              <div className="amenity-arrows">
                <button
                  onClick={() =>
                    setStoryIndex(
                      (storyIndex - 1 + stories.length - visibleStories + 1) %
                        (stories.length - visibleStories + 1),
                    )
                  }
                  aria-label="Previous feedback"
                >
                  <Icon name="arrow" size={17} className="arrow-reverse" />
                </button>
                <button
                  onClick={() =>
                    setStoryIndex(
                      (storyIndex + 1) % (stories.length - visibleStories + 1),
                    )
                  }
                  aria-label="Next feedback"
                >
                  <Icon name="arrow" size={17} />
                </button>
              </div>
            </div>
          </div>
          <p className="note-line">
            Review copy and names are sample content for the website preview.
            Replace with approved customer reviews before publishing.
          </p>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow eyebrow-light">A good place to begin</span>
            <h2>
              Let’s talk about <em>your future home.</em>
            </h2>
            <p>
              Share a few details and our team can help you learn more about
              Harika Paradise, plot sizes and the next steps.
            </p>
            <div className="contact-assurance">
              <span>
                <Icon name="check" size={18} /> No-obligation enquiry
              </span>
              <span>
                <Icon name="check" size={18} /> Plot options explained clearly
              </span>
            </div>
          </div>
          <div className="contact-form contact-offer-card">
            <div className="contact-form-title">
              <span>Harika Paradise</span>
              <h3>Want to know about our offers?</h3>
            </div>
            <p>
              Register your interest and our team will help you with plot
              availability, pricing and a site visit.
            </p>
            <button className="button button-primary" onClick={openOffer}>
              Register for best offers <Icon name="arrow" size={18} />
            </button>
            <small>
              No-obligation enquiry. Your details are used only to respond to
              you.
            </small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="footer-brand" href="#home">
              <img src={asset("logo.png")} alt="Harika Paradise" />
            </a>
            <p>
              An address of enduring prestige.
              <br />
              Thoughtfully planned living on Satrikh Road, Lucknow.
            </p>
          </div>
          <div className="footer-nav-social">
            <div className="footer-quick-links">
              <h3>Quick links</h3>
              <nav aria-label="Footer quick links">
                {navLinks.map(([label, id]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="footer-contact-block">
              <h3>Corporate Office</h3>
              <address className="footer-contact-item">
                <Icon name="pin" size={17} />
                D2/540, Vikalp Khand Gomti Nagar, Nearby Kathauta Jheel,
                Lucknow. Pin 226010
              </address>
              <a className="footer-contact-item" href="tel:05224205350">
                <Icon name="phone" size={16} />
                <span>0522 4205350</span>
              </a>
              <a className="footer-contact-item" href="mailto:adishak0234@gmail.com">
                <Icon name="mail" size={17} />
                <span>adishak0234@gmail.com</span>
              </a>
              <a
                className="footer-crm-link"
                href="https://adishakti.auctechitsolutions.in/"
                target="_blank"
                rel="noreferrer"
              >
                Go To Real Estate CRM
              </a>
            </div>
            <div className="footer-social-block">
              <h3>Follow us</h3>
              <div className="footer-socials" aria-label="Harika Paradise on social media">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name}>
                    <Icon name={social.icon} size={19} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a className="footer-top" href="#home">
            Back to top ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Harika Paradise. All rights reserved.
          </span>
          <span>
            Designed by: <a href="https://auctechitsolutions.in/" target="_blank" rel="noreferrer">Auctech</a>
          </span>
          <a
            href={asset("Brochure_Aadi Shakti_25-10-2026.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            Project brochure ↗
          </a>
        </div>
      </footer>
      <a
        className="floating-call"
        href="tel:05224205350"
        aria-label="Call Harika Paradise"
      >
        <Icon name="phone" size={22} />
      </a>
      <div className="mobile-bottom-cta">
        <span>
          Harika Paradise<small>Satrikh Road, Lucknow</small>
        </span>
        <button onClick={openOffer}>
          Enquire <Icon name="arrow" size={16} />
        </button>
      </div>
      {galleryOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setGalleryOpen(false);
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => setGalleryOpen(false)}
            aria-label="Close image viewer"
          >
            <Icon name="close" size={24} />
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            onClick={() =>
              setActiveImage(
                (index) => (index - 1 + gallery.length) % gallery.length,
              )
            }
            aria-label="Previous image"
          >
            <Icon name="arrow" size={24} className="arrow-reverse" />
          </button>
          <figure>
            <img
              src={asset(gallery[activeImage][0])}
              alt={gallery[activeImage][1]}
            />
            <figcaption>
              {gallery[activeImage][1]}{" "}
              <span>
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
          <button
            className="lightbox-arrow lightbox-next"
            onClick={() =>
              setActiveImage((index) => (index + 1) % gallery.length)
            }
            aria-label="Next image"
          >
            <Icon name="arrow" size={24} />
          </button>
        </div>
      )}
      {offerOpen && (
        <div
          className="offer-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeOffer();
          }}
        >
          <section
            className="offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
          >
            <button
              className="offer-close"
              onClick={closeOffer}
              aria-label="Close offer form"
            >
              <Icon name="close" size={21} />
            </button>
            <div className="offer-brand">
              <img src={asset("logo.png")} alt="Harika Paradise" />
            </div>
            <div className="offer-promise">
              <span className="eyebrow eyebrow-light">
                A better way to begin
              </span>
              <h2>We promise</h2>
              <ul>
                <li>
                  <Icon name="check" size={17} /> Instant call back
                </li>
                <li>
                  <Icon name="check" size={17} /> Free site visit
                </li>
                <li>
                  <Icon name="check" size={17} /> Best available offer
                </li>
              </ul>
              <span className="offer-decoration" aria-hidden="true">
                H
              </span>
            </div>
            <form
              className="offer-form"
              onSubmit={async (event) => {
                if (await handleSubmit(event)) closeOffer();
              }}
            >
              <span className="eyebrow">Harika Paradise · Satrikh Road</span>
              <h2 id="offer-title">
                Register here and
                <br />
                <em>avail the best offers!</em>
              </h2>
              <p>Leave your details and our team will call you shortly.</p>
              <label>
                Your name
                <input
                  required
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </label>
              <label>
                Mobile number
                <div className="offer-phone">
                  <select
                    name="countryCode"
                    aria-label="Country calling code"
                    defaultValue="+91"
                  >
                    {callingCodes.map(([code, country]) => (
                      <option key={code} value={code}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    autoComplete="tel-national"
                    pattern="[0-9 ()-]{7,15}"
                  />
                </div>
              </label>
              <input
                type="hidden"
                name="message"
                value="Offer registration: callback and free site visit request"
                readOnly
              />
              <button
                className="button button-primary offer-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : "Request a call back"}{" "}
                {!isSubmitting && <Icon name="arrow" size={18} />}
              </button>
              {formMessage && (
                <p className="form-success" role="status">
                  {formMessage}
                </p>
              )}
              <small>
                By submitting, you agree to be contacted about Harika Paradise.
              </small>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
