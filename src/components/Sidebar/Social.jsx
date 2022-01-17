import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Telegram } from "../../assets/icons/telegram.svg";

export default function Social() {
  const medium_link = "/";
  return (
    <div className="social-row">
      <Link href="https://github.com/Everlastfinance" target="_blank">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="#" target="_blank">
        <SvgIcon color="primary" component={Telegram} />
      </Link>

      {/* <Link href={medium_link} target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link> */}

      <Link href="https://twitter.com/EverlastFinance?t=7yMsdWjiQ2i4hVAiijP2Vw&s=09" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.gg/Qbv7dKQVzx" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
