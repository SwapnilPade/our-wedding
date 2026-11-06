function CustomRsvpSection(){
  let{t:e,lang:l}=gf(),
     [side,setSide]=(0,y.useState)(`groom`),
     [name,setName]=(0,y.useState)(``),
     [familyName,setFamilyName]=(0,y.useState)(``),
     [guestCount,setGuestCount]=(0,y.useState)(`2`),
     [city,setCity]=(0,y.useState)(``),
     [contact,setContact]=(0,y.useState)(``),
     [attendingDay,setAttendingDay]=(0,y.useState)(`Both`),
     [status,setStatus]=(0,y.useState)(null),
     [submitting,setSubmitting]=(0,y.useState)(!1);

  async function handleSubmit(evt){
    evt.preventDefault();
    if(!name.trim()||!contact.trim()){
      setStatus({kind:`error`,message:l===`mr`?`कृपया तुमचे नाव आणि संपर्क क्रमांक प्रविष्ट करा.`:`Please enter your Name and Contact Number.`});
      return;
    }
    setSubmitting(!0);
    let record={
      timestamp:new Date().toLocaleString(`en-IN`,{timeZone:`Asia/Kolkata`}),
      side:side===`groom`?`Swapnil (Groom)`:`Sarvani (Bride)`,
      name:name.trim(),
      familyName:familyName.trim(),
      guestCount:guestCount||`1`,
      city:city.trim(),
      contact:contact.trim(),
      attendingDay:attendingDay
    };
    try{
      let rsvps=JSON.parse(localStorage.getItem(`wedding_rsvps`)||`[]`);
      rsvps.push(record);
      localStorage.setItem(`wedding_rsvps`,JSON.stringify(rsvps));
    }catch(err){}

    let sheetUrl=window.GOOGLE_SHEET_URL||`https://script.google.com/macros/s/AKfycby4FFvxTV8zMjbTibmSv4GI6mEl2QnfiGtfZl1WnhO-cZY15OR7gDyMEAHh6ozICl0Yyg/exec`;
    if(sheetUrl){
      try{
        await fetch(sheetUrl,{
          method:`POST`,
          mode:`no-cors`,
          headers:{"Content-Type":"text/plain;charset=utf-8"},
          body:JSON.stringify(record)
        });
      }catch(err){
        console.warn(`Google Sheet submission warning:`,err);
      }
    }
    setSubmitting(!1);
    setStatus({kind:`success`,message:l===`mr`?`धन्यवाद! तुमचे RSVP प्रेमाने स्वीकारले गेले आहे.`:`Thank you! Your RSVP has been received with joy.`});
  }

  return(0,V.jsxs)(`section`,{className:`paper-section rsvp-card-section`,id:`rsvp`,"aria-label":`RSVP`,style:{backgroundImage:`url(./card-frame-bg.jpg)`,backgroundSize:`100% 100%`,backgroundPosition:`center`,backgroundRepeat:`no-repeat`},children:[
    (0,V.jsx)(`div`,{className:`card-frame-art`,style:{backgroundImage:`url(./card-frame-bg.jpg)`},"aria-hidden":!0}),
    (0,V.jsxs)(X.div,{className:`rsvp-card-inner`,initial:{opacity:0,y:15},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.15},transition:{duration:.6},children:[
      (0,V.jsxs)(`div`,{className:`rsvp-card-header`,children:[
        (0,V.jsx)(`p`,{className:`rsvp-card-script`,children:l===`mr`?`आम्हाला आवडेल`:`We'd Love to`}),
        (0,V.jsx)(`h2`,{className:`rsvp-card-serif`,children:l===`mr`?`तुमच्यासोबत साजरे करायला`:`Celebrate With You`}),
        (0,V.jsx)(`p`,{className:`rsvp-card-subtitle`,children:l===`mr`?`कृपया प्रति कुटुंब एकच RSVP — कोण येत आहे ते सांगा.`:`One RSVP per family, please — tell us who's celebrating with us.`})
      ]}),
      (0,V.jsxs)(`form`,{className:`rsvp-inline-form`,onSubmit:handleSubmit,children:[
        (0,V.jsxs)(`div`,{className:`form-group`,children:[
          (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`कोणती बाजू?`:`WHICH SIDE?`}),
          (0,V.jsxs)(`div`,{className:`toggle-group`,children:[
            (0,V.jsx)(`button`,{type:`button`,className:`pill-toggle `+(side===`groom`?`active`:``),onClick:()=>setSide(`groom`),children:l===`mr`?`स्वप्नील (वर)`:`Swapnil (Groom)`}),
            (0,V.jsx)(`button`,{type:`button`,className:`pill-toggle `+(side===`bride`?`active`:``),onClick:()=>setSide(`bride`),children:l===`mr`?`सर्वानी (वधू)`:`Sarvani (Bride)`})
          ]})
        ]}),
        (0,V.jsxs)(`div`,{className:`form-row-2col`,children:[
          (0,V.jsxs)(`div`,{className:`form-group`,children:[
            (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`नाव`:`NAME`}),
            (0,V.jsx)(`input`,{type:`text`,className:`custom-input`,placeholder:l===`mr`?`उदा. स्वप्नील`:`e.g. Swapnil`,value:name,onChange:e=>setName(e.target.value),required:!0})
          ]}),
          (0,V.jsxs)(`div`,{className:`form-group`,children:[
            (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`आडनाव`:`FAMILY NAME`}),
            (0,V.jsx)(`input`,{type:`text`,className:`custom-input`,placeholder:l===`mr`?`उदा. पाडे`:`e.g. Pade`,value:familyName,onChange:e=>setFamilyName(e.target.value)})
          ]})
        ]}),
        (0,V.jsxs)(`div`,{className:`form-row-2col`,children:[
          (0,V.jsxs)(`div`,{className:`form-group`,children:[
            (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`सदस्य संख्या`:`NO. OF GUESTS`}),
            (0,V.jsx)(`input`,{type:`text`,className:`custom-input`,placeholder:`e.g. 2`,value:guestCount,onChange:e=>setGuestCount(e.target.value)})
          ]}),
          (0,V.jsxs)(`div`,{className:`form-group`,children:[
            (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`शहर`:`CITY`}),
            (0,V.jsx)(`input`,{type:`text`,className:`custom-input`,placeholder:l===`mr`?`उदा. मुंबई`:`e.g. Mumbai`,value:city,onChange:e=>setCity(e.target.value)})
          ]})
        ]}),
        (0,V.jsxs)(`div`,{className:`form-group`,children:[
          (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`संपर्क क्रमांक`:`CONTACT NUMBER`}),
          (0,V.jsx)(`input`,{type:`tel`,className:`custom-input`,placeholder:`e.g. 9999999999`,value:contact,onChange:e=>setContact(e.target.value),required:!0})
        ]}),
        (0,V.jsxs)(`div`,{className:`form-group`,children:[
          (0,V.jsx)(`label`,{className:`field-header`,children:l===`mr`?`उपस्थिती (दिवस १: २४ मार्च • दिवस २: २५ मार्च)`:`ATTENDING (Day 1: 24th • Day 2: 25th)`}),
          (0,V.jsxs)(`div`,{className:`toggle-group toggle-group-3`,children:[
            (0,V.jsx)(`button`,{type:`button`,className:`pill-toggle pill-sm `+(attendingDay===`Day 1`?`active`:``),onClick:()=>setAttendingDay(`Day 1`),children:l===`mr`?`दिवस १`:`Day 1`}),
            (0,V.jsx)(`button`,{type:`button`,className:`pill-toggle pill-sm `+(attendingDay===`Day 2`?`active`:``),onClick:()=>setAttendingDay(`Day 2`),children:l===`mr`?`दिवस २`:`Day 2`}),
            (0,V.jsx)(`button`,{type:`button`,className:`pill-toggle pill-sm `+(attendingDay===`Both`?`active`:``),onClick:()=>setAttendingDay(`Both`),children:l===`mr`?`दोन्ही`:`Both`})
          ]})
        ]}),
        (0,V.jsx)(X.button,{type:`submit`,className:`submit-rsvp-btn`,disabled:submitting,whileHover:{scale:1.02},whileTap:{scale:.98},children:submitting?(l===`mr`?`पाठवत आहे...`:`Submitting...`):(l===`mr`?`RSVP पाठवा`:`Submit RSVP`)}),
        status&&(0,V.jsx)(X.p,{className:`form-status `+status.kind,role:`status`,children:status.message})
      ]})
    ]})
  ]})}

function GiftUpiSection(){
  let{lang:l}=gf(),
     [copied,setCopied]=(0,y.useState)(!1),
     upiId=`wedding@upi`;

  function copyToClipboard(){
    try{
      navigator.clipboard.writeText(upiId);
      setCopied(!0);
      setTimeout(()=>setCopied(!1),2500);
    }catch(e){
      setCopied(!0);
      setTimeout(()=>setCopied(!1),2500);
    }
  }

  return(0,V.jsxs)(`section`,{className:`paper-section gift-upi-section`,id:`gifts`,"aria-label":`Blessings & Gifts`,style:{backgroundImage:`url(./card-frame-bg.jpg)`,backgroundSize:`100% 100%`,backgroundPosition:`center`,backgroundRepeat:`no-repeat`},children:[
    (0,V.jsx)(`div`,{className:`card-frame-art`,style:{backgroundImage:`url(./card-frame-bg.jpg)`},"aria-hidden":!0}),
    (0,V.jsxs)(X.div,{className:`gift-upi-inner`,initial:{opacity:0,y:15},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.15},transition:{duration:.6},children:[
      (0,V.jsx)(`p`,{className:`gift-script-lead`,children:l===`mr`?`आमची सस्नेह विनंती`:`Your Presence is Our Present`}),
      (0,V.jsx)(`h2`,{className:`gift-serif-title`,children:l===`mr`?`आशीर्वाद आणि शगुन`:`A Note on Blessings & Gifts`}),
      (0,V.jsxs)(`p`,{className:`gift-note-text`,children:[
        l===`mr`
          ?`तुमची उपस्थिती आणि मनःपूर्वक आशीर्वाद हीच आमच्यासाठी सर्वात मौल्यवान भेट आहे. आम्ही सस्नेह विनंती करतो की कृपया कोणतीही प्रत्यक्ष भेटवस्तू (No Boxed Gifts) आणू नये. `
          :`Your presence and heartfelt blessings are the only gifts we cherish. We warmly request no boxed gifts. `,
        (0,V.jsx)(`strong`,{children:l===`mr`?`कृपया कोणतीही बॉक्स्ड गिफ्ट्स आणू नयेत.`:`No Boxed Gifts, Please.`}),
        l===`mr`
          ?` तरीही आपण नवदाम्पत्याला शुभाशीर्वाद व शगुन देऊ इच्छित असल्यास, आपण UPI द्वारे पाठवू शकता.`
          :` If you would still like to honor the couple with a token of love, you may share your blessings via UPI.`
      ]}),
      (0,V.jsxs)(X.div,{className:`upi-card`,whileHover:{y:-3},transition:{duration:.3},children:[
        (0,V.jsxs)(`div`,{className:`upi-qr-wrapper`,children:[
          (0,V.jsxs)(`svg`,{className:`upi-qr-svg`,viewBox:`0 0 160 160`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[
            (0,V.jsx)(`rect`,{width:`160`,height:`160`,rx:`12`,fill:`#ffffff`}),
            (0,V.jsx)(`rect`,{x:`16`,y:`16`,width:`36`,height:`36`,rx:`6`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`22`,y:`22`,width:`24`,height:`24`,rx:`3`,fill:`#ffffff`}),
            (0,V.jsx)(`rect`,{x:`28`,y:`28`,width:`12`,height:`12`,rx:`2`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`108`,y:`16`,width:`36`,height:`36`,rx:`6`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`114`,y:`22`,width:`24`,height:`24`,rx:`3`,fill:`#ffffff`}),
            (0,V.jsx)(`rect`,{x:`120`,y:`28`,width:`12`,height:`12`,rx:`2`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`16`,y:`108`,width:`36`,height:`36`,rx:`6`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`22`,y:`114`,width:`24`,height:`24`,rx:`3`,fill:`#ffffff`}),
            (0,V.jsx)(`rect`,{x:`28`,y:`120`,width:`12`,height:`12`,rx:`2`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`60`,y:`18`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`74`,y:`18`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`88`,y:`18`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`66`,y:`32`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`80`,y:`32`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`60`,y:`46`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`88`,y:`46`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`18`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`32`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`46`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`106`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`120`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`134`,y:`60`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`24`,y:`74`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`40`,y:`74`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`112`,y:`74`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`128`,y:`74`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`18`,y:`88`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`34`,y:`88`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`108`,y:`88`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`124`,y:`88`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`138`,y:`88`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`60`,y:`108`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`76`,y:`108`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`92`,y:`108`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`110`,y:`108`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`128`,y:`108`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`68`,y:`122`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`84`,y:`122`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`102`,y:`122`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`120`,y:`122`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`136`,y:`122`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`60`,y:`136`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`78`,y:`136`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`96`,y:`136`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`114`,y:`136`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`rect`,{x:`130`,y:`136`,width:`8`,height:`8`,rx:`1`,fill:`#4f000b`}),
            (0,V.jsx)(`circle`,{cx:`80`,cy:`80`,r:`20`,fill:`#fdf1de`,stroke:`#b07d27`,strokeWidth:`2`}),
            (0,V.jsx)(`text`,{x:`80`,y:`86`,textAnchor:`middle`,fill:`#4f000b`,fontSize:`16`,fontWeight:`bold`,fontFamily:`serif`,children:`₹`})
          ]}),
          (0,V.jsx)(`p`,{className:`upi-scan-hint`,children:l===`mr`?`कोणत्याही UPI ॲपने स्कॅन करा`:`Scan with any UPI App`})
        ]}),
        (0,V.jsxs)(`div`,{className:`upi-id-box`,children:[
          (0,V.jsxs)(`div`,{className:`upi-id-info`,children:[
            (0,V.jsx)(`span`,{className:`upi-id-label`,children:`UPI ID`}),
            (0,V.jsx)(`span`,{className:`upi-id-val`,children:upiId})
          ]}),
          (0,V.jsx)(`button`,{type:`button`,className:`upi-copy-btn `+(copied?`copied`:``),onClick:copyToClipboard,children:copied?(l===`mr`?`✓ कॉपी झाले!`:`✓ Copied!`):(l===`mr`?`कॉपी करा`:`Copy`)})
        ]}),
        (0,V.jsx)(`p`,{className:`upi-supported-apps`,children:`GPay • PhonePe • Paytm • BHIM • Cred • Any UPI App`})
      ]})
    ]})
  ]})}

function mp(){
  let{t:e}=gf();
  return(0,V.jsxs)(`section`,{className:`paper-section closing-framed-page`,style:{backgroundImage:`url(./card-frame-bg.jpg)`,backgroundSize:`100% 100%`,backgroundPosition:`center`,backgroundRepeat:`no-repeat`},children:[
    (0,V.jsx)(`div`,{className:`card-frame-art`,style:{backgroundImage:`url(./card-frame-bg.jpg)`},"aria-hidden":!0}),
    (0,V.jsxs)(`div`,{className:`closing-inner`,children:[
      (0,V.jsx)(up,{}),
      (0,V.jsxs)(X.div,{className:`closing-text-wrap`,initial:{opacity:0,y:15},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.8},children:[
        (0,V.jsx)(`p`,{className:`script-title closing-script-title`,children:e(`footer1`)}),
        (0,V.jsx)(Lf,{}),
        (0,V.jsx)(`p`,{className:`closing-names`,children:e(`footer2`)})
      ]})
    ]})
  ]})}

function hp(){
  let[e,t]=(0,y.useState)(!1);
  return(0,y.useEffect)(()=>{
    document.body.style.overflow=e?"":"hidden",e&&window.scrollTo(0,0)
  },[e]),
  (0,V.jsxs)(V.Fragment,{children:[
    e&&(0,V.jsx)(rp,{}),
    (0,V.jsx)(uu,{children:!e&&(0,V.jsx)(tp,{onOpened:()=>t(!0)},`envelope`)}),
    (0,V.jsxs)(`main`,{className:`page`,inert:!e,children:[
      (0,V.jsx)(gp,{children:(0,V.jsx)(qf,{play:e})}),
      (0,V.jsx)(gp,{children:(0,V.jsx)(lp,{})}),
      (0,V.jsx)(gp,{children:(0,V.jsx)(dp,{})}),
      (0,V.jsx)(gp,{children:(0,V.jsx)(CustomRsvpSection,{})}),
      (0,V.jsx)(gp,{children:(0,V.jsx)(GiftUpiSection,{})}),
      (0,V.jsx)(gp,{children:(0,V.jsx)(mp,{})})
    ]})
  ]})}

function gp({children:e}){
  let t=(0,y.useRef)(null),n=sf(),{scrollYProgress:r}=$d({target:t,offset:[`start start`,`end start`]}),i=rf(r,[0,1],[`0%`,`45%`]),a=rf(r,[0,1],[1,.92]),o=rf(r,[0,.9],[1,.15]);
  return(0,V.jsx)(`div`,{ref:t,className:`page-slot`,children:(0,V.jsx)(X.div,{className:`page-layer`,style:n?void 0:{y:i,scale:a,opacity:o},children:e})})}
