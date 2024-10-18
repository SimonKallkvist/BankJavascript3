import Aspire from "../assets/AspireLogo.png";
import Summit from "../assets/SummitLogo.png";
import Titanium from "../assets/TitaniumLogo.png";

export const checkVendor = (value, setVendorLogo, setVendor, setCardBg) => {
  if (value == 1) {
    setVendorLogo(Summit);
    setVendor("Summit Trust Bank");
    setCardBg(
      "linear-gradient(130deg, rgba(31,58,147,1) 0%, rgba(229,229,229,1) 64%, rgba(0,174,239,1) 100%)"
    );
  } else if (value == 2) {
    setVendorLogo(Aspire);
    setVendor("Aspire Financial");
    setCardBg(
      "linear-gradient(130deg, rgba(46,204,113,1) 0%, rgba(244,208,63,1) 64%, rgba(255,255,255,1) 100%)"
    );
  } else if (value == 3) {
    setVendorLogo(Titanium);
    setVendor("Titanium National Bank");
    setCardBg(
      "linear-gradient(130deg, rgba(74,74,74,1) 0%, rgba(189,195,199,1) 58%, rgba(231,76,60,1) 100%)"
    );
  }
};
