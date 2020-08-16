import React from 'react'
import copyRight from '../../images/mmmplatform_mesh_background.png';

export class Header extends React.Component {

    render() {
            return (
              <div className="footerCont">
                <div className="copyRightFooter"><img src={copyRight} /></div>
                <div className="footerLogo">

                </div>
              </div>
            )
          }

}


export default Header