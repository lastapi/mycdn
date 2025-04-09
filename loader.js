["mydomain.js?v=1.2", "in-v1.2.js", "tracker.js"].forEach(f => loadAsyncScript(`//static.asgc.my.id/${f}`));


// Ads script configuration
const Ads = `<script type="text/javascript">
  atOptions = {
    'key': '93f80618e8dcdfbdf2ddc087273405a5',
    'format': 'iframe',
    'height': 50,
    'width': 320,
    'params': {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/93f80618e8dcdfbdf2ddc087273405a5/invoke.js"></script>`;

// Ads configuration list
const MyadFinal = [
  'ad-header', 'ad-sticky', 'ad-card-home', 'ad-after-question',
  'ad-social-bar', 'ad-popunder', 'ad-navigation', 'ad-dev'
].map(name => ({
  name: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  class: name,
  content: Ads,
  showTitle: false,
  status: true
}));

// Utilities
const getRandomItems = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);
const generateRandomSubdomain = () => [...Array(Math.floor(Math.random() * 7) + 4)].map((_, i) => i > 0 && i % 4 === 0 ? '-' + randomChar() : randomChar()).join('');
const randomChar = () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)];

// Setup
const MyApiDomain = ["mysolver.in", "asgc.my.id", "question.my.id"];
const basePointHost = `//api.${getRandomItems(MyApiDomain, 1)}`;
const loadAsyncScript = url => {
  const s = document.createElement("script");
  s.src = url; s.async = true; s.defer = true;
  s.onload = () => console.log(`Loaded: ${url}`);
  s.onerror = () => console.error(`Failed: ${url}`);
  document.head.appendChild(s);
};

// Domains
const domains = [
  { domain: "brainly.lat", lang: "es" },
  { domain: "nosdevoirs.fr", lang: "fr" },
  { domain: "brainly.in", lang: "in" },
  { domain: "brainly.co.id", lang: "id" },
  { domain: "brainly.ph", lang: "ph" },
  { domain: "brainly.pl", lang: "pl" },
  { domain: "brainly.com.br", lang: "pt" },
  { domain: "brainly.ro", lang: "ro" },
  { domain: "eodev.com", lang: "tr" },
  { domain: "brainly.com", lang: "us" }
];
const randomItem = domains[Math.floor(Math.random() * domains.length)];
const baseURL = `//cdn.asgc.my.id/${randomItem.domain}/question/`;

// Fetch with timeout
const fetchWithTimeout = async (url, timeout = 500) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

// Retry wrapper
const fetchWithRetry = async (url, retries = 13, delay = 500) => {
  for (let i = 1; i <= retries; i++) {
    try {
      return await fetchWithTimeout(url);
    } catch (e) {
      console.warn(`[Attempt ${i}] ${url} failed: ${e.message}`);
      if (i < retries) await new Promise(r => setTimeout(r, delay));
    }
  }
  return null;
};

// Fetch data list
const fetchData = async (data) => {
  const results = [];
  for (const file of data.files) {
    const match = file.match(/(\d+)\.json$/);
    if (!match) continue;
    const url = `${baseURL}${match[1]}.json`;
    const json = await fetchWithRetry(url);
    if (json) results.push({ data: json });
    if (results.length === 10) break;
  }
  return results.map(w => {
    const q = w.data.questionById;
    return {
      t: q.content.slice(0, 100) + " ...",
      d: q.content.slice(0, 200) + " ...",
      c: q.created,
      k: 110,
      v: 110,
      n: `${randomItem.lang}-${q.databaseId}`
    };
  });
};

// Fetch file list then data
const fetchDataKK = async () => {
  const continuationToken = `${randomItem.domain}/question/${Math.floor(Math.random() * 70000)}.json`;
  const res = await fetch(`${basePointHost}/file-list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: `${randomItem.domain}/question`, limit: 10, continuationToken })
  });
  const json = await res.json();
  return await fetchData(json);
};

// Get individual question
const GetQuestion = async (ID, retry = 1) => {
  const [lang, dbid] = ID.split('-');
  const domain = domains.find(d => d.lang === lang)?.domain;
  const url = `//cdn.asgc.my.id/${domain}/question/${dbid}.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    if (retry < 13) return await GetQuestion(ID, retry + 1);
    return null;
  }
};

// Get answers
const GetAnswer = async (ID, JsonAnswer) => {
  const lang = ID.split('-')[0];
  const domain = domains.find(d => d.lang === lang)?.domain;
  const base = `//cdn.asgc.my.id/${domain}/answer/`;
  const answers = await Promise.all(JsonAnswer.nodes.map(async id => {
    try {
      const res = await fetch(`${base}${id}.json`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch { return null; }
  }));
  return answers.filter(Boolean);
};

// Get grade/subject
const GetGrade = async (ID, grade) => getCategory(ID, 'grade', grade);
const GetSubject = async (ID, subject) => getCategory(ID, 'subject', subject);
const getCategory = async (ID, type, value) => {
  const lang = ID.split('-')[0];
  const domain = domains.find(d => d.lang === lang)?.domain;
  try {
    const res = await fetch(`//cdn.asgc.my.id/${domain}/${type}/${value}.json`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { databaseId: 0, id: '0', name: 'Other' };
  }
};
