(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",p="date",d="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},_=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},m={s:_,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:p,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var $=function(t){return t instanceof w},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},D=m;D.l=b,D.i=$,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var _=v.prototype;return _.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},_.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},_.$utils=function(){return D},_.isValid=function(){return!(this.$d.toString()===d)},_.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},_.isAfter=function(t,e){return M(t)<this.startOf(e)},_.isBefore=function(t,e){return this.endOf(e)<M(t)},_.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(t,e){var n=this,c=!!D.u(e)||e,d=D.p(t),f=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case u:return c?f(1,0):f(31,11);case l:return c?f(1,_):f(0,_+1);case a:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return f(c?m-$:m+(6-$),_);case o:case p:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(t){return this.startOf(t,!1)},_.$set=function(t,e){var a,c=D.p(t),d="set"+(this.$u?"UTC":""),f=(a={},a[o]=d+"Date",a[p]=d+"Date",a[l]=d+"Month",a[u]=d+"FullYear",a[r]=d+"Hours",a[s]=d+"Minutes",a[i]=d+"Seconds",a[n]=d+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(p,1);v.$d[f](h),v.init(),this.$d=v.set(p,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},_.set=function(t,e){return this.clone().$set(t,e)},_.get=function(t){return this[D.p(t)]()},_.add=function(n,c){var p,d=this;n=Number(n);var f=D.p(c),h=function(t){var e=M(d);return D.w(e.date(e.date()+Math.round(t*n)),d)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return h(1);if(f===a)return h(7);var v=(p={},p[s]=t,p[r]=e,p[i]=1e3,p)[f]||1,_=this.$d.getTime()+n*v;return D.w(_,this)},_.subtract=function(t,e){return this.add(-1*t,e)},_.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},p=function(t){return D.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:p(1),hh:p(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:D.s(o,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,p,d){var f,h=D.p(p),v=M(n),_=(v.utcOffset()-this.utcOffset())*t,m=this-v,y=D.m(this,v);return y=(f={},f[u]=y/12,f[l]=y,f[c]=y/3,f[a]=(m-_)/6048e5,f[o]=(m-_)/864e5,f[r]=m/e,f[s]=m/t,f[i]=m/1e3,f)[h]||m,d?y:D.a(y)},_.daysInMonth=function(){return this.endOf(l).$D},_.$locale=function(){return g[this.$L]},_.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},_.clone=function(){return D.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},v}(),O=w.prototype;return M.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",p]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=$,M.unix=function(t){return M(1e3*t)},M.en=g[y],M.Ls=g,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"beforeend";e.insertAdjacentElement(n,t.getElement())}const i=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],s=["Здесь много интересных и красивых мест, разных памятников.","В городе построено много красивых, современных зданий, которые своим видом нисколько не портят сохранившуюся архитектуру.","В разных районах города есть лыжные базы.","Огромное количество достопримечательностей в центральной части города. На окраине есть аутентичные места для тихого отдыха.","Этот город славится парками развлечения и игорными домами.","Идеальное место для тихого отдыха."],r=["Rubcovsk","Novosibirsk","Barnaul","Moscow","London","Rome","Saint-Petersburg"],o="H:mm",a="YYYY-MM-DDTHH:mm",l="DD/MM/YY HH:mm",c={basePrice:0,dateFrom:null,dateTo:null,destination:null,isFavorite:!1,offers:[],type:"flight"};var u=n(484),p=n.n(u);const d=(t,e)=>t?p()(t).format(e):"",f=t=>t[Math.floor(Math.random()*t.length)],h=(t,e)=>{const n=Math.ceil(Math.min(t,e)),i=Math.floor(Math.max(t,e)),s=Math.random()*(i-n+1)+n;return Math.floor(s)},v=t=>{let{next:e}=t,n=p()().subtract(h(0,7),"day").toDate();const i=h(0,59),s=h(0,23),r=h(0,7);return e&&(n=p()(n).add(i,"minute").add(s,"hour").add(r,"day")),n};class _{constructor(t){let{point:e,pointDestination:n,pointOffer:i}=t;this.point=e,this.pointDestination=n,this.pointOffer=i}getTemplate(){return(t=>{let{point:e,pointDestination:n,pointOffer:i}=t;const{dateFrom:s,dateTo:r,type:l,basePrice:c,isFavorite:u}=e,p=((t,e)=>{let n="";const i=t.diff(e,"m"),s=Math.floor(i/1440),r=i-1440*s,o=Math.floor(r/60),a=r-60*o;return i<0?"wrong date":(0!==s&&(n=`${s}d `),0!==o&&(n+=`${o}h `),0!==a&&(n+=`${a}m`),n)})(r,s),f=u?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn";return`<li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime=${d(s,a)}>${d(s,"MMM D")}</time>\n          <div class="event__type">\n            <img \n              class="event__type-icon" \n              width="42" height="42" \n              src="img/icons/${l}.png" \n              alt="Event type icon">\n          </div>\n          <h3 class="event__title">${l} ${n.name}</h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime=${d(s,a)}>${d(s,o)}</time>\n              &mdash;\n              <time class="event__end-time" datetime=${d(r,a)}>${d(r,o)}</time>\n            </p>\n            <p class="event__duration">${p}</p>\n          </div>\n          <p class="event__price">\n            &euro;&nbsp;<span class="event__price-value">${c}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            <li class="event__offer">\n          ${h=i,`<ul class="event__selected-offers">${h.offers.map((t=>`<li class="event__offer">\n            <span class="event__offer-title">${t.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${t.price}</span>\n      </li>`)).join("")}</ul>`}\n                     </ul>\n          <button class="${f}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </div>\n      </li>`;var h})({point:this.point,pointDestination:this.pointDestination,pointOffer:this.pointOffer})}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{constructor(t){let{point:e=c,pointDestination:n,pointOffer:i}=t;this.point=e,this.pointDestination=n,this.pointOffer=i}getTemplate(){return(t=>{let{point:e=c,pointDestination:n,pointOffer:i}=t;const{dateFrom:s,dateTo:r,type:o,basePrice:a}=e,u=i.find((t=>t.type===o)).offers,p=n.find((t=>t.id===e.destination));return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n        ${((t,e)=>{const n=0===t.length?"":t.map((t=>{return`<div class="event__type-item">\n      <input\n        id="event-type-${t.type}-1" \n        class="event__type-input  visually-hidden" \n        type="radio" \n        name="event-type" \n        value="${t.type}"\n        ${t.type===e?"checked":""}\n      >\n      <label class="event__type-label  event__type-label--${t.type}" for="event-type-${t.type}-1">${n=t.type,n.charAt(0).toUpperCase()+n.slice(1)}</label>\n     </div>`;var n})).join("");return`<div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n              ${n}\n        </div>\n     </div>`})(i,o)}    \n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${o}\n            </label>\n            <input\n              class="event__input event__input--destination" \n              id="event-destination-1" \n              type="text" \n              name="event-destination" \n              value="${p.name}" \n              list="destination-list-1"\n            >\n            <datalist id="destination-list-1">\n              <option value="Paris"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input\n              class="event__input  event__input--time"\n              id="event-start-time-1" \n              type="text" \n              name="event-start-time" \n              value="${d(s,l)}"\n            >\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input\n              class="event__input  event__input--time"\n              id="event-end-time-1" \n              type="text"\n              name="event-end-time"\n              value="${d(r,l)}"\n            >\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input \n              class="event__input  event__input--price" \n              id="event-price-1" \n              type="text" \n              name="event-price" \n              value="${a}"\n            >\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n        </header>\n        <section class="event__details">\n          <section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${h=u,h.map((t=>{const e=h.includes(t.id)?"":"checked";return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-mockid-${t.id}" type="checkbox" name="event-offer-mockid-${t.id}" ${e}>\n        <label class="event__offer-label" for="event-offer-mockid-${t.id}">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n       </div>`})).join("")}\n          </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${p.description}</p>\n\n            <div class="event__photos-container">\n              ${f=p.pictures,`<div class="event__photos-tape">${f.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`)).join("")}</div>`}\n            </div>     \n          </section>\n        </section>\n      </form>\n    </li>`;var f,h})({point:this.point,pointDestination:this.pointDestination,pointOffer:this.pointOffer})}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input \n        id="sort-day" \n        class="trip-sort__input  \n        visually-hidden" \n        type="radio" \n        name="trip-sort" \n        value="sort-day"\n        >\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input \n          id="sort-event" \n          class="trip-sort__input  visually-hidden" \n          type="radio"\n          name="trip-sort" \n          value="sort-event" \n          disabled\n        >\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input \n          id="sort-time" \n          class="trip-sort__input  visually-hidden" \n          type="radio" \n          name="trip-sort" \n          value="sort-time"\n        >\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input \n          id="sort-price" \n          class="trip-sort__input  visually-hidden" \n          type="radio" \n          name="trip-sort" \n          value="sort-price" \n          checked\n        >\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input \n          id="sort-offer" \n          class="trip-sort__input  visually-hidden" \n          type="radio" \n          name="trip-sort" \n          value="sort-offer" \n          disabled\n        >\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=document.querySelector(".trip-events"),b=document.querySelector(".trip-main"),M=document.querySelector(".trip-controls"),D=new class{destinations=[];offers=[];points=[];constructor(){this.destinations=this.generateDestination(),this.offers=this.generateOffers(),this.points=this.generatePoints()}getDestinations(){return this.destinations}getOffers(){return this.offers}getPoints(){return this.points}generateDestination(){return Array.from({length:5},(()=>(()=>{const t=f(r),e=f(s);return{id:crypto.randomUUID(),name:t,description:e,pictures:[{src:`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,description:`${t} description`}]}})()))}generateOffers(){return i.map((t=>({type:t,offers:Array.from({length:h(0,5)},(()=>(t=>({id:crypto.randomUUID(),title:`Offer ${t}`,price:h(1,100)}))(t)))})))}generatePoints(){return Array.from({length:5},(()=>{const t=f(i),e=f(this.destinations),n=h(0,1),s=this.offers.find((e=>e.type===t)),r=n?s.offers.slice(0,h(0,5)).map((t=>t.id)):[];return((t,e,n)=>({id:crypto.randomUUID(),basePrice:h(1,1e4),dateFrom:v({next:!1}),dateTo:v({next:!0}),destination:e,isFavorite:!!h(0,1),offers:n,type:t}))(t,e.id,r)}))}},w=new class{constructor(t){this.service=t,this.points=this.service.getPoints()}get(){return this.points}}(D),O=new class{constructor(t){this.service=t,this.offers=this.service.getOffers()}get(){return this.offers}getByType(t){return this.offers.find((e=>e.type===t))}}(D),S=new class{constructor(t){this.service=t,this.destinations=this.service.getDestinations()}get(){return this.destinations}getById(t){return this.destinations.find((e=>e.id===t))}}(D),T=new class{tripComponent=new m;sortComponent=new g;constructor(t){let{tripContainer:e,pointsModel:n,offersModel:i,destinationsModel:s}=t;this.tripContainer=e,this.pointsModel=n,this.offersModel=i,this.destinationsModel=s,this.points=[...this.pointsModel.get()]}init(){e(this.sortComponent,this.tripContainer),e(this.tripComponent,this.tripContainer),e(new y({point:this.points[0],pointDestination:this.destinationsModel.get(),pointOffer:this.offersModel.get()}),this.tripComponent.getElement()),this.points.forEach((t=>{e(new _({point:t,pointDestination:this.destinationsModel.getById(t.destination),pointOffer:this.offersModel.getByType(t.type)}),this.tripComponent.getElement())}))}}({tripContainer:$,destinationsModel:S,pointsModel:w,offersModel:O});e(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n      </div>\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},b,"afterbegin"),e(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n        <div class="trip-filters__filter">\n          <input \n            id="filter-everything" \n            class="trip-filters__filter-input  visually-hidden" \n            type="radio" \n            name="trip-filter" \n            value="everything"\n          >\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input \n            id="filter-future" \n            class="trip-filters__filter-input  visually-hidden" \n            type="radio" \n            name="trip-filter" \n            value="future"\n          >\n          <label class="trip-filters__filter-label" for="filter-future">Future</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-present"\n            class="trip-filters__filter-input \n            visually-hidden"\n            type="radio" name="trip-filter" \n            value="present"\n          >\n          <label class="trip-filters__filter-label" for="filter-present">Present</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input \n           id="filter-past" \n           class="trip-filters__filter-input  \n           visually-hidden" type="radio" \n           name="trip-filter" \n           value="past" checked\n          >\n          <label class="trip-filters__filter-label" for="filter-past">Past</label>\n        </div>\n\n        <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},M),e(new class{getTemplate(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},b),T.init()})()})();
//# sourceMappingURL=bundle.8eba8fbd1604f4c71693.js.map