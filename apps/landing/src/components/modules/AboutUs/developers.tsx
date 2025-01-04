import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Developers() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Nguyễn Lê Thiện Đức",
      designation: "Product Manager at TechFlow",
      src: "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Nguyễn Xuân Thành",
      designation: "CTO at InnovateSphere",
      src: "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Tống Trần Lê Huy",
      designation: "Operations Director at CloudScale",
      src: "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Nguyễn Duy Thanh",
      designation: "Engineering Lead at DataPro",
      src: "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lê Hoàng Sơn",
      designation: "VP of Technology at FutureNet",
      src: "https://res.cloudinary.com/dyu2kc3bl/image/upload/v1734500933/highschool/user-image/wyc29ngk9rue8bsa3k5q.png",
    },
  ];
  return (
    <div className="flex flex-col">
      <h2 className="text-center text-3xl font-semibold">
        Gặp gỡ các nhà phát triển
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
