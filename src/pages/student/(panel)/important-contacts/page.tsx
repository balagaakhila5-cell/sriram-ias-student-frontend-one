import { Mail, Phone } from "lucide-react";
import ContactCard from "@/features/studentPortal/components/ContactCard";
import {
  PORTAL_SUPPORT_EMAIL,
  PORTAL_SUPPORT_PHONE,
} from "@/config/supportContact";
import { emailHref, phoneHref } from "@/utils/contactLinks";
import Image from "@/components/common/AppImage";

export default function ImportantContactsPage() {
  return (
    <div className="flex flex-wrap gap-6">
      <ContactCard
        title="Support Mobile Number"
        description="Primary point of Email for all student enquiries and other related matters"
        actionLabel={PORTAL_SUPPORT_PHONE}
        actionHref={phoneHref(PORTAL_SUPPORT_PHONE)}
        actionIcon={<Phone size={18} />}
        bg="linear-gradient(135deg, #FCE7D0 0%, #F8D4B5 100%)"
        titleColor="#20A0E0"
        illustration={
          <span className="flex h-[200px] w-[200px] items-center justify-center ">
            <Image src="/assets/student/hand-phone.png" alt="Support Call" fill className="object-cover" />
          </span>
        }
      />

      <ContactCard
        title="Support Email ID"
        description="Primary point of Email for all student enquiries and other related matters"
        actionLabel={PORTAL_SUPPORT_EMAIL}
        actionHref={emailHref(PORTAL_SUPPORT_EMAIL)}
        actionIcon={<Mail size={18} />}
        bg="linear-gradient(135deg, #DDEAF7 0%, #BFD7EE 100%)"
        titleColor="#20A0E0"
        illustration={
          <span className="absolute right-[-35]  flex h-[200px] w-[200px] -translate-y-1/2 items-center justify-center ">
            <Image src="/assets/student/email.png" alt="Support Call" fill className="object-cover -rotate-70" />
          </span>
        }
      />
    </div>
  );
}
