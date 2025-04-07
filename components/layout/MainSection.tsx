// components/MainSection.js

import RecentPosts from "./RecentPosts";

const MainSection = () => (
  <main className="text-center my-12">
    <div className="flex gap-10 ">
      <h1 className="text-4xl font-bold mb-4">
        카카오테크, 미래의 문턱을 낮추는 기술
      </h1>
      <p className="text-lg">
        Kakao lowers the barrier to the future, and brings tomorrow's technology
        into your life.
      </p>
    </div>

    <RecentPosts />
  </main>
);

export default MainSection;
