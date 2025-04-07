// components/Footer.js
const Footer = () => (
  <footer className="bg-gray-100 p-6 mt-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <h4 className="font-semibold">Tech Sites</h4>
        <ul>
          <li>
            <a
              href="https://developers.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kakao Developers
            </a>
          </li>
          {/* 추가 링크 */}
        </ul>
      </div>
      {/* 추가 섹션 */}
    </div>
    <div className="text-center mt-6">
      <p>Copyright © Kakao Corp. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
