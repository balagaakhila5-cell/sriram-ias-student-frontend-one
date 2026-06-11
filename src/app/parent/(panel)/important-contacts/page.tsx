import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import ContactCard from "@/features/studentPortal/components/ContactCard";
import {
  PORTAL_SUPPORT_EMAIL,
  PORTAL_SUPPORT_PHONE,
} from "@/config/supportContact";
import { emailHref, phoneHref } from "@/utils/contactLinks";

export default function ParentImportantContactsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 px-2 sm:px-4">
      {/* Row 1: two cards side by side on md+ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex justify-center">
          <ContactCard
            title="Support Mobile Number"
            description="Primary point of Email for all student enquiries and other related matters"
            actionLabel={PORTAL_SUPPORT_PHONE}
            actionHref={phoneHref(PORTAL_SUPPORT_PHONE)}
            actionIcon={<Phone size={18} />}
            bg="linear-gradient(135deg, #FCE7D0 0%, #F8D4B5 100%)"
            titleColor="#20A0E0"
            illustration={
              <span className="relative flex h-[200px] w-[200px] items-center justify-center">
                <Image
                  src="/assets/student/hand-phone.png"
                  alt="Support Call"
                  fill
                  className="object-contain"
                />
              </span>
            }
          />
        </div>

        <div className="flex justify-center">
          <ContactCard
            title="Support Email ID"
            description="Primary point of Email for all student enquiries and other related matters"
            actionLabel={PORTAL_SUPPORT_EMAIL}
            actionHref={emailHref(PORTAL_SUPPORT_EMAIL)}
            actionIcon={<Mail size={18} />}
            bg="linear-gradient(135deg, #DDEAF7 0%, #BFD7EE 100%)"
            titleColor="#20A0E0"
            illustration={
              <span className="relative flex h-[200px] w-[200px] items-center justify-center">
                <Image
                  src="/assets/student/email.png"
                  alt="Support Email"
                  fill
                  className="object-contain"
                />
              </span>
            }
          />
        </div>
      </div>

      {/* Row 2: third card centered */}
      <div className="flex w-full justify-center">
        <ContactCard
          title="Student Mentor Contact"
          description="Primary point of Email for all student enquiries and other related matters"
          actionLabel={PORTAL_SUPPORT_PHONE}
          actionHref={phoneHref(PORTAL_SUPPORT_PHONE)}
          actionIcon={<Phone size={18} />}
          bg="linear-gradient(135deg, #C9DDBA 0%, #A6C68C 100%)"
          titleColor="#FFFFFF"
          illustration={
            <div className="relative h-[320px] w-[370px] bg-transparent">
              <Image
                src="/assets/student/parent-phone2.png"
                alt="Parent Phone"
                fill
                className="object-contain"
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
