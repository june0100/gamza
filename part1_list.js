/**
 * 감자 마켓 (Gamza Market) - 화면 1: 상품목록 렌더링 및 필터링 스크립트
 * 파일명: part1_list.js
 */

(function () {
  'use strict';

  // ========================================================
  // 1. 초기 더미 데이터 (Mock Products)
  // ========================================================
  const INITIAL_PRODUCTS = [
    {
      id: 'prod-001',
      title: 'M2 아이패드 프로 11인치 128GB 스페이스그레이 (배터리 99%)',
      category: '디지털 기기',
      price: 850000,
      location: '역삼1동',
      timeAgo: '15분 전',
      status: '판매중', // 판매중, 예약중, 거래완료
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
      description: '작년 말 구매 후 케이스 끼우고 영상 시청용으로만 사용하여 기스 하나 없는 특S급입니다.',
      likes: 12,
      chats: 5,
      isLiked: false,
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-002',
      title: '원목 원형 다이닝 식탁 테이블 (1000파이) + 체어 2개',
      category: '가구/인테리어',
      price: 180000,
      location: '서초4동',
      timeAgo: '1시간 전',
      status: '예약중',
      imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      description: '화이트오크 원목 소재로 튼튼하고 예쁩니다. 이사 가게 되어 급처분합니다. 직접 가져가셔야 합니다.',
      likes: 24,
      chats: 9,
      isLiked: true,
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-003',
      title: '바버(Barbour) 뷰포트 왁스 자켓 세이지 40사이즈',
      category: '의류',
      price: 220000,
      location: '논현동',
      timeAgo: '3시간 전',
      status: '판매중',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
      description: '정품 런던 직구 제품입니다. 3회 착용 후 보관중이라 왁스기 잘 남아있습니다.',
      likes: 8,
      chats: 3,
      isLiked: false,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-004',
      title: '드롱기 데디카 반자동 에스프레소 커피머신 EC680',
      category: '생활가전',
      price: 110000,
      location: '양재2동',
      timeAgo: '5시간 전',
      status: '거래완료',
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=600&q=80',
      description: '홈카페 입문용으로 유명한 모델입니다. 박스 풀구성품이며 세척 완료해두었습니다.',
      likes: 19,
      chats: 14,
      isLiked: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-005',
      title: '[미개봉 새책] 한강 작가 소설 3종 세트 (소년이온다/채식주의자/작별하지않는다)',
      category: '도서/티켓',
      price: 35000,
      location: '대치동',
      timeAgo: '어제',
      status: '판매중',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
      description: '선물 받았는데 이미 소장중인 책이라 미개봉 새 상태 그대로 감자마켓에 올립니다.',
      likes: 31,
      chats: 12,
      isLiked: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-006',
      title: '소니 WH-1000XM5 무선 노이즈 캔슬링 헤드폰 실버',
      category: '디지털 기기',
      price: 310000,
      location: '신사동',
      timeAgo: '2일 전',
      status: '판매중',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: '출퇴근 시 착용했습니다. 헤드밴드 커버 씌우고 써서 가죽 상태 아주 깨끗합니다.',
      likes: 42,
      chats: 8,
      isLiked: false,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-007',
      title: '감성 플랜테리어 몬스테라 델리시오사 토분 세트',
      category: '기타',
      price: 28000,
      location: '도곡1동',
      timeAgo: '3일 전',
      status: '판매중',
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      description: '새잎 잘 내고 건강하게 자란 몬스테라입니다. 이태리 토분 포함 가격입니다.',
      likes: 15,
      chats: 4,
      isLiked: false,
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-008',
      title: '빈티지 감성 LED 충전식 캠핑 랜턴 (황동 브론즈 컬러)',
      category: '기타',
      price: 45000,
      location: '반포본동',
      timeAgo: '4일 전',
      status: '예약중',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
      description: '캠핑 2회 사용 후 보관중입니다. 조도 다이얼 조절 가능하며 은은한 감성 불빛 납니다.',
      likes: 18,
      chats: 7,
      isLiked: false,
      createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'prod-009',
      title: '강아지 원목 식기 & 푹신한 마약방석 세트 (소형견용)',
      category: '반려동물 용품',
      price: 18000,
      location: '신사동',
      timeAgo: '5일 전',
      status: '판매중',
      imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80',
      description: '저희 집 강아지가 금방 커서 더 큰 방석으로 바꾸게 되어 내놓습니다. 커버 분리 세탁 완료했고 깨끗합니다.',
      likes: 21,
      chats: 9,
      isLiked: false,
      createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString()
    }
  ];

  // ========================================================
  // 2. 상태 관리 (State)
  // ========================================================
  const state = {
    products: [...INITIAL_PRODUCTS],
    currentCategory: '전체',
    searchKeyword: '',
    onlyAvailable: false,
    sortBy: 'latest' // latest, priceAsc, priceDesc
  };

  // ========================================================
  // 3. 유틸리티 함수
  // ========================================================

  /**
   * 숫자를 한국 원화 형식(예: 520,000원)으로 포맷팅
   */
  function formatPrice(price) {
    if (price === 0 || price === '0') return '나눔 🥔';
    const num = Number(price);
    if (isNaN(num)) return price;
    return `${num.toLocaleString('ko-KR')}원`;
  }

  /**
   * 판매 상태 배지 클래스 및 텍스트 반환
   */
  function getStatusBadge(status) {
    switch (status) {
      case '판매중':
        return { className: 'status-selling', label: '판매중' };
      case '예약중':
        return { className: 'status-reserved', label: '예약중' };
      case '거래완료':
        return { className: 'status-completed', label: '거래완료' };
      default:
        return { className: 'status-selling', label: status || '판매중' };
    }
  }

  // ========================================================
  // 4. 렌더링 함수
  // ========================================================

  /**
   * 필터 및 정렬이 적용된 상품 목록 가져오기
   */
  function getFilteredProducts() {
    let result = state.products.filter((product) => {
      // 1) 카테고리 필터
      if (state.currentCategory !== '전체' && product.category !== state.currentCategory) {
        return false;
      }

      // 2) '거래가능만 보기' 필터 (판매완료/거래완료 제외)
      if (state.onlyAvailable && product.status === '거래완료') {
        return false;
      }

      // 3) 검색어 필터 (상품명, 위치, 카테고리 검색)
      if (state.searchKeyword.trim() !== '') {
        const keyword = state.searchKeyword.toLowerCase().trim();
        const matchTitle = product.title.toLowerCase().includes(keyword);
        const matchLocation = (product.location || '').toLowerCase().includes(keyword);
        const matchCategory = (product.category || '').toLowerCase().includes(keyword);
        if (!matchTitle && !matchLocation && !matchCategory) {
          return false;
        }
      }

      return true;
    });

    // 4) 정렬 적용
    if (state.sortBy === 'priceAsc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (state.sortBy === 'priceDesc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
      // latest: createdAt 기준 내림차순
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }

  /**
   * 상품 카드 그리드 HTML 렌더링
   */
  function renderProductGrid() {
    const gridContainer = document.getElementById('gamzaProductGrid');
    const countDisplay = document.getElementById('gamzaProductCount');
    if (!gridContainer) return;

    const filtered = getFilteredProducts();

    // 카운트 업데이트
    if (countDisplay) {
      countDisplay.innerHTML = `총 <strong>${filtered.length}</strong>개의 감자`;
    }

    // 결과 없을 시 Empty State 출력
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="gamza-empty-state">
          <div class="gamza-empty-icon">🥔</div>
          <h3 class="gamza-empty-title">찾으시는 감자가 없어요</h3>
          <p class="gamza-empty-desc">검색어 철자를 확인하시거나 필터 조건을 변경해보세요.</p>
          <button type="button" class="gamza-empty-reset-btn" id="gamzaResetFilterBtn">
            전체 상품 보러가기
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('gamzaResetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
      }
      return;
    }

    // 카드 목록 HTML 생성
    const cardsHTML = filtered
      .map((item) => {
        const badge = getStatusBadge(item.status);
        const isCompleted = item.status === '거래완료';
        const likeClass = item.isLiked ? 'is-active' : '';

        return `
        <article class="gamza-card ${isCompleted ? 'is-completed' : ''}" data-id="${item.id}" tabindex="0" role="button" aria-label="${item.title}">
          <!-- 썸네일 영역 -->
          <div class="gamza-card-thumb-wrap">
            <img 
              class="gamza-card-thumb" 
              src="${item.imageUrl || ''}" 
              alt="${item.title}" 
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'"
            />
            <div class="gamza-card-completed-overlay">거래완료</div>
            <button 
              type="button" 
              class="gamza-card-like-btn ${likeClass}" 
              data-id="${item.id}" 
              aria-label="찜하기"
              title="관심 상품 등록"
            >
              ${item.isLiked ? '❤️' : '🤍'}
            </button>
          </div>

          <!-- 카드 본문 -->
          <div class="gamza-card-body">
            <div class="gamza-card-top-meta">
              <span class="gamza-status-badge ${badge.className}">${badge.label}</span>
              <span class="gamza-card-category-tag">${item.category || '기타'}</span>
            </div>

            <h3 class="gamza-card-title" title="${item.title}">${item.title}</h3>

            <div class="gamza-card-sub-meta">
              <span>${item.location || '동네 미지정'}</span>
              <span class="meta-dot">·</span>
              <span>${item.timeAgo || '방금 전'}</span>
            </div>

            <div class="gamza-card-bottom">
              <span class="gamza-card-price">${formatPrice(item.price)}</span>
              <div class="gamza-card-stats">
                ${
                  item.chats > 0
                    ? `<span class="gamza-card-stat-item" title="채팅 ${item.chats}개">💬 ${item.chats}</span>`
                    : ''
                }
                ${
                  item.likes > 0
                    ? `<span class="gamza-card-stat-item" title="관심 ${item.likes}명">❤️ ${item.likes}</span>`
                    : ''
                }
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    gridContainer.innerHTML = cardsHTML;

    // 카드 및 찜 버튼 이벤트 바인딩
    attachCardEvents(gridContainer);
  }

  // ========================================================
  // 5. 이벤트 핸들링 (Interaction)
  // ========================================================

  /**
   * 상품 카드 클릭 및 내부 찜 버튼 이벤트 바인딩
   */
  function attachCardEvents(container) {
    const cards = container.querySelectorAll('.gamza-card');
    cards.forEach((card) => {
      const id = card.getAttribute('data-id');

      // 카드 클릭 핸들러 (상세 팝업 연결)
      card.addEventListener('click', (e) => {
        // 찜 버튼을 누른 경우 상세 이동 방지
        if (e.target.closest('.gamza-card-like-btn')) {
          return;
        }
        handleProductCardClick(id);
      });

      // 키보드 접근성 (Enter/Space 지원)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('.gamza-card-like-btn')) {
            e.preventDefault();
            handleProductCardClick(id);
          }
        }
      });
    });

    // 찜 버튼 클릭 토글
    const likeButtons = container.querySelectorAll('.gamza-card-like-btn');
    likeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleLikeProduct(id);
      });
    });
  }

  /**
   * 상품 카드 클릭 시 실행되는 핸들러
   * 외부 화면 2(상세보기 팝업 모달)와 연결할 수 있도록 커스텀 이벤트 및 콜백 지원
   */
  function handleProductCardClick(productId) {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    console.log(`[Gamza Market] 상품 카드 클릭 - ID: ${productId}, 제목: ${product.title}`);

    // 전역 커스텀 이벤트 발생 (상세 모달 개발자가 손쉽게 수신 가능)
    window.dispatchEvent(
      new CustomEvent('gamza:product-click', {
        detail: {
          productId: productId,
          product: product
        }
      })
    );

    // 상세 보기 전역 함수가 등록되어 있을 경우 자동 호출 (예: 화면 2 모달)
    if (typeof window.openProductDetailModal === 'function') {
      window.openProductDetailModal(productId, product);
    } else if (typeof window.onProductClick === 'function') {
      window.onProductClick(productId, product);
    } else {
      // 아직 상세 모달이 없는 경우 피드백 안내 (토스트)
      showCardFeedbackToast(product);
    }
  }

  /**
   * 찜(관심) 토글
   */
  function toggleLikeProduct(productId) {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    product.isLiked = !product.isLiked;
    product.likes = product.isLiked ? product.likes + 1 : Math.max(0, product.likes - 1);

    renderProductGrid();
  }

  /**
   * 안내 피드백 토스트 (화면 2 연결 전 가이드)
   */
  function showCardFeedbackToast(product) {
    let toast = document.getElementById('gamzaListToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gamzaListToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #3D2B1F;
        color: #FAF7F2;
        padding: 12px 20px;
        border-radius: 9999px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        font-size: 0.92rem;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>🥔</span> [${product.title}] 상세 정보를 확인합니다. (ID: ${product.id})`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
  }

  /**
   * 전체 필터 및 검색어 초기화
   */
  function resetAllFilters() {
    state.currentCategory = '전체';
    state.searchKeyword = '';
    state.onlyAvailable = false;
    state.sortBy = 'latest';

    // UI 요소 상태 동기화
    const searchInput = document.getElementById('gamzaSearchInput');
    const clearBtn = document.getElementById('gamzaSearchClearBtn');
    const toggleInput = document.getElementById('gamzaAvailableToggle');
    const sortSelect = document.getElementById('gamzaSortSelect');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    if (toggleInput) toggleInput.checked = false;
    if (sortSelect) sortSelect.value = 'latest';

    updateCategoryActiveState();
    renderProductGrid();
  }

  /**
   * 카테고리 칩 활성화 UI 갱신
   */
  function updateCategoryActiveState() {
    const chips = document.querySelectorAll('.gamza-category-chip');
    chips.forEach((chip) => {
      const cat = chip.getAttribute('data-category');
      if (cat === state.currentCategory) {
        chip.classList.add('is-active');
      } else {
        chip.classList.remove('is-active');
      }
    });
  }

  // ========================================================
  // 6. 이벤트 바인딩 초기화
  // ========================================================
  function initEvents() {
    // 1) 검색창 이벤트 (실시간 입력 필터링 & 삭제 버튼)
    const searchInput = document.getElementById('gamzaSearchInput');
    const searchClearBtn = document.getElementById('gamzaSearchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchKeyword = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.style.display = e.target.value.length > 0 ? 'inline-block' : 'none';
        }
        renderProductGrid();
      });
    }

    if (searchClearBtn && searchInput) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchKeyword = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        renderProductGrid();
      });
    }

    // 2) 카테고리 칩 클릭
    const categoryChips = document.querySelectorAll('.gamza-category-chip');
    categoryChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cat = chip.getAttribute('data-category');
        state.currentCategory = cat;
        updateCategoryActiveState();
        renderProductGrid();
      });
    });

    // 3) '거래가능만 보기' 토글 스위치
    const toggleInput = document.getElementById('gamzaAvailableToggle');
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        state.onlyAvailable = e.target.checked;
        renderProductGrid();
      });
    }

    // 4) 정렬 선택
    const sortSelect = document.getElementById('gamzaSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProductGrid();
      });
    }

    // 5) [글쓰기] 버튼 클릭 연동
    const writeBtn = document.getElementById('gamzaWriteBtn');
    if (writeBtn) {
      writeBtn.addEventListener('click', () => {
        if (typeof window.openWriteModal === 'function') {
          window.openWriteModal();
        } else {
          // 화면 3 모달이 없을 경우 커스텀 이벤트 디스패치
          window.dispatchEvent(new CustomEvent('gamza:open-write'));
          alert('내 감자 팔기(글쓰기) 화면을 호출합니다. 🥔');
        }
      });
    }

    // 6) [로그인] 버튼 클릭 (자리 마련용)
    const loginBtn = document.getElementById('gamzaLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        alert('감자마켓 로그인 기능은 준비 중입니다. 🥔✨');
      });
    }

    // 7) 로고 클릭 시 전체 리셋 및 스크롤 최상단
    const logoBtn = document.getElementById('gamzaLogoBtn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetAllFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 8) 화면 3(글쓰기 모달)에서 등록된 신규 상품 수신 연동!
    window.addEventListener('gamza:product-created', (e) => {
      if (e.detail) {
        addNewProduct(e.detail);
      }
    });
  }

  // ========================================================
  // 7. 외부 연동용 공개 API
  // ========================================================

  /**
   * 새 상품을 목록 맨 앞에 추가하고 즉시 리렌더링
   */
  function addNewProduct(productData) {
    const formattedProduct = {
      id: productData.id || `prod-${Date.now()}`,
      title: productData.title,
      category: productData.category || '기타',
      price: Number(productData.price) || 0,
      location: productData.location || '내 동네',
      timeAgo: '방금 전',
      status: productData.status || '판매중',
      imageUrl: productData.imageUrl || '',
      description: productData.description || '',
      likes: productData.likes || 0,
      chats: productData.chats || 0,
      isLiked: false,
      createdAt: productData.createdAt || new Date().toISOString()
    };

    // 최신 등록 상품을 목록 맨 앞에 추가
    state.products.unshift(formattedProduct);

    // 필터 초기화(전체 보기로 전환하여 방금 등록한 상품이 바로 보이도록 배려)
    state.currentCategory = '전체';
    state.searchKeyword = '';
    updateCategoryActiveState();

    const searchInput = document.getElementById('gamzaSearchInput');
    if (searchInput) searchInput.value = '';

    renderProductGrid();

    // 등록된 카드 하이라이트 효과
    setTimeout(() => {
      const newCard = document.querySelector(`.gamza-card[data-id="${formattedProduct.id}"]`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        newCard.style.outline = '3px solid var(--gamza-brown)';
        newCard.style.transition = 'outline 0.5s ease';
        setTimeout(() => {
          newCard.style.outline = 'none';
        }, 1800);
      }
    }, 150);
  }

  /**
   * 화면 1 초기화 함수
   */
  function initProductList() {
    initEvents();
    renderProductGrid();
  }

  // DOM 로드 완료 시 초기 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductList);
  } else {
    initProductList();
  }

  // 전역 객체 노출 (다른 파트 모듈에서 호출 가능)
  window.GamzaList = {
    init: initProductList,
    render: renderProductGrid,
    addProduct: addNewProduct,
    getProducts: () => [...state.products],
    resetFilters: resetAllFilters
  };

  // 기존 파트3의 콜백 방식으로도 호환
  if (typeof window.onProductCreated === 'undefined') {
    window.onProductCreated = function (newProd) {
      addNewProduct(newProd);
    };
  }
})();
