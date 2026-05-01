import { useMemo, useState } from 'react'
import categorySprite from './assets/category-sprite.png'
import './App.css'

const PRICE_PER_CATEGORY = 3
const SPRITE_COLUMNS = 5
const SPRITE_ROWS = 6
type Page = 'home' | 'signin' | 'signup' | 'category'

const categories = [
  'Film & Animation',
  'Auto & Vehicles',
  'Music',
  'Pets & Animals',
  'Sports',
  'Travel & Events',
  'Gaming',
  'People & blogs',
  'Comedy',
  'Entertainment',
  'News & Politics',
  'How to & style',
  'Education',
  'Science & tech',
  'Fitness & Wellness',
  'Business & Entrepreneurship',
  'Personal Finance',
  'Parenthood',
  'Relationships',
  'Case studies',
  'Reaction Videos',
  'Motivational & Self-Improvement',
  'Horror & True Crime',
  'Art',
  'Video Podcasts',
  'Programming & Development',
  'Reviews',
  'ASMR',
  'Kids',
  'Others',
] as const

const formatPrice = (value: number) => `Rs.${value.toLocaleString('en-IN')}`

const getSpritePosition = (index: number) => {
  const column = index % SPRITE_COLUMNS
  const row = Math.floor(index / SPRITE_COLUMNS)
  const x = (column / (SPRITE_COLUMNS - 1)) * 100
  const y = (row / (SPRITE_ROWS - 1)) * 100

  return `${x}% ${y}%`
}

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [subscribedCategories, setSubscribedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activePage, setActivePage] = useState<Page>('home')
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return [...categories]
    }

    return categories.filter((category) =>
      category.toLowerCase().includes(query),
    )
  }, [searchTerm])

  const monthlyTotal = selectedCategories.length * PRICE_PER_CATEGORY
  const premiumCategories = filteredCategories.filter((category) =>
    subscribedCategories.includes(category),
  )
  const commonCategories = filteredCategories.filter(
    (category) => !subscribedCategories.includes(category),
  )

  const addCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category) ? current : [...current, category],
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    )
  }

  const removeSubscribedCategory = (category: string) => {
    setSubscribedCategories((current) =>
      current.filter((item) => item !== category),
    )
    setSelectedCategories((current) =>
      current.filter((item) => item !== category),
    )
  }

  const openCategory = (category: string) => {
    setActiveCategory(category)
    setActivePage('category')
  }

  const selectAll = () => {
    setSelectedCategories(
      categories.filter((category) => !subscribedCategories.includes(category)),
    )
  }

  const clearAll = () => {
    setSelectedCategories([])
  }

  const subscribeSelected = () => {
    setSubscribedCategories((current) => {
      const next = new Set(current)

      selectedCategories.forEach((category) => next.add(category))

      return categories.filter((category) => next.has(category))
    })
    setSelectedCategories([])
  }

  const renderCategoryCard = (category: string, premium: boolean) => {
    const categoryIndex = categories.indexOf(
      category as (typeof categories)[number],
    )
    const selected = selectedCategories.includes(category)

    return (
      <article
        key={category}
        className={`category-card ${selected || premium ? 'selected' : ''}`}
      >
        <button
          type="button"
          className="category-image"
          aria-label={`Open ${category} videos`}
          onClick={() => openCategory(category)}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10, 15, 25, 0.04), rgba(10, 15, 25, 0.62)), url(${categorySprite})`,
            backgroundPosition: `center, ${getSpritePosition(categoryIndex)}`,
          }}
        />
        <span className="category-body">
          <button
            type="button"
            className="category-title"
            onClick={() => openCategory(category)}
          >
            {category}
          </button>
          <span className="category-price">
            {premium ? 'Premium category' : 'Rs.3/month'}
          </span>
        </span>
        <button
          type="button"
          className="category-state"
          onClick={() =>
            premium ? removeSubscribedCategory(category) : toggleCategory(category)
          }
        >
          {premium ? 'Subscribed' : selected ? 'Added' : 'Add'}
        </button>
      </article>
    )
  }

  const renderCategoryPage = () => {
    const categoryIndex = categories.indexOf(
      activeCategory as (typeof categories)[number],
    )
    const isSubscribed = subscribedCategories.includes(activeCategory)
    const videos = [
      `Latest ${activeCategory} drops`,
      `${activeCategory} creator spotlight`,
      `Trending now in ${activeCategory}`,
      `${activeCategory} weekly picks`,
      `Top community uploads for ${activeCategory}`,
      `${activeCategory} deep dive`,
    ]

    return (
      <main className="xorost-page">
        <section className="category-page-shell">
          <button
            type="button"
            className="back-button"
            onClick={() => setActivePage('home')}
          >
            Back to categories
          </button>

          <div className="category-hero">
            <div
              className="category-hero-art"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7, 11, 22, 0.08), rgba(7, 11, 22, 0.72)), url(${categorySprite})`,
                backgroundPosition: `center, ${getSpritePosition(categoryIndex)}`,
              }}
            />
            <div className="category-hero-copy">
              <p className="eyebrow">Xorost videos</p>
              <h1>{activeCategory}</h1>
              <p>
                Watch curated videos from this category. Subscribe for
                Rs.3/category/month to include it in your Xorost plan.
              </p>
              <div className="category-hero-actions">
                <span className={isSubscribed ? 'access-pill paid' : 'access-pill'}>
                  {isSubscribed ? 'Subscribed - ad-free access' : 'Ad-supported preview'}
                </span>
                {!isSubscribed && (
                  <button type="button" onClick={() => addCategory(activeCategory)}>
                    Add for Rs.3/month
                  </button>
                )}
              </div>
            </div>
          </div>

          {!isSubscribed && (
            <aside className="ad-panel">
              <p className="eyebrow">Advertisement</p>
              <h2>Free viewers see sponsored breaks.</h2>
              <p>
                People who do not pay Rs.3/category/month can still preview
                videos with advertisements. Subscribing to this category removes
                the ad-supported experience for it.
              </p>
            </aside>
          )}

          <div className="video-grid">
            {videos.map((video, index) => (
              <article key={video} className="video-card">
                <div
                  className="video-thumb"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 11, 22, 0.05), rgba(7, 11, 22, 0.7)), url(${categorySprite})`,
                    backgroundPosition: `center, ${getSpritePosition(categoryIndex)}`,
                  }}
                >
                  {!isSubscribed && index === 1 && <span>Ad</span>}
                  <strong>{12 + index * 3}:0{index}</strong>
                </div>
                <div className="video-meta">
                  <h3>{video}</h3>
                  <p>
                    {isSubscribed
                      ? 'Included in your Xorost category plan.'
                      : 'Preview available with advertisements.'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    )
  }

  const renderAuthPage = () => {
    const isSignup = activePage === 'signup'

    return (
      <main className="xorost-page auth-page">
        <section className="auth-shell">
          <div className="auth-copy">
            <button
              type="button"
              className="back-button"
              onClick={() => setActivePage('home')}
            >
              Back to Xorost
            </button>
            <div className="brand-row">
              <span className="brand-mark">X</span>
              <span className="brand-name">Xorost</span>
            </div>
            <h1>{isSignup ? 'Create your Xorost account.' : 'Sign in to Xorost.'}</h1>
            <p>
              {isSignup
                ? 'Start with Rs.3/category/month and build a video plan around the categories you care about.'
                : 'Continue watching, manage your selected categories, and keep your subscription focused.'}
            </p>
          </div>

          <form className="auth-card">
            <p className="eyebrow">{isSignup ? 'Sign up' : 'Sign in'}</p>
            <h2>{isSignup ? 'Join Xorost' : 'Welcome back'}</h2>

            <label>
              <span>Email address</span>
              <input type="email" placeholder="you@example.com" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter password" />
            </label>

            {isSignup && (
              <label>
                <span>Confirm password</span>
                <input type="password" placeholder="Confirm password" />
              </label>
            )}

            <button type="button" className="auth-submit">
              {isSignup ? 'Create account' : 'Sign in'}
            </button>

            <p className="auth-switch">
              {isSignup ? 'Already have an account?' : 'New to Xorost?'}
              <button
                type="button"
                onClick={() => setActivePage(isSignup ? 'signin' : 'signup')}
              >
                {isSignup ? 'Sign in' : 'Create account'}
              </button>
            </p>
          </form>
        </section>
      </main>
    )
  }

  if (activePage === 'category') {
    return renderCategoryPage()
  }

  if (activePage !== 'home') {
    return renderAuthPage()
  }

  return (
    <main className="xorost-page">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="brand-row">
            <span className="brand-mark">X</span>
            <span className="brand-name">Xorost</span>
            <div className="auth-actions">
              <button type="button" onClick={() => setActivePage('signin')}>
                Sign in
              </button>
              <button type="button" onClick={() => setActivePage('signup')}>
                Sign up
              </button>
            </div>
          </div>
          <h1>Choose the video categories you want to watch.</h1>
          <p>
            Xorost is a video sharing platform where you pay only for the
            categories you select. Each category costs Rs.3/category/month.
          </p>
          <div className="hero-actions">
            <a href="#categories" className="primary-link">
              Browse categories
            </a>
            <span className="rate-pill">30 categories - Rs.3/category/month</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div
            className="sprite-preview"
            style={{ backgroundImage: `url(${categorySprite})` }}
          />
        </div>
      </section>

      <section className="content-shell" id="categories">
        <div className="catalog-panel">
          <div className="catalog-header">
            <div>
              <p className="eyebrow">Category marketplace</p>
              <h2>Build your monthly plan</h2>
              <p>
                Select one category or all 30. Pricing updates immediately as
                you choose.
              </p>
            </div>
            <div className="toolbar">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search categories"
              />
              <button type="button" onClick={selectAll}>
                Select all
              </button>
              <button type="button" onClick={clearAll}>
                Clear
              </button>
            </div>
          </div>

          {premiumCategories.length > 0 && (
            <section className="category-section premium-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Premium Categories</p>
                </div>
                <span>{premiumCategories.length} selected</span>
              </div>
              <div className="category-grid premium-grid">
                {premiumCategories.map((category) =>
                  renderCategoryCard(category, true),
                )}
              </div>
            </section>
          )}

          <section className="category-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Categories List</p>
              </div>
              <span>{commonCategories.length} available</span>
            </div>
            <div className="category-grid">
              {commonCategories.map((category) =>
                renderCategoryCard(category, false),
              )}
            </div>
            {commonCategories.length === 0 && (
              <div className="empty-category-state">
                {searchTerm
                  ? 'No available categories match your search.'
                  : 'All categories are currently in your premium list.'}
              </div>
            )}
          </section>
        </div>

        <aside className="summary-panel">
          <p className="eyebrow">Your plan</p>
          <h2>{formatPrice(monthlyTotal)}</h2>
          <p className="summary-rate">per month</p>

          <div className="summary-stats">
            <div>
              <span>Categories</span>
              <strong>{selectedCategories.length}/30</strong>
            </div>
            <div>
              <span>Rate</span>
              <strong>Rs.3 each</strong>
            </div>
          </div>

          <div className="selected-list">
            {selectedCategories.length > 0 ? (
              selectedCategories.map((category) => (
                <span key={category}>{category}</span>
              ))
            ) : (
              <p>Select categories to preview your Xorost subscription.</p>
            )}
          </div>

          <button
            type="button"
            className="subscribe-button"
            disabled={selectedCategories.length === 0}
            onClick={subscribeSelected}
          >
            Subscribe for {formatPrice(monthlyTotal)}/month
          </button>
        </aside>
      </section>
    </main>
  )
}

export default App
