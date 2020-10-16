import ReactGA from "react-ga";

export const initGA = (trackingID, pageName) => {  
    ReactGA.initialize([
        {
          trackingId: trackingID,
          gaOptions: {
            userId: pageName
          }
        },
      ],
    )
      
 }

 export const PageView = () => {  
    ReactGA.pageview(window.location.pathname +  
                     window.location.search); 
}

export const Event = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  };