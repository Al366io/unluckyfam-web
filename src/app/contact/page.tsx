import { Email } from "@mui/icons-material";
import ContactPageStyles from "./ContactPage.module.css";

export default function contact() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <a className={ContactPageStyles.emailSection} href="mailto:unluckyfamofficial@gmail.com">
                    <Email />
                    unluckyfamofficial@gmail.com
                </a>
            </div>
        </div>
    );
}