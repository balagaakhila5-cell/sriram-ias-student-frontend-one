import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import ContactCard from "@/features/studentPortal/components/ContactCard";

export default function ParentImportantContactsPage() {
  return (
   <div className="flex flex-wrap justify-center gap-6">
  
  <ContactCard
    title="Support Mobile Number"
    description="Primary point of Email for all student enquiries and other related matters"
    actionLabel="9898989898"
    actionHref="tel:9898989898"
    actionIcon={<Phone size={18} />}
    bg="linear-gradient(135deg, #FCE7D0 0%, #F8D4B5 100%)"
    titleColor="#E16165"
    illustration={
      <span className="flex h-[200px] w-[200px] items-center justify-center">
        <Image
          src="/assets/student/hand-phone.png"
          alt="Support Call"
          fill
          className="object-cover"
        />
      </span>
    }
  />

  <ContactCard
    title="Support Email ID"
    description="Primary point of Email for all student enquiries and other related matters"
    actionLabel="sriramias@gmail.com"
    actionHref="mailto:sriramias@gmail.com"
    actionIcon={<Mail size={18} />}
    bg="linear-gradient(135deg, #DDEAF7 0%, #BFD7EE 100%)"
    titleColor="#E16165"
    illustration={
      <span className="absolute right-[-35] flex h-[200px] w-[200px] -translate-y-1/2 items-center justify-center">
        <Image
          src="/assets/student/email.png"
          alt="Support Call"
          fill
          className="object-cover -rotate-70"
        />
      </span>
    }
  />

  {/* Third Card Center */}
  <div className="flex w-full justify-center">
    <ContactCard
      title="Student Mentor Contact"
      description="Primary point of Email for all student enquiries and other related matters"
      actionLabel="9898989898"
      actionHref="tel:9898989898"
      actionIcon={<Phone size={18} />}
      bg="linear-gradient(135deg, #C9DDBA 0%, #A6C68C 100%)"
      titleColor="#FFFFFF"
      illustration={
        <span className="flex h-[200px] w-[200px] items-center justify-center">
          <Phone
            size={64}
            className="text-[#3F6B2E]"
            strokeWidth={1.6}
          />
        </span>
      }
    />
  </div>
</div>
  );
}
