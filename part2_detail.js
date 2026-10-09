/**
 * 감자 마켓 (Gamza Market) - 화면 2: 상품 상세 팝업(모달) 로직
 * 파일명: part2_detail.js
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exports = factory();
    root.openProductDetail = exports.openProductDetail;
    root.closeProductDetail = exports.closeProductDetail;
    root.GamzaDetail = exports;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 기본 감자 상품 이미지 (폴백용 SVG Data URI)
  const DEFAULT_PRODUCT_IMG =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FBF8F3"/>
          <stop offset="100%" stop-color="#EFE6DA"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <g transform="translate(150, 60)">
        <ellipse cx="150" cy="120" rx="110" ry="80" fill="#DDB892" stroke="#8D5B4C" stroke-width="6"/>
        <!-- 감자 눈/반점 -->
        <circle cx="95" cy="85" r="5" fill="#8D5B4C" opacity="0.6"/>
        <circle cx="210" cy="95" r="6" fill="#8D5B4C" opacity="0.6"/>
        <circle cx="80" cy="140" r="4" fill="#8D5B4C" opacity="0.5"/>
        <circle cx="225" cy="135" r="5" fill="#8D5B4C" opacity="0.5"/>
        <!-- 감자 귀여운 표정 -->
        <circle cx="120" cy="115" r="6" fill="#6F4E37"/>
        <circle cx="180" cy="115" r="6" fill="#6F4E37"/>
        <path d="M 135 138 Q 150 155 165 138" stroke="#6F4E37" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <!-- 볼터치 -->
        <ellipse cx="108" cy="128" rx="8" ry="5" fill="#E5989B" opacity="0.75"/>
        <ellipse cx="192" cy="128" rx="8" ry="5" fill="#E5989B" opacity="0.75"/>
      </g>
      <text x="300" y="320" font-family="-apple-system, sans-serif" font-size="20" fill="#8D5B4C" font-weight="bold" text-anchor="middle">🥔 감자 마켓 상품 이미지</text>
    </svg>
  `);

  // 기본 판매자 아바타 이미지 (폴백용 SVG Data URI)
  const DEFAULT_AVATAR_IMG =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#F7EFE5" stroke="#E8D8C8" stroke-width="3"/>
      <ellipse cx="50" cy="46" rx="26" ry="20" fill="#DDB892"/>
      <circle cx="43" cy="44" r="2.5" fill="#6F4E37"/>
      <circle cx="57" cy="44" r="2.5" fill="#6F4E37"/>
      <path d="M 46 51 Q 50 55 54 51" stroke="#6F4E37" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="40" cy="48" rx="2.5" ry="1.5" fill="#E5989B"/>
      <ellipse cx="60" cy="48" rx="2.5" ry="1.5" fill="#E5989B"/>
    </svg>
  `);

  let currentProduct = null;
  let isCurrentLiked = false;
  let toastTimer = null;

  // 상세 모달 HTML 구조
  function getDetailModalHTML() {
    return `
    <div id="gamzaDetailModal" class="gamza-detail-overlay" role="dialog" aria-modal="true" aria-labelledby="gamzaDetailTitle">
      <div class="gamza-detail-container" id="gamzaDetailContainer">
        <!-- 상단 우측 닫기 버튼 -->
        <button type="button" class="gamza-detail-close-btn" id="gamzaDetailCloseBtn" aria-label="닫기">✕</button>

        <!-- 스크롤 가능 컨텐츠 영역 -->
        <div class="gamza-detail-scroll-area">
          
          <!-- 상단 상품 이미지 & 상태 배지 -->
          <div class="gamza-detail-image-box">
            <img id="gamzaDetailImage" src="" alt="상품 이미지" class="gamza-detail-image" />
            <span id="gamzaDetailStatusBadge" class="gamza-detail-status-badge status-selling">
              판매중
            </span>
          </div>

          <!-- 본문 상세 정보 -->
          <div class="gamza-detail-content">

            <!-- 판매자 정보 카드 -->
            <div class="gamza-detail-seller-card">
              <div class="gamza-seller-info-left">
                <div class="gamza-seller-avatar">
                  <img id="gamzaDetailSellerImg" src="" alt="판매자 프로필" />
                </div>
                <div class="gamza-seller-meta">
                  <strong id="gamzaDetailSellerName" class="gamza-seller-nickname">감자이웃</strong>
                  <span id="gamzaDetailSellerLocation" class="gamza-seller-region">역삼동</span>
                </div>
              </div>
              <div class="gamza-seller-manner">
                <div class="gamza-manner-badge">
                  <span class="gamza-manner-temp" id="gamzaDetailSellerTemp">36.5℃</span>
                  <span class="gamza-manner-icon">🥔</span>
                </div>
                <div class="gamza-manner-bar-bg">
                  <div class="gamza-manner-bar-fill" id="gamzaDetailMannerBar" style="width: 36.5%;"></div>
                </div>
                <span class="gamza-manner-label">매너 감자지수</span>
              </div>
            </div>

            <hr class="gamza-detail-divider" />

            <!-- 카테고리 & 시간 메타 -->
            <div class="gamza-detail-meta-row">
              <span id="gamzaDetailCategory" class="gamza-detail-category">카테고리</span>
              <span class="gamza-meta-dot">•</span>
              <span id="gamzaDetailTime" class="gamza-detail-time">방금 전</span>
            </div>

            <!-- 상품명 -->
            <h2 id="gamzaDetailTitle" class="gamza-detail-title">상품 제목</h2>

            <!-- 가격 -->
            <div class="gamza-detail-pricing-row">
              <span id="gamzaDetailPrice" class="gamza-detail-price">0원</span>
              <span id="gamzaDetailFreeBadge" class="gamza-detail-free-badge" style="display: none;">무료나눔</span>
            </div>

            <!-- 거래 희망 장소 -->
            <div class="gamza-detail-location-row">
              <span class="gamza-loc-icon">📍</span>
              <span class="gamza-loc-label">거래 희망 장소:</span>
              <span id="gamzaDetailLocation" class="gamza-detail-location">동네</span>
            </div>

            <!-- 상품 설명 -->
            <div class="gamza-detail-desc-box">
              <p id="gamzaDetailDescription" class="gamza-detail-description"></p>
            </div>

            <!-- 관심 및 채팅 수 통계 -->
            <div class="gamza-detail-stats-row">
              <span id="gamzaDetailLikesCount">관심 0</span>
              <span class="gamza-meta-dot">•</span>
              <span id="gamzaDetailChatsCount">채팅 0</span>
            </div>

          </div>
        </div>

        <!-- 하단 액션 바 -->
        <div class="gamza-detail-action-bar">
          <button type="button" id="gamzaDetailLikeBtn" class="gamza-detail-like-btn" aria-label="관심 상품 추가">
            <span class="gamza-like-icon" id="gamzaLikeIcon">♡</span>
            <span class="gamza-like-text">관심</span>
          </button>
          
          <div class="gamza-detail-price-mini">
            <span class="gamza-mini-price-val" id="gamzaDetailMiniPrice">0원</span>
          </div>

          <button type="button" id="gamzaDetailChatBtn" class="gamza-detail-chat-btn">
            <span class="gamza-chat-icon">🥔</span>
            <span>채팅 시작하기</span>
          </button>
        </div>
      </div>

      <!-- 토스트 알림 메시지 -->
      <div id="gamzaDetailToast" class="gamza-detail-toast" role="status" aria-live="polite"></div>
    </div>
    `;
  }

  // 모달 DOM 주입 보장
  function ensureDetailModalInDOM() {
    if (!document.getElementById('gamzaDetailModal')) {
      const rootDiv = document.createElement('div');
      rootDiv.id = 'gamzaDetailModuleRoot';
      rootDiv.innerHTML = getDetailModalHTML();
      document.body.appendChild(rootDiv);
      bindDetailEvents();
    }
  }

  // 토스트 메시지 표시
  function showToast(message) {
    const toast = document.getElementById('gamzaDetailToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('is-show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-show');
    }, 2400);
  }

  // 가격 포맷팅 유틸
  function formatPrice(price) {
    const num = Number(price);
    if (isNaN(num) || num === 0) {
      return { text: '무료나눔', isFree: true };
    }
    return { text: num.toLocaleString('ko-KR') + '원', isFree: false };
  }

  // 상대 시간 또는 날짜 포맷팅
  function formatTime(product) {
    if (product.createdTimeStr) return product.createdTimeStr;
    if (!product.createdAt) return '방금 전';

    try {
      const past = new Date(product.createdAt).getTime();
      const now = Date.now();
      const diffSec = Math.floor((now - past) / 1000);

      if (diffSec < 60) return '방금 전';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
      if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`;
      return new Date(product.createdAt).toLocaleDateString('ko-KR');
    } catch (e) {
      return '방금 전';
    }
  }

  // 이벤트 바인딩
  function bindDetailEvents() {
    const modal = document.getElementById('gamzaDetailModal');
    const closeBtn = document.getElementById('gamzaDetailCloseBtn');
    const likeBtn = document.getElementById('gamzaDetailLikeBtn');
    const chatBtn = document.getElementById('gamzaDetailChatBtn');
    const imgEl = document.getElementById('gamzaDetailImage');
    const sellerImgEl = document.getElementById('gamzaDetailSellerImg');

    // 이미지 에러 시 기본 감자 이미지 대체
    if (imgEl) {
      imgEl.addEventListener('error', () => {
        imgEl.src = DEFAULT_PRODUCT_IMG;
      });
    }

    if (sellerImgEl) {
      sellerImgEl.addEventListener('error', () => {
        sellerImgEl.src = DEFAULT_AVATAR_IMG;
      });
    }

    // 닫기 버튼 클릭
    closeBtn?.addEventListener('click', closeProductDetail);

    // 모달 배경 클릭 시 닫기
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProductDetail();
      }
    });

    // ESC 키로 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeProductDetail();
      }
    });

    // 관심(좋아요) 토글 버튼
    likeBtn?.addEventListener('click', () => {
      if (!currentProduct) return;

      isCurrentLiked = !isCurrentLiked;
      const likeIcon = document.getElementById('gamzaLikeIcon');
      const likesCountEl = document.getElementById('gamzaDetailLikesCount');
      const baseLikes = Number(currentProduct.likes || 0);

      if (isCurrentLiked) {
        likeBtn.classList.add('is-liked');
        if (likeIcon) likeIcon.textContent = '♥';
        const currentLikes = baseLikes + 1;
        if (likesCountEl) likesCountEl.textContent = `관심 ${currentLikes}`;
        showToast('🥔 관심 상품 목록에 담았습니다!');
      } else {
        likeBtn.classList.remove('is-liked');
        if (likeIcon) likeIcon.textContent = '♡';
        if (likesCountEl) likesCountEl.textContent = `관심 ${baseLikes}`;
        showToast('관심 상품 목록에서 해제되었습니다.');
      }

      // 외부 연동용 커스텀 이벤트
      window.dispatchEvent(
        new CustomEvent('gamza:like-toggle', {
          detail: {
            productId: currentProduct.id,
            isLiked: isCurrentLiked,
            product: currentProduct
          }
        })
      );
    });

    // 채팅 시작 버튼
    chatBtn?.addEventListener('click', () => {
      if (!currentProduct) return;

      const sellerNick = (currentProduct.seller && currentProduct.seller.nickname) || '판매자';
      showToast(`🥔 ${sellerNick}님과의 채팅방을 준비하고 있습니다!`);

      // 채팅 시작 커스텀 이벤트 발행 (추후 화면 간 연동 가능)
      window.dispatchEvent(
        new CustomEvent('gamza:open-chat', {
          detail: {
            productId: currentProduct.id,
            product: currentProduct,
            seller: currentProduct.seller
          }
        })
      );
    });
  }

  /**
   * 상품 상세 모달 열기
   * @param {Object} product - 상품 데이터 객체
   */
  function openProductDetail(product) {
    ensureDetailModalInDOM();

    if (!product) {
      console.warn('[GamzaDetail] 유효하지 않은 상품 데이터입니다.');
      return;
    }

    currentProduct = product;
    isCurrentLiked = Boolean(product.isLiked);

    const modal = document.getElementById('gamzaDetailModal');
    const imgEl = document.getElementById('gamzaDetailImage');
    const badgeEl = document.getElementById('gamzaDetailStatusBadge');
    const categoryEl = document.getElementById('gamzaDetailCategory');
    const timeEl = document.getElementById('gamzaDetailTime');
    const titleEl = document.getElementById('gamzaDetailTitle');
    const priceEl = document.getElementById('gamzaDetailPrice');
    const freeBadgeEl = document.getElementById('gamzaDetailFreeBadge');
    const miniPriceEl = document.getElementById('gamzaDetailMiniPrice');
    const locEl = document.getElementById('gamzaDetailLocation');
    const descEl = document.getElementById('gamzaDetailDescription');
    const likesEl = document.getElementById('gamzaDetailLikesCount');
    const chatsEl = document.getElementById('gamzaDetailChatsCount');

    // 판매자 엘리먼트
    const sellerImgEl = document.getElementById('gamzaDetailSellerImg');
    const sellerNameEl = document.getElementById('gamzaDetailSellerName');
    const sellerLocEl = document.getElementById('gamzaDetailSellerLocation');
    const sellerTempEl = document.getElementById('gamzaDetailSellerTemp');
    const mannerBarEl = document.getElementById('gamzaDetailMannerBar');

    // 관심 버튼 초기화
    const likeBtn = document.getElementById('gamzaDetailLikeBtn');
    const likeIcon = document.getElementById('gamzaLikeIcon');

    // 1. 이미지 설정
    if (imgEl) {
      imgEl.src = product.imageUrl || product.image || DEFAULT_PRODUCT_IMG;
      imgEl.alt = product.title || '감자 상품';
    }

    // 2. 상태 배지 설정
    if (badgeEl) {
      const status = product.status || '판매중';
      badgeEl.className = 'gamza-detail-status-badge';

      if (status === '예약중') {
        badgeEl.classList.add('status-reserved');
        badgeEl.textContent = '⏳ 예약중';
      } else if (status === '거래완료') {
        badgeEl.classList.add('status-completed');
        badgeEl.textContent = '✓ 거래완료';
      } else {
        badgeEl.classList.add('status-selling');
        badgeEl.textContent = '🥔 판매중';
      }
    }

    // 3. 메타 정보 (카테고리 & 시간)
    if (categoryEl) categoryEl.textContent = product.category || '기타';
    if (timeEl) timeEl.textContent = formatTime(product);

    // 4. 상품명
    if (titleEl) titleEl.textContent = product.title || '제목 없음';

    // 5. 가격 정보
    const formatted = formatPrice(product.price);
    if (priceEl) priceEl.textContent = formatted.text;
    if (miniPriceEl) miniPriceEl.textContent = formatted.text;

    if (freeBadgeEl) {
      freeBadgeEl.style.display = formatted.isFree ? 'inline-block' : 'none';
    }

    // 6. 거래 희망 위치
    if (locEl) {
      locEl.textContent = product.location || '판매자와 협의';
    }

    // 7. 상품 설명 (줄바꿈 보존)
    if (descEl) {
      descEl.textContent = product.description || '등록된 상품 설명이 없습니다.';
    }

    // 8. 통계 (관심, 채팅)
    const likesCount = Number(product.likes || 0);
    const chatsCount = Number(product.chats || 0);
    if (likesEl) likesEl.textContent = `관심 ${likesCount}`;
    if (chatsEl) chatsEl.textContent = `채팅 ${chatsCount}`;

    // 9. 판매자 정보
    const seller = product.seller || {};
    if (sellerImgEl) {
      sellerImgEl.src = seller.profileImg || DEFAULT_AVATAR_IMG;
    }
    if (sellerNameEl) {
      sellerNameEl.textContent = seller.nickname || '감자이웃';
    }
    if (sellerLocEl) {
      sellerLocEl.textContent = seller.location || product.location || '우리 동네';
    }

    const temp = typeof seller.temperature === 'number' ? seller.temperature : 36.5;
    if (sellerTempEl) {
      sellerTempEl.textContent = `${temp.toFixed(1)}℃`;
    }
    if (mannerBarEl) {
      const percentage = Math.min(Math.max((temp / 50) * 100, 10), 100);
      mannerBarEl.style.width = `${percentage}%`;
    }

    // 10. 관심 버튼 상태 반영
    if (likeBtn && likeIcon) {
      if (isCurrentLiked) {
        likeBtn.classList.add('is-liked');
        likeIcon.textContent = '♥';
      } else {
        likeBtn.classList.remove('is-liked');
        likeIcon.textContent = '♡';
      }
    }

    // 11. 모달 활성화 및 바디 스크롤 제어
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      // 스크롤 상단으로 초기화
      const scrollArea = modal.querySelector('.gamza-detail-scroll-area');
      if (scrollArea) scrollArea.scrollTop = 0;
    }

    // 모달 오픈 커스텀 이벤트
    window.dispatchEvent(
      new CustomEvent('gamza:detail-opened', {
        detail: product
      })
    );
  }

  /**
   * 상품 상세 모달 닫기
   */
  function closeProductDetail() {
    const modal = document.getElementById('gamzaDetailModal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    window.dispatchEvent(
      new CustomEvent('gamza:detail-closed', {
        detail: currentProduct
      })
    );
  }

  // 외부(타 화면)에서 커스텀 이벤트로 상세 열기 수신 지원
  window.addEventListener('gamza:open-detail', (e) => {
    if (e.detail) {
      openProductDetail(e.detail);
    }
  });

  // 화면 1 (part1_list.js)의 gamza:product-click 이벤트 수신 지원
  window.addEventListener('gamza:product-click', (e) => {
    if (e.detail && e.detail.product) {
      openProductDetail(e.detail.product);
    }
  });

  // 화면 1의 openProductDetailModal 호출과도 호환 연결
  root.openProductDetailModal = function (productId, product) {
    if (product) {
      openProductDetail(product);
    } else if (typeof productId === 'object') {
      openProductDetail(productId);
    }
  };

  // DOM 로드 완료 시 모달 주입 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureDetailModalInDOM);
  } else {
    ensureDetailModalInDOM();
  }

  return {
    openProductDetail,
    closeProductDetail,
    ensureDetailModalInDOM,
    formatPrice
  };
});
