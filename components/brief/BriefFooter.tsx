export default function BriefFooter() {
  return (
    <footer
      className="mt-auto flex items-end justify-between border-t border-cream-200/10 px-[0.6in] py-[0.3in]"
      style={{ fontSize: "10.5px" }}
    >
      <div className="flex flex-col gap-0.5">
        <div className="font-display uppercase tracking-[0.28em] text-cream-200" style={{ fontSize: "10px" }}>
          The Mechanical Vision Corporation
        </div>
        <div className="text-cream-400">mechanicalvisioncorp.com</div>
      </div>
      <div className="flex flex-col items-end gap-0.5 text-cream-400">
        <a href="mailto:jake@mechanicalvisioncorp.com">
          jake@mechanicalvisioncorp.com
        </a>
      </div>
    </footer>
  );
}
