(()=>{
    let timeoutCount = 1;
    function randomHash(length) {
        return Math.random().toString(36).substring(2, 2 + length);
    };
    const convertStringHtmlToObject = (str) => {
        let doc = new DOMParser().parseFromString('<div id="magic-maskoding"></div>' + str, "text/html");
        let domBody = doc.body;
        let magicMaskoding = domBody.querySelector("#magic-maskoding");
        if (magicMaskoding) {
            magicMaskoding.remove();
        };
        return domBody.childNodes;
    };
    function createElement(obj_dom) {
        if (obj_dom.nodeType === Node.COMMENT_NODE) {
            return document.createComment(obj_dom.textContent);
        };
        if (obj_dom.nodeType === Node.TEXT_NODE) {
            return document.createTextNode(obj_dom.textContent);
        };
        let el = document.createElement(obj_dom.tagName);
        for (let attr of obj_dom.attributes) {
            el.setAttribute(attr.name, attr.value);
        };
        for (let child of obj_dom.childNodes) {
            el.append(createElement(child));
        };
        return el;
    };
    for(let obj of (window?.dataMagic || [])){
        if(obj.status === true){
            if(obj.class === "ad-social-bar" || obj.class === "ad-popunder"){
                const list_obj_dom = convertStringHtmlToObject(obj.content);
                for(let obj_dom of list_obj_dom){
                    const el = createElement(obj_dom);
                    document.querySelector("body").append(el);
                };
            }else{
                let el_title = null;
                let is_append_title = false;
                if(obj?.showTitle && obj?.name){
                    el_title = document.createElement("h4");
                    el_title.textContent = obj.name;
                    is_append_title = true;
                };
                const list_obj_dom = convertStringHtmlToObject(obj.content);
                for(let obj_dom of list_obj_dom){
                    const target = document.querySelectorAll("."+obj.class);
                    for(const targetElement of target){
                        targetElement.innerHTML = "";
                        targetElement.setAttribute("style","border : none;width: 100%;min-height: 120px;background: var(--light-gray);display: flex;align-items: center;justify-content: center;text-align: center;color: #666;");
                    };
                };
                for(let obj_dom of list_obj_dom){
                    setTimeout(()=>{
                        const target = document.querySelectorAll("."+obj.class);
                        for(const targetElement of target){
                            if(is_append_title){
                                targetElement.append(el_title);
                                is_append_title = false;
                            };
                            const el = createElement(obj_dom);
                            targetElement.append(el);
                        };
                    },timeoutCount);
                    timeoutCount += 500;
                };
            };
        }else{
            const target = document.querySelectorAll("."+obj.class);
            for(const targetElement of target){
                targetElement.remove();
            };
        };
    };
    

    const ellAnalytic = document.createElement("script");
    ellAnalytic.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=GTM-MDF6HPDR");
    ellAnalytic.setAttribute("async", "");
    ellAnalytic.onload = () => {
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-MDF6HPDR');
    };
    document.querySelector("head").append(ellAnalytic);
})();
