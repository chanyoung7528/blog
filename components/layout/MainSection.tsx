import { categoryInfo } from "@/constant/post";
import styles from "@/styles/layout/main.module.css";
import Link from "next/link";
import { rootUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";

import BlogList from "../page/main/BlogList";
import { allWritings } from "contentlayer/generated";

const MainSection = () => (
  <main
    id="target-section"
    className={`${styles.main} mx-auto my-12 max-w-[1280px]`}
  >
    <article>
      <div
        className={`${styles.cont_intro} flex-col gap-5 lg:flex lg:flex-row`}
      >
        <div className={`${styles.info_intro} flex-[1]`}>
          <div className="min-w-[400px]"></div>
          <p className={styles.desc_intro}> </p>
        </div>
        <div className="flex-1 maxSm:mt-5">
          <div className="flex flex-wrap gap-[2rem]">
            {categoryInfo?.map((category, index) => (
              <Link
                href={`${rootUrl()}/category/${category.value}`}
                key={index}
              >
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

export default MainSection;
