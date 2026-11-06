function lp(){
  let{t:e,lang:t}=gf(),
     i=ff.muhurtham;

  return (0,V.jsxs)(`section`,{className:`paper-section invitation-details mandapam-page`,id:`invite`,children:[
    (0,V.jsx)(`div`,{className:`details-art mandapam-art`,style:{backgroundImage:`url(./page2-bg.jpg)`},"aria-hidden":`true`}),
    (0,V.jsxs)(X.div,{className:`mandapam-blank-space`,initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.8,ease:[.22,1,.36,1]},children:[
      (0,V.jsxs)(`div`,{className:`mandapam-block`,children:[
        (0,V.jsx)(`p`,{className:`mandapam-script-title`,children:e(`muhurthamTitle`)}),
        (0,V.jsx)(`p`,{className:`mandapam-date-text`,children:t===`mr`?`गुरुवार, २५ मार्च २०२७`:`Thursday, March 25, 2027`}),
        (0,V.jsx)(`p`,{className:`mandapam-time-text`,children:i.time[t]})
      ]}),
      (0,V.jsx)(`div`,{className:`mandapam-divider-line`}),
      (0,V.jsxs)(`div`,{className:`mandapam-block`,children:[
        (0,V.jsx)(`p`,{className:`mandapam-script-title`,children:e(`venueTitle`)}),
        (0,V.jsx)(`p`,{className:`mandapam-venue-title`,children:i.venue[t][0]}),
        (0,V.jsx)(`p`,{className:`mandapam-venue-city`,children:i.venue[t][1]}),
        (0,V.jsxs)(`a`,{className:`mandapam-directions-pill`,href:i.mapUrl,target:`_blank`,rel:`noopener`,children:[
          e(`directions`),
          (0,V.jsx)(`span`,{className:`pill-arrow`,children:` →`})
        ]})
      ]})
    ]})
  ]})}
