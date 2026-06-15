// বাংলা গৌড়ীয় পঞ্জিকা — single-file logic
// Location: Kashiani, Bangladesh (fixed). UTC+6.
const LAT = 23.22, LON = 89.78, TZ = 6;

// ---------- Bengali numerals & names ----------
const BN_DIG = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
const bn = n => String(n).replace(/[0-9]/g, d => BN_DIG[+d]);

const TITHI_BN = ['প্রতিপদ','দ্বিতীয়া','তৃতীয়া','চতুর্থী','পঞ্চমী','ষষ্ঠী','সপ্তমী','অষ্টমী','নবমী','দশমী','একাদশী','দ্বাদশী','ত্রয়োদশী','চতুর্দশী','পূর্ণিমা',
  'প্রতিপদ','দ্বিতীয়া','তৃতীয়া','চতুর্থী','পঞ্চমী','ষষ্ঠী','সপ্তমী','অষ্টমী','নবমী','দশমী','একাদশী','দ্বাদশী','ত্রয়োদশী','চতুর্দশী','অমাবস্যা'];
const TITHI_EN = ['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Purnima',
  'Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Amavasya'];

const NAK_BN = ['অশ্বিনী','ভরণী','কৃত্তিকা','রোহিণী','মৃগশিরা','আর্দ্রা','পুনর্বসু','পুষ্যা','অশ্লেষা','মঘা','পূর্বফাল্গুনী','উত্তরফাল্গুনী','হস্তা','চিত্রা','স্বাতী','বিশাখা','অনুরাধা','জ্যেষ্ঠা','মূলা','পূর্বাষাঢ়া','উত্তরাষাঢ়া','শ্রবণা','ধনিষ্ঠা','শতভিষা','পূর্বভাদ্রপদ','উত্তরভাদ্রপদ','রেবতী'];
const NAK_EN = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];

const YOGA_BN = ['বিষ্কম্ভ','প্রীতি','আয়ুষ্মান','সৌভাগ্য','শোভন','অতিগণ্ড','সুকর্ম','ধৃতি','শূল','গণ্ড','বৃদ্ধি','ধ্রুব','ব্যাঘাত','হর্ষণ','বজ্র','সিদ্ধি','ব্যতীপাত','বরীয়ান','পরিঘ','শিব','সিদ্ধ','সাধ্য','শুভ','শুক্ল','ব্রহ্ম','ঐন্দ্র','বৈধৃতি'];
const YOGA_EN = ['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyana','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];

const KARANA_NAMES = ['বব','বালব','কৌলব','তৈতিল','গর','বণিজ','বিষ্টি','শকুনি','চতুষ্পদ','নাগ','কিংস্তুঘ্ন'];
const KARANA_EN = ['Bava','Balava','Kaulava','Taitila','Garaja','Vanija','Vishti','Shakuni','Chatushpada','Naga','Kimstughna'];

const VAARA_BN = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const VAARA_EN = ['Ravivara','Somavara','Mangalavara','Budhavara','Brihaspativara','Shukravara','Shanivara'];

// Bengali (Bangladesh) solar months — start dates differ slightly but use standard mapping (~14/15)
const BANGLA_MASA = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
const BANGLA_MASA_EN = ['Boishakh','Jyoishtho','Asharh','Srabon','Bhadro','Ashwin','Kartik','Ogrohayon','Poush','Magh','Falgun','Choitro'];

// Purnimanta lunar month names (sidereal, sun sign based)
const PURNI_BN = ['চৈত্র','বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','মার্গশীর্ষ','পৌষ','মাঘ','ফাল্গুন'];
const PURNI_EN = ['Chaitra','Vaishakha','Jyeshtha','Ashadha','Shravana','Bhadrapada','Ashwina','Kartika','Margashirsha','Pausha','Magha','Phalguna'];

// Gaudiya Vaishnava 12 month names (regular), aligned with amanta months starting Chaitra(=Vishnu)
const GAUDIYA_BN = ['বিষ্ণু','মধুসূদন','ত্রিবিক্রম','বামন','শ্রীধর','হৃষীকেশ','পদ্মনাভ','দামোদর','কেশব','নারায়ণ','মাধব','গোবিন্দ'];
const GAUDIYA_EN = ['Vishnu','Madhusudana','Trivikrama','Vamana','Sridhara','Hrishikesha','Padmanabha','Damodara','Keshava','Narayana','Madhava','Govinda'];

// ---------- Astronomical helpers (Meeus simplified) ----------
const D2R = Math.PI/180, R2D = 180/Math.PI;
const norm360 = x => ((x % 360) + 360) % 360;
const sind = x => Math.sin(x*D2R), cosd = x => Math.cos(x*D2R), tand = x => Math.tan(x*D2R);

function jdFromDate(d){ // d: JS Date in UTC
  const Y=d.getUTCFullYear(), M0=d.getUTCMonth()+1, D=d.getUTCDate()+(d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600)/24;
  let Y2=Y, M=M0;
  if(M<=2){Y2-=1; M+=12;}
  const A=Math.floor(Y2/100), B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(Y2+4716))+Math.floor(30.6001*(M+1))+D+B-1524.5;
}
function jdToDateUTC(jd){
  const Z=Math.floor(jd+0.5), F=jd+0.5-Z;
  let A=Z; if(Z>=2299161){const a=Math.floor((Z-1867216.25)/36524.25); A=Z+1+a-Math.floor(a/4);}
  const B=A+1524, C=Math.floor((B-122.1)/365.25), D=Math.floor(365.25*C), E=Math.floor((B-D)/30.6001);
  const day=B-D-Math.floor(30.6001*E)+F;
  const month=E<14?E-1:E-13, year=month>2?C-4716:C-4715;
  const di=Math.floor(day), frac=(day-di)*24;
  const h=Math.floor(frac), mi=Math.floor((frac-h)*60), s=Math.round(((frac-h)*60-mi)*60);
  return new Date(Date.UTC(year,month-1,di,h,mi,s));
}

// Sun's geocentric ecliptic longitude (degrees), tropical
function sunLong(jd){
  const T=(jd-2451545.0)/36525;
  const L0=norm360(280.46646+36000.76983*T+0.0003032*T*T);
  const M=norm360(357.52911+35999.05029*T-0.0001537*T*T);
  const e=0.016708634-0.000042037*T;
  const C=(1.914602-0.004817*T)*sind(M)+(0.019993-0.000101*T)*sind(2*M)+0.000289*sind(3*M);
  return norm360(L0+C);
}
// Moon's geocentric ecliptic longitude (degrees), tropical — simplified
function moonLong(jd){
  const T=(jd-2451545.0)/36525;
  const L=norm360(218.3164477+481267.88123421*T-0.0015786*T*T);
  const D=norm360(297.8501921+445267.1114034*T-0.0018819*T*T);
  const M=norm360(357.5291092+35999.0502909*T-0.0001536*T*T);
  const Mp=norm360(134.9633964+477198.8675055*T+0.0087414*T*T);
  const F=norm360(93.2720950+483202.0175233*T-0.0036539*T*T);
  // Top ~10 terms
  let dL=0;
  dL += 6.288774*sind(Mp);
  dL += 1.274027*sind(2*D-Mp);
  dL += 0.658314*sind(2*D);
  dL += 0.213618*sind(2*Mp);
  dL -= 0.185116*sind(M);
  dL -= 0.114332*sind(2*F);
  dL += 0.058793*sind(2*D-2*Mp);
  dL += 0.057066*sind(2*D-M-Mp);
  dL += 0.053322*sind(2*D+Mp);
  dL += 0.045758*sind(2*D-M);
  dL -= 0.040923*sind(M-Mp);
  dL -= 0.034720*sind(D);
  dL -= 0.030383*sind(M+Mp);
  return norm360(L+dL);
}

// Lahiri ayanamsa (approx)
function ayanamsa(jd){
  const T=(jd-2451545.0)/36525;
  // approx formula; ~24°08' in 2026
  return 23.85+0.0137*((jd-2451545.0)/365.25);
}

function siderealLong(longTrop, jd){ return norm360(longTrop - ayanamsa(jd)); }

// ---------- Panchang ----------
function findCrossing(targetDiff, jdStart, jdEnd){
  // find jd where (moon-sun) reaches targetDiff (mod 360), within [start,end]
  let a=jdStart, b=jdEnd;
  const f=jd=>{
    let v=norm360(moonLong(jd)-sunLong(jd))-targetDiff;
    if(v>180)v-=360; if(v<-180)v+=360; return v;
  };
  let fa=f(a), fb=f(b);
  for(let i=0;i<40;i++){
    const m=(a+b)/2, fm=f(m);
    if(Math.abs(fm)<1e-4) return m;
    if(fa*fm<0){b=m; fb=fm;} else {a=m; fa=fm;}
  }
  return (a+b)/2;
}

function computeTithiAtNoonLocal(date){
  // date: JS Date local midnight. Compute at sunrise approx (06:00 local) for tithi label.
  const jd = jdFromDate(new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),6-TZ,0,0)));
  const sl=sunLong(jd), ml=moonLong(jd);
  const diff=norm360(ml-sl);
  const tithiIdx=Math.floor(diff/12); // 0..29
  const yogaIdx=Math.floor(norm360(ml+sl)/(360/27));
  const sidM=siderealLong(ml,jd);
  const nakIdx=Math.floor(sidM/(360/27));
  // karana: half-tithi
  const karanaNum=Math.floor(diff/6); // 0..59
  let karanaName;
  if(karanaNum===0) karanaName='কিংস্তুঘ্ন';
  else if(karanaNum>=57) karanaName=['শকুনি','চতুষ্পদ','নাগ'][karanaNum-57];
  else karanaName=['বব','বালব','কৌলব','তৈতিল','গর','বণিজ','বিষ্টি'][(karanaNum-1)%7];
  const karanaIdxEN = karanaNum===0?10 : karanaNum>=57?(7+(karanaNum-57)) : ((karanaNum-1)%7);
  return {tithiIdx, yogaIdx, nakIdx, karanaName, karanaIdxEN, sl, ml, jd};
}

// ---------- Sunrise / Sunset / Noon (NOAA) ----------
function sunTimes(date){
  // returns local (UTC+6) HH:MM strings
  const Y=date.getFullYear(),M=date.getMonth()+1,D=date.getDate();
  const N=Math.floor(275*M/9)-Math.floor((M+9)/12)*(1+Math.floor((Y-4*Math.floor(Y/4)+2)/3))+D-30;
  const lngHour=LON/15;
  function calc(rise){
    const t=N+((rise?6:18)-lngHour)/24;
    const Mn=(0.9856*t)-3.289;
    let L=Mn+(1.916*sind(Mn))+(0.020*sind(2*Mn))+282.634; L=norm360(L);
    let RA=R2D*Math.atan(0.91764*tand(L)); RA=norm360(RA);
    const Lq=Math.floor(L/90)*90, RAq=Math.floor(RA/90)*90;
    RA=RA+(Lq-RAq); RA/=15;
    const sinDec=0.39782*sind(L), cosDec=Math.cos(Math.asin(sinDec));
    const zenith=90.833;
    const cosH=(cosd(zenith)-sinDec*sind(LAT))/(cosDec*cosd(LAT));
    if(cosH>1||cosH<-1) return null;
    let H=rise?360-R2D*Math.acos(cosH):R2D*Math.acos(cosH); H/=15;
    const T=H+RA-0.06571*t-6.622;
    let UT=T-lngHour; UT=((UT%24)+24)%24;
    const local=(UT+TZ)%24;
    const h=Math.floor(local), m=Math.round((local-h)*60);
    return {h,m,dec:R2D*Math.asin(sinDec)};
  }
  const fmt=t=>t?String(t.h).padStart(2,'0')+':'+String(t.m).padStart(2,'0'):'—';
  const r=calc(true), s=calc(false);
  const noonH = r&&s ? ((r.h+r.m/60)+(s.h+s.m/60))/2 : null;
  const noon = noonH!=null ? String(Math.floor(noonH)).padStart(2,'0')+':'+String(Math.round((noonH-Math.floor(noonH))*60)).padStart(2,'0') : '—';
  // Brahma muhurta: 1h36m before sunrise, lasts 48 min — start time
  let brahma='—';
  if(r){
    let mins=r.h*60+r.m-96;
    if(mins<0)mins+=1440;
    brahma=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
  }
  // Abhijit muhurta: middle 48 min around solar noon
  let abhijit='—';
  if(noonH!=null){
    let mins=Math.round(noonH*60)-24;
    abhijit=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
  }
  // Rahu kaal (8 segments between sunrise and sunset, weekday based)
  const RAHU=[8,2,7,5,6,4,3]; // Sun..Sat index in 1..8
  let rahu='—';
  if(r&&s){
    const start=r.h*60+r.m, end=s.h*60+s.m;
    const seg=(end-start)/8;
    const idx=RAHU[date.getDay()]-1;
    const rs=start+seg*idx, re=rs+seg;
    const f=v=>String(Math.floor(v/60)).padStart(2,'0')+':'+String(Math.floor(v%60)).padStart(2,'0');
    rahu=f(rs)+'–'+f(re);
  }
  return {sunrise:fmt(r), sunset:fmt(s), noon, brahma, abhijit, rahu};
}

// Moonrise/moonset — approximate using simple search
function moonTimes(date){
  // search every 10 min for altitude sign change
  const Y=date.getFullYear(),M=date.getMonth(),D=date.getDate();
  let prevAlt=null, rise=null, set=null;
  for(let k=0;k<=144;k++){
    const localMin=k*10;
    const utc=new Date(Date.UTC(Y,M,D,Math.floor(localMin/60)-TZ,localMin%60,0));
    const jd=jdFromDate(utc);
    const lam=moonLong(jd)*D2R;
    const eps=23.4393*D2R;
    const ra=Math.atan2(Math.cos(eps)*Math.sin(lam),Math.cos(lam));
    const dec=Math.asin(Math.sin(eps)*Math.sin(lam));
    // GMST
    const T=(jd-2451545.0)/36525;
    let gmst=280.46061837+360.98564736629*(jd-2451545.0)+0.000387933*T*T;
    gmst=norm360(gmst);
    const lst=norm360(gmst+LON);
    const H=(lst*D2R)-ra;
    const alt=Math.asin(Math.sin(LAT*D2R)*Math.sin(dec)+Math.cos(LAT*D2R)*Math.cos(dec)*Math.cos(H));
    if(prevAlt!==null){
      if(prevAlt<0&&alt>=0&&!rise){
        const m=localMin-10*(alt/(alt-prevAlt));
        rise=m;
      }
      if(prevAlt>=0&&alt<0&&!set){
        const m=localMin-10*(alt/(alt-prevAlt));
        set=m;
      }
    }
    prevAlt=alt;
  }
  const f=v=>v==null?'—':String(Math.floor(v/60)%24).padStart(2,'0')+':'+String(Math.floor(v%60)).padStart(2,'0');
  return {moonrise:f(rise), moonset:f(set)};
}

// ---------- Lunar month with Adhika detection ----------
// Amanta scheme: lunar month starts after Amavasya (sun-moon conjunction).
// Month name = Gaudiya/lunar name corresponding to sidereal sun sign at start.
// If two amavasyas occur within the same sidereal sun sign, the first lunar month is Adhika (Purushottama).

function findPrevNewMoon(jd){
  // find latest jd_new <= jd where moon-sun angle = 0
  let j=jd;
  for(let i=0;i<60;i++){
    const diff=norm360(moonLong(j)-sunLong(j));
    if(diff<0.5||diff>359.5){
      // refine
      return refineConjunction(j-0.5,j+0.5);
    }
    j-= (diff)/(360/29.53); // step back proportional
    if(j<jd-35)break;
  }
  // fallback bracket scan
  for(let off=0;off<35;off+=0.5){
    const a=jd-off-0.5, b=jd-off;
    const da=normSigned(moonLong(a)-sunLong(a));
    const db=normSigned(moonLong(b)-sunLong(b));
    if(da<=0&&db>0) return refineConjunction(a,b);
    if(da>0&&db<=0) return refineConjunction(a,b);
  }
  return jd-15;
}
function normSigned(x){x=((x%360)+360)%360; return x>180?x-360:x;}
function refineConjunction(a,b){
  for(let i=0;i<40;i++){
    const m=(a+b)/2;
    const fa=normSigned(moonLong(a)-sunLong(a));
    const fm=normSigned(moonLong(m)-sunLong(m));
    if(Math.abs(fm)<1e-4)return m;
    if(fa*fm<=0)b=m; else a=m;
  }
  return (a+b)/2;
}
function findNextNewMoon(jdAfter){
  for(let off=0.5;off<40;off+=0.5){
    const a=jdAfter+off-0.5, b=jdAfter+off;
    const da=normSigned(moonLong(a)-sunLong(a));
    const db=normSigned(moonLong(b)-sunLong(b));
    if(da<=0&&db>0) return refineConjunction(a,b);
  }
  return jdAfter+29.5;
}

function siderealSunSign(jd){
  return Math.floor(siderealLong(sunLong(jd),jd)/30); // 0..11; 0=Mesha (Chaitra)
}

function lunarMonthInfo(date){
  // Determine lunar month at given date.
  const jd=jdFromDate(new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),6-TZ,0,0)));
  const prevNM=findPrevNewMoon(jd);
  const nextNM=findNextNewMoon(prevNM+1);
  const signStart=siderealSunSign(prevNM+0.5);
  const signEnd=siderealSunSign(nextNM-0.5);
  // If sun sign doesn't change between two new moons => Adhika
  const adhika = (signStart===signEnd);
  // Determine which regular month name applies.
  // Standard rule (amanta): name = month corresponding to sun sign at start of the lunar month + 0 (Mesha=Chaitra).
  // For adhika: name matches the NEXT regular month (since the regular month gets postponed).
  // Practical: amanta naming uses sign at next amavasya; here we follow reference image where June15 2026 (just before amavasya) shows Purushottama, and the regular following month is Trivikrama (Jyaistha = sign 2).
  // So the "name" of the current lunar month = sign at the END (next amavasya) for amanta.
  let nameIdx = signEnd; // amanta convention
  const purnimanta = (nameIdx+1)%12; // purnimanta is one ahead in second fortnight; simplified
  return {
    jdStart:prevNM, jdEnd:nextNM, adhika,
    gaudiyaIdx:nameIdx, purnimantaIdx:nameIdx
  };
}

// ---------- Bengali (Bangladesh) solar date ----------
// Bangladesh revised: Boishakh starts April 14. Months 1-5: 31 days, 6: 31, 7-10: 30, 11: 30 (29 leap), 12: 30.
// Simplified rule for current era.
function bengaliDate(date){
  const Y=date.getFullYear(), M=date.getMonth(), D=date.getDate();
  // Determine Bangla year offset
  let by = Y - 593;
  // boundary: April 14
  if(M<3||(M===3&&D<14)) by-=1;
  // ordinal day from April 14
  const start = new Date(M<3||(M===3&&D<14) ? Y-1 : Y, 3, 14);
  const diff = Math.floor((date - start)/86400000);
  const lens = [31,31,31,31,31,31,30,30,30,30,30,30];
  let rem=diff, mi=0;
  while(rem>=lens[mi]){rem-=lens[mi]; mi++;}
  return {year:by, monthIdx:mi, day:rem+1};
}

// Gaurabda year: 1486 CE = year 0 (Chaitanya's appearance). Gaurabda = year since.
// Year increments on Gaura Purnima (Phalguni Purnima ~Feb/Mar). Approx: subtract 1486.
function gaurabda(date){
  return date.getFullYear()-1486;
}

// ---------- UI ----------
let cursor = new Date(); cursor.setDate(1);
let selected = new Date();

const $=id=>document.getElementById(id);
const BN_MONTH = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
const EN_MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function render(){
  const y=cursor.getFullYear(), m=cursor.getMonth();
  $('monthTitle').textContent = BN_MONTH[m]+' '+bn(y);
  $('monthSub').textContent = EN_MONTH[m]+' '+y;
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const grid=$('grid'); grid.innerHTML='';
  for(let i=0;i<first.getDay();i++){grid.appendChild(document.createElement('div')).className='cell';}
  const todayStr=new Date().toDateString();
  const selStr=selected.toDateString();
  for(let d=1;d<=last.getDate();d++){
    const dt=new Date(y,m,d);
    const cell=document.createElement('div');
    cell.className='cell has';
    if(dt.toDateString()===todayStr) cell.classList.add('today');
    if(dt.toDateString()===selStr) cell.classList.add('sel');
    const info=computeTithiAtNoonLocal(dt);
    const tname=TITHI_BN[info.tithiIdx];
    let cls='t';
    if(info.tithiIdx===14) cls+=' purnima';
    else if(info.tithiIdx===29) cls+=' amavasya';
    else if(info.tithiIdx===10||info.tithiIdx===25) cls+=' ekadashi';
    cell.innerHTML=`<div class="dot"></div><div class="d">${bn(d)}</div><div class="${cls}">${tname}</div>`;
    cell.onclick=()=>{selected=dt; render();};
    grid.appendChild(cell);
  }
  renderDetail();
}

function renderDetail(){
  const dt=selected;
  const info=computeTithiAtNoonLocal(dt);
  const tIdx=info.tithiIdx;
  const paksha = tIdx<15 ? {bn:'গৌর পক্ষ (শুক্ল)', en:'Gaura / Shukla'} : {bn:'কৃষ্ণ পক্ষ', en:'Krishna'};
  const bdate=bengaliDate(dt);
  const lm=lunarMonthInfo(dt);
  const gName = lm.adhika ? 'পুরুষোত্তম' : GAUDIYA_BN[lm.gaudiyaIdx];
  const gNameEN = lm.adhika ? 'Purushottama (Adhika)' : GAUDIYA_EN[lm.gaudiyaIdx];
  const pName = lm.adhika ? 'অধিক' : PURNI_BN[lm.purnimantaIdx];
  const pNameEN = lm.adhika ? 'Adhika' : PURNI_EN[lm.purnimantaIdx];
  const st=sunTimes(dt);
  const mt=moonTimes(dt);
  const ga=gaurabda(dt);

  const headerTitle = `${bn(ga)} গৌরাব্দ • ${gName} মাস • ${paksha.bn}`;
  const headerSub = `${gNameEN} masa • ${paksha.en} paksha`;

  $('detail').innerHTML = `
    <h2>${headerTitle}</h2>
    <div class="sub2">${headerSub}${lm.adhika?'<span class="badge">অধিক / পুরুষোত্তম মাস</span>':''}</div>

    <div class="row">
      <div class="item"><div class="k">তিথি</div><div class="v">${TITHI_BN[tIdx]}<small>${TITHI_EN[tIdx]}</small></div></div>
      <div class="item"><div class="k">পক্ষ</div><div class="v">${paksha.bn}<small>${paksha.en} Paksha</small></div></div>
      <div class="item"><div class="k">বার</div><div class="v">${VAARA_BN[dt.getDay()]}<small>${VAARA_EN[dt.getDay()]}</small></div></div>
      <div class="item"><div class="k">নক্ষত্র</div><div class="v">${NAK_BN[info.nakIdx]}<small>${NAK_EN[info.nakIdx]}</small></div></div>
      <div class="item"><div class="k">যোগ</div><div class="v">${YOGA_BN[info.yogaIdx]}<small>${YOGA_EN[info.yogaIdx]}</small></div></div>
      <div class="item"><div class="k">করণ</div><div class="v">${info.karanaName}<small>${KARANA_EN[info.karanaIdxEN]}</small></div></div>
      <div class="item"><div class="k">বঙ্গাব্দ মাস</div><div class="v">${BANGLA_MASA[bdate.monthIdx]} ${bn(bdate.day)}<small>${BANGLA_MASA_EN[bdate.monthIdx]} • ${bn(bdate.year)}</small></div></div>
      <div class="item"><div class="k">গৌড়ীয় বৈষ্ণব মাস</div><div class="v">${gName}<small>${gNameEN}</small></div></div>
      <div class="item"><div class="k">পূর্ণিমান্ত মাস</div><div class="v">${pName}<small>${pNameEN}</small></div></div>
    </div>

    <div class="times">
      <div class="tm"><span class="l">ব্রহ্ম মুহূর্ত</span><span class="r">${st.brahma}</span></div>
      <div class="tm"><span class="l">সূর্যোদয়</span><span class="r">${st.sunrise}</span></div>
      <div class="tm"><span class="l">মধ্যাহ্ন</span><span class="r">${st.noon}</span></div>
      <div class="tm"><span class="l">অভিজিৎ মুহূর্ত</span><span class="r">${st.abhijit}</span></div>
      <div class="tm"><span class="l">সূর্যাস্ত</span><span class="r">${st.sunset}</span></div>
      <div class="tm"><span class="l">চন্দ্রোদয়</span><span class="r">${mt.moonrise}</span></div>
      <div class="tm"><span class="l">চন্দ্রাস্ত</span><span class="r">${mt.moonset}</span></div>
      <div class="tm"><span class="l">রাহু কাল</span><span class="r">${st.rahu}</span></div>
    </div>
  `;
}

$('prev').onclick=()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1); render();};
$('next').onclick=()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()+1,1); render();};
render();
