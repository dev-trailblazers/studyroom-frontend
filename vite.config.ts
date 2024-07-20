import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // fetch(url, ~);
      // url에 api 파라미터가 member/username이면, /api/member/username으로 사용하면 아래 작성한 target 주소+/member/username으로 요청됨
      '/api': {
        // 요청 전달 대상 서버 주소 설정
        target: 'http://localhost:56789',
        // target: 'http://125.247.92.91:56789',
        // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, ''),
        // SSL 인증서 검증 무시
        secure: false,
        // WebSocket 프로토콜 사용
        ws: true,
      },
    },
  },
});
