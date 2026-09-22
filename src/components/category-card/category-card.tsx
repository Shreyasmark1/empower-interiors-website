import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  title: string;
  imageUrl: string;
  href?: string;
  onClick?: () => void;
};

function CategoryCard({ title, imageUrl, href, onClick }: CategoryCardProps) {
  const content = (
    <>
      <span className="flex aspect-square w-full items-center justify-center bg-[#f5f5f5] transition-shadow duration-300 group-hover:shadow-md">
        <Image
          src={imageUrl}
          alt={title}
          width={350}
          height={350}
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block text-center text-[15px] font-medium text-slate-800 transition-colors duration-300 group-hover:text-primary">
        {title}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="group flex w-full max-w-[220px] cursor-pointer flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="m-0 flex w-full max-w-[220px] cursor-pointer flex-col items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {content}
    </button>
  );
}

export { CategoryCard };
export type { CategoryCardProps };
