import { categoryInfo } from "@/constant/post";
import styles from "@/styles/layout/main.module.css";
import Link from "next/link";
import { rootUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Post from "../page/main/Post";
import { MainPagination } from "@/components/page/main/MainPagination";

const MainSection = () => (
  <main
    id="target-section"
    className={`${styles.main} mx-auto my-12 max-w-[1280px]`}
  >
    <article>
      <div
        className={`${styles.cont_intro} flex-col gap-5 lg:flex lg:flex-row`}
      >
        <div className={styles.info_intro}>
          <h2 className={styles.tit_intro}>
            <span className={styles.tit_tech}>카카오테크,</span>
            <span className={styles.tit_tech}>미래의 문턱을 낮추는 기술</span>
          </h2>
          <p className={styles.desc_intro}>Kakao lowers</p>
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
        <Post />
      </div>

      <MainPagination />
    </article>
  </main>
);

export default MainSection;
