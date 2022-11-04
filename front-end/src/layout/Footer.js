import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer p-4">
<footer>
  <h6 className="footer-text text-center">
  {`Copyright © Jose Campuzano ${year}`}
  </h6>
  </footer>
    </div>  
  );
}

export default Footer
