import RecentPosts from "./RecentPosts";
import styles from "@/styles/layout/Main.module.css";

const MainSection = () => (
  <main className={`${styles.main} mx-auto my-12 max-w-[1280]`}>
    <article>
      <div className={styles.cont_intro}>
        <div className={styles.info_intro}>
          <h2 className={styles.tit_intro}>
            <span className={styles.tit_tech}>카카오테크,</span>
            <span className={styles.tit_tech}>미래의 문턱을 낮추는 기술</span>
          </h2>
          <p className={styles.desc_intro}>
            Kakao lowers the barrier to the future, and brings tomorrow's
            technology into your life
          </p>
        </div>
        <img
          className={styles.img_intro}
          src="https://img1.kakaocdn.net/thumb/U983x0/?fname=https://t1.kakaocdn.net/kakao_tech/resources/static/img_intro.png"
          alt=""
          data-v-2bcb85f3=""
        ></img>
      </div>
      <div className="cont_main"></div>
      <div className="cont_main">
        <RecentPosts />
      </div>
    </article>
  </main>
);

export default MainSection;
