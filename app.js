// ── Quote Data ──────────────────────────────────────────────
const QUOTES = [
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "Wisdom"
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Motivation"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Motivation"
  },
  {
    text: "To be is to do.",
    author: "Immanuel Kant",
    category: "Philosophy"
  },
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: "Philosophy"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "Philosophy"
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    category: "Humor"
  },
  {
    text: "We accept the love we think we deserve.",
    author: "Stephen Chbosky",
    category: "Love"
  },
  {
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    category: "Life"
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "Life"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Wisdom"
  },
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    category: "Wisdom"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "Life"
  },
  {
    text: "If you tell the truth, you don't have to remember anything.",
    author: "Mark Twain",
    category: "Wisdom"
  },
  {
    text: "I am so clever that sometimes I don't understand a single word of what I am saying.",
    author: "Oscar Wilde",
    category: "Humor"
  },
  {
    text: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
    category: "Love"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Motivation"
  },
  {
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    category: "Wisdom"
  },
  {
    text: "Do unto others as you would have them do unto you.",
    author: "Jesus of Nazareth",
    category: "Wisdom"
  },
  {
    text: "The world is a book, and those who do not travel read only one page.",
    author: "Saint Augustine",
    category: "Life"
  },
  {
    text: "I think, therefore I am.",
    author: "René Descartes",
    category: "Philosophy"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Motivation"
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
    category: "Life"
  },
  {
    text: "Whatever you are, be a good one.",
    author: "Abraham Lincoln",
    category: "Motivation"
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "Motivation"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Life"
  },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
    category: "Motivation"
  },
  {
    text: "God is dead. God remains dead. And we have killed him.",
    author: "Friedrich Nietzsche",
    category: "Philosophy"
  },
  {
    text: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    author: "J.K. Rowling",
    category: "Wisdom"
  }
];

// ── State ──────────────────────────────────────────────────
let currentFilter = { search: '', category: 'all' };

// ── DOM Refs ───────────────────────────────────────────────
const grid        = document.getElementById('quotes-grid');
const noResults   = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const catFilter   = document.getElementById('category-filter');
const quoteCount  = document.getElementById('quote-count');
const authorCount = document.getElementById('author-count');
const overlay     = document.getElementById('modal-overlay');
const modalClose  = document.getElementById('modal-close');
const modalText   = document.getElementById('modal-text');
const modalAuthor = document.getElementById('modal-author');
const modalCat    = document.getElementById('modal-category');

// ── Stats ──────────────────────────────────────────────────
function updateStats() {
  const authors = new Set(QUOTES.map(q => q.author));
  quoteCount.textContent  = QUOTES.length;
  authorCount.textContent = authors.size;
}

// ── Filter ─────────────────────────────────────────────────
function getFiltered() {
  const q   = currentFilter.search.toLowerCase();
  const cat = currentFilter.category;
  return QUOTES.filter(quote => {
    const matchCat    = cat === 'all' || quote.category === cat;
    const matchSearch = !q ||
      quote.text.toLowerCase().includes(q) ||
      quote.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

// ── Render ─────────────────────────────────────────────────
function render() {
  const filtered = getFiltered();
  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  filtered.forEach((quote, i) => {
    const card = document.createElement('article');
    card.className = 'quote-card';
    card.style.animationDelay = `${Math.min(i * 40, 400)}ms`;

    card.innerHTML = `
      <span class="card-number">${String(i + 1).padStart(2, '0')}</span>
      <span class="card-quote-mark">❝</span>
      <p class="card-text">${escapeHtml(quote.text)}</p>
      <div class="card-footer">
        <span class="card-author">${escapeHtml(quote.author)}</span>
        <span class="card-category">${escapeHtml(quote.category)}</span>
      </div>
    `;

    card.addEventListener('click', () => openModal(quote));
    grid.appendChild(card);
  });
}

// ── Modal ──────────────────────────────────────────────────
function openModal(quote) {
  modalText.textContent   = quote.text;
  modalAuthor.textContent = quote.author;
  modalCat.textContent    = quote.category;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Search & Filter Events ─────────────────────────────────
let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentFilter.search = searchInput.value.trim();
    render();
  }, 200);
});

catFilter.addEventListener('change', () => {
  currentFilter.category = catFilter.value;
  render();
});

// ── Helpers ────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Init ───────────────────────────────────────────────────
updateStats();
render();