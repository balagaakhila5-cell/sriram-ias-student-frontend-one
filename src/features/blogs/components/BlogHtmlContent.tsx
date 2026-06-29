type BlogHtmlContentProps = {
  html: string;
  className?: string;
};

export default function BlogHtmlContent({ html, className = '' }: BlogHtmlContentProps) {
  if (!html?.trim()) return null;

  return (
    <div
      className={`blog-html-content text-[21px] font-normal leading-[1.8] text-[#111] [&_a]:text-[#22A8EA] [&_a]:underline [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-8 [&_p]:mb-4 [&_strong]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-8 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
