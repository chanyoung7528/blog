import { categoryInfo } from "@/constant/post";
import styles from "@/styles/layout/main.module.css";
import Link from "next/link";
import BlogList from "../page/main/BlogList";
import { allWritings } from "contentlayer/generated";
import Image from "next/image";
import { Badge } from "../ui/Badge";

const MainSection = () => {
  return (
    <main
      id="target-section"
      className={`${styles.main} mx-auto my-12 max-w-[1280px]`}
    >
      <article>
        <div
          className={`${styles.cont_intro} flex-col gap-5 lg:flex lg:flex-row`}
        >
          <div className="flex-[1]">
            <div className="w-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md transition-transform duration-300 hover:scale-105">
                <Image
                  src="https://nomadcoders.co/courses/maker-masterclass/hero.jpg"
                  alt="bestPost.title"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="bg-black/20 absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="mb-4 text-[2.25rem] font-bold text-white">
                      개발자의 기록
                    </h1>
                    <p className="text-2xl text-white">
                      코딩과 개발에 대한 이야기를 공유합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-[200px] flex-1 maxSm:mt-5">
            <div className="flex flex-wrap gap-[2.5rem] pl-6 pr-6">
              {categoryInfo?.map((category, index) => (
                <Link href={`/category/${category.value}`} key={index}>
                  <Badge category={category} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="cont_main">
          <BlogList writings={allWritings} />
        </div>
      </article>
    </main>
  );
};

export default MainSection;
