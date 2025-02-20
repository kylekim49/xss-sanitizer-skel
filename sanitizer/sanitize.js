export class Sanitizer {
  static sanitize(input) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<body>${input}</body>`, "text/html");
    const body = doc.body;

    // Create a Set of allowed tags (in lowercase for consistency)
    const allowedTags = new Set(["a","abbr","acronym","address","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","circle","cite","clippath","code","col","colgroup","content","data","datalist","dd","decorator","defs","del","desc","details","dfn","dialog","dir","div","dl","dt","element","ellipse","em","feblend","fecolormatrix","fecomponenttransfer","fecomposite","feconvolvematrix","fediffuselighting","fedisplacementmap","fedistantlight","fedropshadow","feflood","fefunca","fefuncb","fefuncg","fefuncr","fegaussianblur","feimage","femerge","femergenode","femorphology","feoffset","fepointlight","fespecularlighting","fespotlight","fetile","feturbulence","fieldset","figcaption","figure","filter","font","footer","form","g","glyph","glyphref","h1","h2","h3","h4","h5","h6","head","header","hgroup","hkern","hr","html","i","image","","input","ins","kbd","label","legend","li","line","lineargradient","main","map","mark","marker","marquee","mask","math","menclose","menu","menuitem","merror","metadata","meter","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mpath","mphantom","mprescripts","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msubsup","msup","mtable","mtd","mtext","mtr","munder","munderover","nav","nobr","ol","optgroup","option","output","p","path","pattern","picture","polygon","polyline","pre","progress","q","radialgradient","rect","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","stop","strike","strong","style","sub","summary","sup","svg","switch","symbol","table","tbody","td","template","text","textarea","textpath","tfoot","th","thead","time","title","tr","track","tref","tspan","tt","u","ul","var","video","view","vkern","wbr"]); //why is img tag here ok?
    const allowedAttributes = new Set(["accent","accent-height","accentunder","accept","accumulate","action","additive","align","alignment-baseline","alt","amplitude","ascent","attributename","attributetype","autocapitalize","autocomplete","autopictureinpicture","autoplay","azimuth","background","basefrequency","baseline-shift","begin","bevelled","bgcolor","bias","border","by","capture","cellpadding","cellspacing","checked","cite","class","clear","clip","clip-path","clip-rule","clippathunits","close","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cols","colspan","columnlines","columnsalign","columnspan","controls","controlslist","coords","crossorigin","cx","cy","d","datetime","decoding","default","denomalign","depth","diffuseconstant","dir","direction","disabled","disablepictureinpicture","disableremoteplayback","display","displaystyle","divisor","download","draggable","dur","dx","dy","edgemode","elevation","encoding","enctype","end","enterkeyhint","exponent","face","fence","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","for","frame","fx","fy","g1","g2","glyph-name","glyphref","gradienttransform","gradientunits","headers","height","hidden","high","href","hreflang","id","image-rendering","in","in2","inputmode","integrity","intercept","ismap","k","k1","k2","k3","k4","kernelmatrix","kernelunitlength","kerning","keypoints","keysplines","keytimes","kind","label","lang","largeop","length","lengthadjust","letter-spacing","lighting-color","linethickness","list","loading","local","loop","low","lquote","lspace","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","mask","maskcontentunits","maskunits","mathbackground","mathcolor","mathsize","mathvariant","max","maxlength","maxsize","media","method","min","minlength","minsize","mode","movablelimits","multiple","muted","name","nonce","noshade","notation","novalidate","nowrap","numalign","numoctaves","offset","opacity","open","operator","optimum","order","orient","orientation","origin","overflow","paint-order","path","pathlength","pattern","patterncontentunits","patterntransform","patternunits","placeholder","playsinline","points","popover","popovertarget","popovertargetaction","poster","preload","preservealpha","preserveaspectratio","primitiveunits","pubdate","r","radiogroup","radius","readonly","refx","refy","rel","repeatcount","repeatdur","required","restart","result","rev","reversed","role","rotate","rowalign","rowlines","rows","rowspacing","rowspan","rquote","rspace","rx","ry","scale","scope","scriptlevel","scriptminsize","scriptsizemultiplier","seed","selected","selection","separator","separators","shape","shape-rendering","size","sizes","slope","slot","span","specularconstant","specularexponent","spellcheck","spreadmethod","src","srclang","srcset","start","startoffset","stddeviation","step","stitchtiles","stop-color","stop-opacity","stretchy","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","style","subscriptshift","summary","supscriptshift","surfacescale","symmetric","systemlanguage","tabindex","tablevalues","targetx","targety","text-anchor","text-decoration","text-rendering","textlength","title","transform","transform-origin","translate","type","u1","u2","unicode","usemap","valign","value","values","version","vert-adv-y","vert-origin-x","vert-origin-y","viewbox","visibility","voffset","width","word-spacing","wrap","writing-mode","x","x1","x2","xchannelselector","xlink:href","xlink:title","xml:id","xml:space","xmlns","xmlns:xlink","y","y1","y2","ychannelselector","z","zoomandpan"]);

    // Use a stack to traverse the DOM tree. We always keep the root <body> element.
    const stack = [body];

    while (stack.length > 0) {
      const element = stack.pop();

      // Loop over a static copy of children (since the live collection may change when removing nodes)
      for (const child of Array.from(element.children)) {
        // If the child's tag is not in our whitelist, remove it.
        if (allowedTags.has(child.tagName.toLowerCase())) {
          for (const attr of Array.from(child.attributes))
          {
            if (!allowedAttributes.has(attr.name.toLowerCase())) {
              element.removeAttribute(attr.name);
            }
          }
          stack.push(child);
        }
        else{
          child.remove();
        }
      }
    }

    return body.innerHTML;
  }
}

