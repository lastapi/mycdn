const Ads = `<script type="text/javascript">
	atOptions = {
		'key' : '93f80618e8dcdfbdf2ddc087273405a5',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/93f80618e8dcdfbdf2ddc087273405a5/invoke.js"></script>`

const MyadFinal = [
  {
    name: 'Ads Header',
    content: Ads,
    showTitle: false,
    status: true,
    class: 'ad-header'
  },
  {
    name: 'Ads Sticky',
    content: Ads,
    showTitle: false,
    status: true,
    class: 'ad-sticky'
  },
  {
    name: 'Ads Card Home',
    content: Ads,
    showTitle: false,
    status: true,
    class: 'ad-card-home'
  },
  {
    name: 'Ad After Question',
    content: Ads,
    showTitle: false,
    status: true,
    class: 'ad-after-question'
  },
  {
    content: Ads,
    name: 'Ads Social Bar',
    status: true,
    class: 'ad-social-bar'
  },
  {
    content: Ads,
    name: 'ad-popunder',
    status: true,
    class: 'ad-popunder'
  },
  {
    name: 'Ad Navigation',
    content: Ads,

    showTitle: false,
    status: true,
    class: 'ad-navigation'
  },
  {
    class: 'ad-dev',
    name: 'Ads Dev',
    showTitle: false,
    content: Ads,
    status: true
  }
]


function getRandomItems(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Acak array
    return shuffled.slice(0, num); // Ambil sejumlah elemen yang diinginkan
}


function generateRandomSubdomain() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let length = Math.floor(Math.random() * 7) + 4; // Panjang antara 4 hingga 10
    let subdomain = '';

    for (let i = 0; i < length; i++) {
        if (i > 0 && i % 4 === 0) {
            subdomain += '-';
        }
        subdomain += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return subdomain;
}

var MyApiDomain = ["mysolver.in", "pernikahan-kurnialulu.love", "asgc.my.id", "sibangmoi.my.id","question.my.id"];
const basePointHost = `//api.${getRandomItems(MyApiDomain, 1)}`; 

function loadAsyncScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;

    script.onload = () => console.log(`Script ${url} loaded successfully`);
    script.onerror = () => console.error(`Failed to load script: ${url}`);

    document.head.appendChild(script);
}
loadAsyncScript("//static.asgc.my.id/mydomain.js?v=1.2");
loadAsyncScript("//static.asgc.my.id/in-v1.2.js");
loadAsyncScript("//static.asgc.my.id/tracker.js");

const domains = [
    { "domain": "brainly.lat", "lang": "es" },
    { "domain": "nosdevoirs.fr", "lang": "fr" },
    { "domain": "brainly.in", "lang": "in" },
    { "domain": "brainly.co.id", "lang": "id" },
    { "domain": "brainly.ph", "lang": "ph" },
    { "domain": "brainly.pl", "lang": "pl" },
    { "domain": "brainly.com.br", "lang": "pt" },
    { "domain": "brainly.ro", "lang": "ro" },
    { "domain": "eodev.com", "lang": "tr" },
    { "domain": "brainly.com", "lang": "us" }
  ];
  
  const randomItem = domains[Math.floor(Math.random() * domains.length)];

// console.log(randomItem)


function updateContent(lang,kata){

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "query": kata
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

// console.log(requestOptions)

fetch(`${basePointHost}/search/${lang}/3`, requestOptions)

    // console.log(lang,kata)

}


const baseURL = `//s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${domains.find(d => d.lang == randomItem.lang)?.domain}/question/`;

// Fungsi fetch dengan timeout
async function fetchWithTimeout(url, timeout = 500) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            cache: 'no-store'
        });
        clearTimeout(id);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

// Fungsi fetch dengan retry max 3x
async function fetchWithRetry(url, retries = 13, delay = 500) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fetchWithTimeout(url);
        } catch (err) {
            console.warn(`[Attempt ${attempt}] Gagal fetch ${url}: ${err.message}`);
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return null; // Tetap gagal setelah 3x
}

async function fetchData(data) {
    const results = [];

    for (const file of data.files) {
        const match = file.match(/(\d+)\.json$/);
        if (!match) continue;

        const id = match[1];
        const url = `${baseURL}${id}.json`;

        const jsonData = await fetchWithRetry(url, 13);
        if (!jsonData) continue;

        results.push({ data: jsonData });

        if (results.length === 10) break;
    }

    if (results.length === 10) {
        domains.forEach(d => {
            updateContent(d.lang, (results[0].data.questionById.content).split(" ")[0]);
            updateContent(d.lang, (results[0].data.questionById.content).split(" ")[1]);
            updateContent(d.lang, (results[0].data.questionById.content).split(" ")[2]);
        });

        return results.map(w => {
            const ii = w.data.questionById;
            return {
                "t": ii.content.slice(0, 100) + " ...",
                "d": ii.content.slice(0, 200) + " ...",
                "c": ii.created,
                "k": 110,
                "v": 110,
                "n": randomItem.lang + '-' + ii.databaseId
            };
        });
    } else {
        console.warn(`Hanya ${results.length} data yang berhasil diambil.`);
        return [];
    }
}

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const yyy = Math.floor(Math.random() * 70000)
const raw = JSON.stringify({
    "path": `${randomItem.domain}/question`,
    "limit": 10,
    "continuationToken": `${randomItem.domain}/question/${yyy.toString()}.json`
});

// console.log(yyy);
const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

async function fetchDataKK(data) {

   const iou = await fetch(`${basePointHost}/file-list`, requestOptions)
    .then((response) => response.text())
    .then(async (result) => await fetchData(JSON.parse(result)))
    .catch((error) => console.error(error));

    return iou;
}


async function GetQuestion(ID, retry = 1) {

    const Req = ID.split('-');
    const domain = domains.find(d => d.lang === Req[0])?.domain;
    if (!domain) return null;
  
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000);
    const url = `//s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${domain}/question/${Req[1]}.json`;
  
    try {

      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timeout);
 
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
  
    } catch (error) {
      clearTimeout(timeout);
      console.log(`[${ID}] Error (${error.name}): ${error.message}`);
  
      if (retry < 13) {
        return await GetQuestion(ID, retry + 1);
      } else {
        console.log(`❌ Gagal ambil ${ID} setelah 3x retry.`);
        return null;
      }
    }
  }
  

async function GetAnswer(ID,JsonAnswer){

    const Req = domains.filter(d => d.lang == ID.split('-')[0])[0].domain

    const baseURL = `//s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${Req}/answer/`;


    
      const promises = JsonAnswer.nodes.map(async (id) => {
        const url = `${baseURL}${id}.json`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Gagal ambil ID ${id}`);
            return await res.json();
        } catch (err) {
            console.error(`Error fetch ID ${id}:`, err.message);
            return null; // bisa dilewati atau ditandai gagal
        }
    });

    const results = await Promise.all(promises);
    const filtered = results.filter(item => item !== null); // buang yang gagal

    const processed = await Promise.all(filtered.map(async p => {
        const w = p;
        const author = w.author == null ? null : await GetAuthor(ID, w.author);
        return {
          attachments: w.attachments==undefined?[]:w.attachments,
          content: w.content,
          created: w.created,
          databaseId: w.databaseId,
          id: w.databaseId,
          points: w.thanksCount,
          rating: w.rating,
          ratesCount: w.ratesCount,
          author: author,
        };
      }));

       return processed
  }

  async function GetGrade(ID,grade){
    try {
      const Req = ID.split('-')
    //   const response = await fetch(`${basePointHost}/data/grade/${Req[0]}/${grade}`);
      const response = await fetch(`//s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${domains.filter(d => d.lang == Req[0])[0].domain}/grade/${grade}.json`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
      const jsonData = await response.json();
      return jsonData
  
   } catch (error) {
      return { "databaseId": 0, "id": "0", "name": "Other" }
  }
  
  }

  async function GetSubject(ID,subject){
    try {
      const Req = ID.split('-')
    //   const response = await fetch(`${basePointHost}/data/grade/${Req[0]}/${subject}`);
      const response = await fetch(`//s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${domains.filter(d => d.lang == Req[0])[0].domain}/subject/${subject}.json`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
      const jsonData = await response.json();
      return jsonData
  
   } catch (error) {
      console.log(`Error fetching:`, error.message);
  }
  
  }

  async function GetAuthor(ID,author){
    const Req = ID.split('-')
    //   const response = 
      fetch(`${basePointHost}/data/author/${Req[0]}/${author}`);
    try {

      const domain = domains.find(d => d.lang === Req[0])?.domain;
      //   const response = await fetch(`${basePointHost}/data/author/${Req[0]}/${author}`);  
      const response = await fetch(`https://s3-id-jkt-1.kilatstorage.id/cdn.asgc.my.id/${domain}/author/${author}.json`);
  
      
        
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
      const jsonData = await response.json();
      const authors= jsonData
      const yyyy = {
        "id": authors.databaseId,
        "avatar":authors.avatar==null?null:{
            "thumbnailUrl": authors.avatar.thumbnailUrl,
            "url": authors.avatar.thumbnailUrl,
            "id": authors.databaseId
        },
        "nick":authors.nick
    }
      return yyyy
  
   } catch (error) {
    return null;
  }
  
  }

async function GetCompleteAnswer(ID){

    try{
        const question = await GetQuestion(ID,1)
        const questions = question.questionById
    
        const authors = questions.author == null? null: await GetAuthor(ID,questions.author)
        const Answer = await GetAnswer(ID,questions.answers)
            // console.log(Answer)
    const answer = {
        "t": questions.content,
        "d": questions.content,
        "h": "8dd657b0ff17be000dc18e18a89e28a87c90f046da1a3bf45ad3df065e7d629e",
        "c": questions.created,
        "e": questions.created,
        "data": {
            "answers": {"nodes":Answer},
            "attachments": questions.attachments,
            "content": questions.content,
            "created": questions.created,
            "databaseId": questions.databaseId,
            "grade": await GetGrade(ID,questions.grade),
            "id": "cXVlc3Rpb246MTA3NTY3MjQ=",
            "subject": await GetSubject(ID,questions.subject),
            "next": {
                "databaseId": questions.databaseId + 1
            },
            "previous": {
                "databaseId": questions.databaseId - 1
            },
            "lastActivity": questions.created,
            "author": authors
        }
        
    }
    // console.log(answer)
    // console.log(answer)


return answer; 
    }
catch(e){
    console.log(e)
    return null
}



}
