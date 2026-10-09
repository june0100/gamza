/**
 * 감자 마켓 (Gamza Market) - 메인 애플리케이션 스크립트 (app.js)
 * - 초기 가짜 상품 6개 데이터
 * - [화면 1] 상품목록 렌더링, 검색, 카테고리 칩 필터, '거래가능만 보기' 토글
 * - [화면 2] 상세 팝업 모달 열기/닫기 및 데이터 바인딩
 * - [화면 3] 글쓰기 모달 열기/닫기 및 신규 상품 등록 (새로고침 전까지 유지)
 */

(function () {
  'use strict';

  // ========================================================
  // 1. 초기 가짜 상품 데이터 (정확히 6개)
  // ========================================================
  const INITIAL_PRODUCTS = [
    {
      id: 1,
      title: "아이패드 에어 5세대 64GB Wi-Fi 스타라이트",
      category: "디지털 기기",
      price: 520000,
      location: "역삼동",
      time: "10분 전",
      status: "판매중", // 판매중 | 예약중 | 거래완료
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      description: "배터리 효율 94%이며 케이스 끼우고 사용하여 기스 하나도 없이 깨끗합니다! 박스 및 정품 충전기 풀세트로 함께 드려요. 직거래 선호합니다.",
      seller: {
        nickname: "햇감자마스터",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        location: "강남구 역삼동",
        mannerTemp: "38.5℃"
      }
    },
    {
      id: 2,
      title: "원목 미니 사이드 테이블 (감성 인테리어)",
      category: "가구/인테리어",
      price: 25000,
      location: "서초동",
      time: "32분 전",
      status: "예약중",
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&auto=format&fit=crop&q=80",
      description: "이사 가면서 가구 정리차 처분합니다. 소파 옆이나 침대 옆에 무드등과 함께 두기 딱 좋은 튼튼한 원목 협탁이에요. 흔들림 없습니다.",
      seller: {
        nickname: "포슬포슬감자",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        location: "서초구 서초동",
        mannerTemp: "41.2℃"
      }
    },
    {
      id: 3,
      title: "파타고니아 레트로X 후리스 자켓 M사이즈",
      category: "의류",
      price: 110000,
      location: "방배동",
      time: "1시간 전",
      status: "판매중",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
      description: "작년에 백화점 매장에서 정품으로 구매했고 실착용 3회 미만입니다. 털 뭉침이나 오염 전혀 없고 상태 최상입니다. 드라이클리닝 완료!",
      seller: {
        nickname: "감자밭파수꾼",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        location: "서초구 방배동",
        mannerTemp: "36.8℃"
      }
    },
    {
      id: 4,
      title: "드롱기 데디카 반자동 에스프레소 머신",
      category: "생활가전",
      price: 135000,
      location: "대치동",
      time: "2시간 전",
      status: "거래완료",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800&auto=format&fit=crop&q=80",
      description: "홈카페 입문용으로 아주 만족스럽게 사용했던 머신입니다. 스팀 피처, 탬퍼, 바텀리스 포타필터까지 사은품으로 챙겨드립니다. 정상 작동합니다.",
      seller: {
        nickname: "커피향감자",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        location: "강남구 대치동",
        mannerTemp: "39.0℃"
      }
    },
    {
      id: 5,
      title: "불편한 편의점 1, 2권 세트 (상태 최상)",
      category: "도서/티켓",
      price: 16000,
      location: "삼성동",
      time: "4시간 전",
      status: "판매중",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
      description: "정독 후 책장에 깔끔하게 보관한 책입니다. 밑줄, 구김, 변색 전혀 없어서 새 책 느낌입니다. 두 권 일괄 판매합니다.",
      seller: {
        nickname: "책읽는감자",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        location: "강남구 삼성동",
        mannerTemp: "37.5℃"
      }
    },
    {
      id: 6,
      title: "소니 헤드폰 WH-1000XM4 실버",
      category: "디지털 기기",
      price: 210000,
      location: "양재동",
      time: "6시간 전",
      status: "예약중",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      description: "노이즈 캔슬링 정상 작동하며, 배터리도 매우 짱짱합니다. 전용 하드 케이스와 비행기용 어댑터, AUX 케이블 풀박스로 드립니다.",
      seller: {
        nickname: "노캔감자",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
        location: "서초구 양재동",
        mannerTemp: "42.0℃"
      }
    }
  ];

  // ========================================================
  // Supabase 클라이언트 설정 (Gamza 프로젝트)
  // ========================================================
  const SUPABASE_URL = "https://tcqpheyvipotnvtjulgw.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcXBoZXl2aXBvdG52dGp1bGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1MTE5MDAsImV4cCI6MjEwNzA4NzkwMH0.qq3ZejYNKCsYo-xfeO6Tj7FL8gw_Dqgy9zMc57ZJ8CU";
  let supabase = null;

  if (window.supabase) {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("🥔 Supabase 클라이언트가 성공적으로 연결되었습니다.");
    } catch (e) {
      console.warn("Supabase 클라이언트 초기화 오류:", e);
    }
  }

  // 앱 상태 관리
  let products = [];
  let currentCategory = "전체";
  let searchQuery = "";
  let onlyAvailable = false;
  let currentDetailProduct = null;
  let isDetailLiked = false;
  let editingProductId = null; // 수정 모드일 때 대상 상품 ID (신규 등록 시 null)

  // 인증(Auth) 상태 관리
  let currentUser = null;
  let currentProfile = null;
  let authMode = "login"; // "login" | "signup"
  let pendingOpenWriteModal = false; // 로그인 후 글쓰기 모달 자동 오픈 플래그

  // 기본 감자 아바타 SVG
  const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23F4EBE2' stroke='%238D5B4C' stroke-width='3'/><ellipse cx='50' cy='48' rx='24' ry='18' fill='%23DDB892'/><circle cx='43' cy='46' r='2.5' fill='%23583329'/><circle cx='57' cy='46' r='2.5' fill='%23583329'/><path d='M 45 53 Q 50 57 55 53' stroke='%23583329' stroke-width='2' fill='none' stroke-linecap='round'/></svg>";

  // 기본 감자 상품 이미지 SVG
  const DEFAULT_PRODUCT_IMG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='%23FAF7F2'/><g transform='translate(170, 70)'><ellipse cx='130' cy='110' rx='100' ry='75' fill='%23E2B170' stroke='%238D5B4C' stroke-width='6'/><circle cx='105' cy='105' r='5' fill='%23583329'/><circle cx='155' cy='105' r='5' fill='%23583329'/><path d='M 118 128 Q 130 142 142 128' stroke='%23583329' stroke-width='4' fill='none' stroke-linecap='round'/></g><text x='300' y='300' font-family='sans-serif' font-size='20' fill='%238D5B4C' font-weight='bold' text-anchor='middle'>🥔 감자 마켓 상품 이미지</text></svg>";

  // ========================================================
  // 2. DOM 요소 참조
  // ========================================================
  const productGridEl = document.getElementById("productGrid");
  const productCountEl = document.getElementById("productCount");
  const searchInputEl = document.getElementById("searchInput");
  const searchClearBtnEl = document.getElementById("searchClearBtn");
  const availableToggleEl = document.getElementById("availableToggle");
  const categoryChips = document.querySelectorAll(".gamza-cat-chip");

  // 상세 모달 DOM
  const detailModalEl = document.getElementById("detailModal");
  const detailCloseBtn = document.getElementById("detailCloseBtn");
  const detailImageEl = document.getElementById("detailImage");
  const detailBadgeEl = document.getElementById("detailBadge");
  const ownerStatusBox = document.getElementById("ownerStatusBox");
  const ownerStatusBtns = document.querySelectorAll(".gamza-status-btn");
  const detailCategoryEl = document.getElementById("detailCategory");
  const detailTitleEl = document.getElementById("detailTitle");
  const detailLocationEl = document.getElementById("detailLocation");
  const detailTimeEl = document.getElementById("detailTime");
  const detailPriceEl = document.getElementById("detailPrice");
  const detailDescEl = document.getElementById("detailDesc");
  const sellerAvatarEl = document.getElementById("sellerAvatar");
  const sellerNameEl = document.getElementById("sellerName");
  const sellerRegionEl = document.getElementById("sellerRegion");
  const sellerTempEl = document.getElementById("sellerTemp");
  const detailBuyerActions = document.getElementById("detailBuyerActions");
  const detailOwnerActions = document.getElementById("detailOwnerActions");
  const detailLikeBtn = document.getElementById("detailLikeBtn");
  const detailChatBtn = document.getElementById("detailChatBtn");
  const detailEditBtn = document.getElementById("detailEditBtn");
  const detailDeleteBtn = document.getElementById("detailDeleteBtn");

  // 글쓰기 모달 DOM
  const writeModalEl = document.getElementById("writeModal");
  const writeModalHeading = document.getElementById("writeModalHeading");
  const writeBtnHeader = document.getElementById("writeBtnHeader");
  const writeCloseBtn = document.getElementById("writeCloseBtn");
  const writeCancelBtn = document.getElementById("writeCancelBtn");
  const writeSubmitBtn = document.getElementById("writeSubmitBtn");
  const writeForm = document.getElementById("writeForm");
  const writeImageUrlInput = document.getElementById("writeImageUrl");
  const writeImageFileInput = document.getElementById("writeImageFile");
  const writeImagePreview = document.getElementById("writeImagePreview");
  const writePriceInput = document.getElementById("writePrice");
  const loginBtnHeader = document.getElementById("loginBtnHeader");
  const logoBtn = document.getElementById("logoBtn");

  // 헤더 사용자 메뉴 (로그인 후)
  const userMenuHeader = document.getElementById("userMenuHeader");
  const userNicknameText = document.getElementById("userNicknameText");
  const logoutBtnHeader = document.getElementById("logoutBtnHeader");

  // 로그인/회원가입 모달 DOM
  const authModalEl = document.getElementById("authModal");
  const authCloseBtn = document.getElementById("authCloseBtn");
  const authForm = document.getElementById("authForm");
  const authModalHeading = document.getElementById("authModalHeading");
  const authModalDesc = document.getElementById("authModalDesc");
  const tabLoginBtn = document.getElementById("tabLoginBtn");
  const tabSignupBtn = document.getElementById("tabSignupBtn");
  const authNicknameField = document.getElementById("authNicknameField");
  const authNicknameInput = document.getElementById("authNickname");
  const authEmailInput = document.getElementById("authEmail");
  const authPasswordInput = document.getElementById("authPassword");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const authErrorMsg = document.getElementById("authErrorMsg");
  const authToggleText = document.getElementById("authToggleText");
  const authToggleLink = document.getElementById("authToggleLink");

  // ========================================================
  // 3. 유틸리티 함수
  // ========================================================
  function formatPrice(price) {
    if (price === 0 || price === "0") return "무료나눔 (0원)";
    return Number(price).toLocaleString("ko-KR") + "원";
  }

  function formatRelativeTime(dateString) {
    if (!dateString) return "방금 전";
    const now = new Date();
    const date = new Date(dateString);
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return "방금 전";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 7) return `${diffDay}일 전`;
    return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
  }

  function showToast(message) {
    let container = document.getElementById("gamzaToastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "gamzaToastContainer";
      container.className = "gamza-toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "gamza-toast";
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  function getStatusBadgeHTML(status) {
    let badgeClass = "status-selling";
    if (status === "예약중") badgeClass = "status-reserved";
    else if (status === "거래완료") badgeClass = "status-completed";
    return `<span class="gamza-badge ${badgeClass}">${status}</span>`;
  }

  // 게시글 작성자 여부 판별 함수 (본인이 작성한 글인지 체크)
  function isProductOwner(product) {
    if (!product || !currentUser) return false;
    // 1. seller_id 와 현재 로그인 유저 id 비교
    if (product.seller_id && product.seller_id === currentUser.id) return true;
    if (product.seller && product.seller.id && product.seller.id === currentUser.id) return true;
    // 2. 닉네임 기준 비교 (사용자 프로필 닉네임)
    const activeNick = currentProfile?.nickname || currentUser.user_metadata?.nickname;
    if (activeNick && product.seller && product.seller.nickname === activeNick) return true;
    return false;
  }

  // ========================================================
  // Supabase Auth 및 사용자 프로필 관리
  // ========================================================
  function showAuthError(msg) {
    if (!authErrorMsg) return;
    authErrorMsg.textContent = msg;
    authErrorMsg.style.display = "block";
  }

  function hideAuthError() {
    if (!authErrorMsg) return;
    authErrorMsg.textContent = "";
    authErrorMsg.style.display = "none";
  }

  function setAuthMode(mode) {
    authMode = mode;
    hideAuthError();

    if (mode === "login") {
      authModalHeading.textContent = "감자 마켓 로그인";
      authModalDesc.textContent = "우리 동네 이웃과 따뜻한 중고거래를 시작해보세요!";
      tabLoginBtn.classList.add("is-active");
      tabLoginBtn.setAttribute("aria-selected", "true");
      tabSignupBtn.classList.remove("is-active");
      tabSignupBtn.setAttribute("aria-selected", "false");
      authNicknameField.style.display = "none";
      authNicknameInput.required = false;
      authSubmitBtn.innerHTML = "🥔 로그인";
      authToggleText.textContent = "아직 감자 마켓 계정이 없으신가요?";
      authToggleLink.textContent = "회원가입하기";
      setTimeout(() => authEmailInput && authEmailInput.focus(), 100);
    } else {
      authModalHeading.textContent = "감자 마켓 회원가입";
      authModalDesc.textContent = "새로운 감자 이웃이 되어 포슬포슬한 거래를 즐겨보세요!";
      tabSignupBtn.classList.add("is-active");
      tabSignupBtn.setAttribute("aria-selected", "true");
      tabLoginBtn.classList.remove("is-active");
      tabLoginBtn.setAttribute("aria-selected", "false");
      authNicknameField.style.display = "flex";
      authNicknameInput.required = true;
      authSubmitBtn.innerHTML = "🥔 회원가입 완료";
      authToggleText.textContent = "이미 계정이 있으신가요?";
      authToggleLink.textContent = "로그인하기";
      setTimeout(() => authNicknameInput && authNicknameInput.focus(), 100);
    }
  }

  function openAuthModal(mode = "login") {
    setAuthMode(mode);
    authModalEl.classList.add("is-active");
    document.body.classList.add("modal-open");
  }

  function closeAuthModal() {
    authModalEl.classList.remove("is-active");
    document.body.classList.remove("modal-open");
    hideAuthError();
    authForm.reset();
  }

  async function fetchUserProfile(userId) {
    if (!supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn("프로필 조회 오류:", error);
        return null;
      }
      return data;
    } catch (e) {
      console.warn("프로필 조회 예외:", e);
      return null;
    }
  }

  function updateAuthUI(isLoggedIn) {
    if (isLoggedIn && currentUser) {
      // 요구사항 2: 로그인 후 [로그인] 버튼을 숨김 처리, [닉네임]과 [로그아웃] 버튼만 표시
      loginBtnHeader.style.display = "none";
      userMenuHeader.style.display = "flex";
      const nickname = currentProfile?.nickname || currentUser.user_metadata?.nickname || "감자이웃";
      userNicknameText.textContent = nickname;
    } else {
      // 요구사항 2: 로그인 전 [로그인] 버튼만 표시
      loginBtnHeader.style.display = "inline-flex";
      userMenuHeader.style.display = "none";
    }

    // 상세 모달이 열려있는 경우 작성자 버튼 상태 즉시 재반영
    if (currentDetailProduct && detailModalEl.classList.contains("is-active")) {
      openDetailModal(currentDetailProduct);
    }
  }

  async function initAuth() {
    if (!supabase) return;

    try {
      // 1. 기존 세션 확인
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.warn("세션 확인 오류:", error);
      }
      if (session?.user) {
        currentUser = session.user;
        currentProfile = await fetchUserProfile(currentUser.id);
        updateAuthUI(true);
      } else {
        updateAuthUI(false);
      }

      // 2. Auth 상태 변경 리스너
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("🥔 Supabase Auth 상태 변경:", event, session?.user?.email);
        if (session?.user) {
          currentUser = session.user;
          currentProfile = await fetchUserProfile(currentUser.id);
          updateAuthUI(true);
        } else {
          currentUser = null;
          currentProfile = null;
          updateAuthUI(false);
        }
      });
    } catch (e) {
      console.warn("Auth 초기화 오류:", e);
      updateAuthUI(false);
    }
  }

  // ========================================================
  // Supabase 데이터 조회 및 실시간 연동
  // ========================================================
  async function loadProducts(isSilent = false) {
    if (!isSilent) {
      productGridEl.innerHTML = `
        <div class="gamza-empty-state">
          <div class="gamza-empty-icon" style="display:inline-block; animation: pulse 1s infinite alternate;">🥔</div>
          <h3 class="gamza-empty-title">수파베이스에서 감자 목록을 불러오는 중...</h3>
          <p class="gamza-empty-desc">잠시만 기다려주세요.</p>
        </div>
      `;
      productCountEl.innerHTML = `수파베이스 연결 중...`;
    }

    if (!supabase) {
      console.warn("Supabase 클라이언트가 로드되지 않아 초기 데이터를 사용합니다.");
      products = [...INITIAL_PRODUCTS];
      renderProductList();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase 데이터 조회 오류:", error);
        showToast("⚠️ 데이터 조회 중 오류가 발생했습니다.");
        if (products.length === 0) products = [...INITIAL_PRODUCTS];
      } else if (data && data.length > 0) {
        products = data.map((item) => ({
          id: item.id,
          seller_id: item.seller_id,
          title: item.title,
          category: item.category,
          price: item.price,
          location: item.location,
          time: formatRelativeTime(item.created_at),
          status: item.status,
          image: item.image_url || DEFAULT_PRODUCT_IMG,
          description: item.description || "",
          likes_count: item.likes_count || 0,
          seller: {
            id: item.seller_id,
            nickname: item.profiles?.nickname || "감자이웃",
            avatar: item.profiles?.avatar_url || DEFAULT_AVATAR,
            location: item.profiles?.region || item.location,
            mannerTemp: item.profiles?.manner_temp ? `${item.profiles.manner_temp}℃` : "36.5℃"
          }
        }));
      } else {
        products = [];
      }
    } catch (err) {
      console.error("Supabase 로드 예외:", err);
      if (products.length === 0) products = [...INITIAL_PRODUCTS];
    } finally {
      renderProductList();
    }
  }

  // Supabase Realtime 구독 (다른 창에서 변경되어도 실시간 반영)
  function initRealtime() {
    if (!supabase) return;
    try {
      supabase
        .channel('public:products')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
          console.log('🥔 Supabase 실시간 데이터 변경 감지:', payload);
          loadProducts(true);
        })
        .subscribe();
    } catch (err) {
      console.warn("Realtime 구독 설정 실패:", err);
    }
  }

  // ========================================================
  // [화면 1] 상품목록 렌더링 & 필터링
  // ========================================================
  function getFilteredProducts() {
    return products.filter((item) => {
      const isCompleted = item.status && (item.status.trim() === "거래완료" || item.status.trim() === "거래 완료");

      // 카테고리 필터
      if (currentCategory !== "전체" && item.category !== currentCategory) {
        return false;
      }
      // '거래가능만 보기' 토글 (거래완료 상품 제외)
      if (onlyAvailable && isCompleted) {
        return false;
      }
      // 검색어 필터
      if (searchQuery.trim() !== "") {
        const query = searchQuery.trim().toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchDesc = item.description ? item.description.toLowerCase().includes(query) : false;
        if (!matchTitle && !matchLoc && !matchDesc) return false;
      }
      return true;
    });
  }

  function renderProductList() {
    const filtered = getFilteredProducts();
    productCountEl.innerHTML = `총 <strong>${filtered.length}</strong>개의 감자`;

    if (filtered.length === 0) {
      productGridEl.innerHTML = `
        <div class="gamza-empty-state">
          <div class="gamza-empty-icon">🥔💨</div>
          <h3 class="gamza-empty-title">찾으시는 감자가 없어요</h3>
          <p class="gamza-empty-desc">검색어나 카테고리 필터를 변경해보세요.</p>
        </div>
      `;
      return;
    }

    productGridEl.innerHTML = filtered.map((item) => {
      const isCompleted = item.status && (item.status.trim() === "거래완료" || item.status.trim() === "거래 완료");
      return `
        <article class="gamza-card ${isCompleted ? 'is-completed' : ''}" data-id="${item.id}" tabindex="0" role="button" aria-label="${item.title}">
          <div class="gamza-card-thumb">
            <img src="${item.image || DEFAULT_PRODUCT_IMG}" alt="${item.title}" onerror="this.src='${DEFAULT_PRODUCT_IMG}'" loading="lazy" />
          </div>
          <div class="gamza-card-body">
            <div class="gamza-card-header-row">
              ${getStatusBadgeHTML(item.status)}
              <span class="gamza-card-seller-tag" title="작성자: ${item.seller.nickname}">🥔 ${item.seller.nickname}</span>
            </div>
            <h3 class="gamza-card-title">${item.title}</h3>
            <div class="gamza-card-meta">
              <span>📍 ${item.location}</span>
              <span class="gamza-card-meta-dot">•</span>
              <span>${item.time}</span>
            </div>
            <div class="gamza-card-price">${formatPrice(item.price)}</div>
          </div>
        </article>
      `;
    }).join("");

    // 카드 클릭 이벤트 바인딩
    productGridEl.querySelectorAll(".gamza-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id, 10);
        const found = products.find((p) => p.id === id);
        if (found) openDetailModal(found);
      });
      // 키보드 접근성 엔터 지원
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = parseInt(card.dataset.id, 10);
          const found = products.find((p) => p.id === id);
          if (found) openDetailModal(found);
        }
      });
    });
  }

  // ========================================================
  // [화면 2] 상세 팝업 (모달) 로직
  // ========================================================
  function openDetailModal(product) {
    currentDetailProduct = product;
    isDetailLiked = false;

    // 모달 데이터 채우기
    detailImageEl.src = product.image || DEFAULT_PRODUCT_IMG;
    detailImageEl.onerror = () => { detailImageEl.src = DEFAULT_PRODUCT_IMG; };

    // 작성자 본인 확인
    const isOwner = isProductOwner(product);

    // 판매 상태 배지 클래스 및 텍스트
    let badgeClass = "status-selling";
    if (product.status === "예약중") badgeClass = "status-reserved";
    else if (product.status === "거래완료") badgeClass = "status-completed";
    detailBadgeEl.className = `gamza-badge ${badgeClass}`;
    detailBadgeEl.textContent = product.status;

    if (isOwner) {
      detailBadgeEl.title = "클릭하여 판매 상태 변경 (판매중 ➔ 예약중 ➔ 거래완료)";
      detailBadgeEl.style.cursor = "pointer";
      // 작성자 전용 UI 활성화
      if (ownerStatusBox) ownerStatusBox.style.display = "flex";
      if (detailOwnerActions) detailOwnerActions.style.display = "flex";
      if (detailBuyerActions) detailBuyerActions.style.display = "none";

      // 상태 변경 버튼 활성화 상태 표시
      ownerStatusBtns.forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.status === product.status);
      });
    } else {
      detailBadgeEl.title = "";
      detailBadgeEl.style.cursor = "default";
      // 일반 방문자용 UI 활성화
      if (ownerStatusBox) ownerStatusBox.style.display = "none";
      if (detailOwnerActions) detailOwnerActions.style.display = "none";
      if (detailBuyerActions) detailBuyerActions.style.display = "flex";
    }

    // 카테고리, 제목, 판매위치, 업로드시간, 가격, 상품설명
    detailCategoryEl.textContent = product.category;
    detailTitleEl.textContent = product.title;
    detailLocationEl.textContent = product.location;
    detailTimeEl.textContent = product.time;
    detailPriceEl.textContent = formatPrice(product.price);
    detailDescEl.textContent = product.description || "등록된 상세 설명이 없습니다.";

    // 판매자 정보 (닉네임, 프로필 이미지, 판매 지역)
    const seller = product.seller || {
      nickname: "감자이웃",
      avatar: DEFAULT_AVATAR,
      location: product.location,
      mannerTemp: "36.5℃"
    };
    sellerAvatarEl.src = seller.avatar || DEFAULT_AVATAR;
    sellerAvatarEl.onerror = () => { sellerAvatarEl.src = DEFAULT_AVATAR; };
    sellerNameEl.textContent = seller.nickname;
    sellerRegionEl.textContent = seller.location;
    sellerTempEl.textContent = seller.mannerTemp || "36.5℃";

    // 관심 버튼 상태 초기화
    updateDetailLikeButton();

    // 모달 표시 & 바디 스크롤 방지
    detailModalEl.classList.add("is-active");
    document.body.classList.add("modal-open");

    // 모달 스크롤 상단으로 초기화
    const scrollArea = detailModalEl.querySelector(".gamza-modal-scroll");
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  function closeDetailModal() {
    detailModalEl.classList.remove("is-active");
    document.body.classList.remove("modal-open");
    currentDetailProduct = null;
  }

  function updateDetailLikeButton() {
    const count = currentDetailProduct ? (currentDetailProduct.likes_count || 0) : 0;
    if (isDetailLiked) {
      detailLikeBtn.innerHTML = `<span>❤️</span><span>관심 ${count}</span>`;
      detailLikeBtn.classList.add("is-liked");
    } else {
      detailLikeBtn.innerHTML = `<span>🤍</span><span>관심 ${count > 0 ? count : '추가'}</span>`;
      detailLikeBtn.classList.remove("is-liked");
    }
  }

  // 상태 변경 공통 함수 (Supabase DB 저장 및 실시간 목록/배지 반영)
  async function updateProductStatus(productId, nextStatus) {
    if (!productId || !nextStatus) return;

    try {
      if (supabase) {
        const { error } = await supabase
          .from('products')
          .update({ status: nextStatus, updated_at: new Date().toISOString() })
          .eq('id', productId);

        if (error) throw error;
      }

      // 로컬 products 배열 갱신
      const item = products.find((p) => p.id === productId);
      if (item) item.status = nextStatus;

      // 상세 모달이 열려있는 경우 모달 UI 갱신
      if (currentDetailProduct && currentDetailProduct.id === productId) {
        currentDetailProduct.status = nextStatus;

        let badgeClass = "status-selling";
        if (nextStatus === "예약중") badgeClass = "status-reserved";
        else if (nextStatus === "거래완료") badgeClass = "status-completed";
        detailBadgeEl.className = `gamza-badge ${badgeClass}`;
        detailBadgeEl.textContent = nextStatus;

        ownerStatusBtns.forEach((btn) => {
          btn.classList.toggle("is-active", btn.dataset.status === nextStatus);
        });
      }

      renderProductList();
      showToast(`🔄 판매 상태가 [<strong>${nextStatus}</strong>](으)로 변경되어 저장되었습니다!`);
    } catch (err) {
      console.error("상태 변경 오류:", err);
      showToast("⚠️ 판매 상태 변경에 실패했습니다: " + (err.message || "오류"));
    }
  }

  // 1. 작성자 전용 판매 상태 버튼 (🟢 판매중 / 🟠 예약중 / ⚪ 거래완료) 클릭 이벤트
  ownerStatusBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!currentDetailProduct) return;
      if (!isProductOwner(currentDetailProduct)) {
        showToast("⚠️ 작성자 본인만 판매 상태를 변경할 수 있습니다.");
        return;
      }
      const targetStatus = btn.dataset.status;
      if (currentDetailProduct.status === targetStatus) return;
      await updateProductStatus(currentDetailProduct.id, targetStatus);
    });
  });

  // 상세 모달 상태 배지 클릭 시 (본인 글일 때 순환 변경)
  detailBadgeEl.addEventListener("click", async () => {
    if (!currentDetailProduct) return;
    if (!isProductOwner(currentDetailProduct)) return; // 본인 글이 아니면 동작하지 않음

    const statusCycle = { "판매중": "예약중", "예약중": "거래완료", "거래완료": "판매중" };
    const nextStatus = statusCycle[currentDetailProduct.status] || "판매중";
    await updateProductStatus(currentDetailProduct.id, nextStatus);
  });

  // 2. 작성자 게시글 수정 버튼 클릭
  if (detailEditBtn) {
    detailEditBtn.addEventListener("click", () => {
      if (!currentDetailProduct) return;
      if (!isProductOwner(currentDetailProduct)) {
        showToast("⚠️ 작성자 본인만 게시글을 수정할 수 있습니다.");
        return;
      }
      openEditModal(currentDetailProduct);
    });
  }

  // 3. 작성자 게시글 삭제 버튼 클릭
  if (detailDeleteBtn) {
    detailDeleteBtn.addEventListener("click", async () => {
      if (!currentDetailProduct) return;
      if (!isProductOwner(currentDetailProduct)) {
        showToast("⚠️ 작성자 본인만 게시글을 삭제할 수 있습니다.");
        return;
      }

      const confirmDelete = confirm(`정말로 "${currentDetailProduct.title}" 게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.`);
      if (!confirmDelete) return;

      const deleteId = currentDetailProduct.id;
      const deleteTitle = currentDetailProduct.title;

      try {
        if (supabase && deleteId) {
          const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', deleteId);

          if (error) throw error;
        }

        products = products.filter((p) => p.id !== deleteId);
        closeDetailModal();
        renderProductList();
        showToast(`🗑️ <strong>${deleteTitle}</strong> 게시글이 삭제되었습니다.`);
      } catch (err) {
        console.error("게시글 삭제 오류:", err);
        showToast("⚠️ 게시글 삭제에 실패했습니다: " + (err.message || "오류"));
      }
    });
  }

  // 상세 모달 관심추가 버튼 (Supabase 동기화)
  detailLikeBtn.addEventListener("click", async () => {
    if (!currentDetailProduct) return;
    isDetailLiked = !isDetailLiked;

    const currentLikes = currentDetailProduct.likes_count || 0;
    const newLikes = isDetailLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
    currentDetailProduct.likes_count = newLikes;
    updateDetailLikeButton();

    try {
      if (supabase && currentDetailProduct.id) {
        await supabase
          .from('products')
          .update({ likes_count: newLikes })
          .eq('id', currentDetailProduct.id);
      }
    } catch (err) {
      console.warn("관심 수 업데이트 오류:", err);
    }

    if (isDetailLiked) {
      showToast("❤️ 관심 목록에 추가되었습니다!");
    } else {
      showToast("🤍 관심 목록에서 제외되었습니다.");
    }
    renderProductList();
  });

  // ========================================================
  // [화면 3] 글쓰기 / 글수정 모달 로직
  // ========================================================
  function openWriteModal() {
    editingProductId = null;
    if (writeModalHeading) writeModalHeading.innerHTML = `<span>🥔</span><span>내 물건 팔기</span>`;
    if (writeSubmitBtn) writeSubmitBtn.innerHTML = `🥔 작성완료`;

    writeForm.reset();
    updateImagePreview(DEFAULT_PRODUCT_IMG);
    const charCounter = document.getElementById("writeCharCounter");
    if (charCounter) charCounter.textContent = "0 / 500자";
    // 기본 판매상태 '판매중' 선택
    const defaultRadio = document.querySelector('input[name="writeStatus"][value="판매중"]');
    if (defaultRadio) defaultRadio.checked = true;
    updateStatusRadioVisuals();

    writeModalEl.classList.add("is-active");
    document.body.classList.add("modal-open");
    setTimeout(() => {
      const titleInput = document.getElementById("writeTitle");
      if (titleInput) titleInput.focus();
    }, 200);
  }

  function openEditModal(product) {
    if (!product) return;
    editingProductId = product.id;
    closeDetailModal();

    if (writeModalHeading) writeModalHeading.innerHTML = `<span>✏️</span><span>내 물건 수정하기</span>`;
    if (writeSubmitBtn) writeSubmitBtn.innerHTML = `🥔 수정완료`;

    // 기존 데이터 폼에 바인딩
    document.getElementById("writeTitle").value = product.title || "";
    document.getElementById("writeCategory").value = product.category || "";
    document.getElementById("writePrice").value = product.price ?? "";
    document.getElementById("writeLocation").value = product.location || "";
    
    const descEl = document.getElementById("writeDescription");
    descEl.value = product.description || "";
    const charCounter = document.getElementById("writeCharCounter");
    if (charCounter) charCounter.textContent = `${descEl.value.length} / 500자`;

    writeImageUrlInput.value = (product.image && !product.image.startsWith("data:")) ? product.image : "";
    updateImagePreview(product.image || DEFAULT_PRODUCT_IMG);

    // 판매상태 라디오 체크
    const statusRadio = document.querySelector(`input[name="writeStatus"][value="${product.status}"]`);
    if (statusRadio) {
      statusRadio.checked = true;
    }
    updateStatusRadioVisuals();

    writeModalEl.classList.add("is-active");
    document.body.classList.add("modal-open");
    setTimeout(() => {
      const titleInput = document.getElementById("writeTitle");
      if (titleInput) titleInput.focus();
    }, 200);
  }

  function closeWriteModal() {
    editingProductId = null;
    if (writeModalHeading) writeModalHeading.innerHTML = `<span>🥔</span><span>내 물건 팔기</span>`;
    if (writeSubmitBtn) writeSubmitBtn.innerHTML = `🥔 작성완료`;
    writeModalEl.classList.remove("is-active");
    document.body.classList.remove("modal-open");
  }

  function updateImagePreview(src) {
    if (!src || src.trim() === "") {
      writeImagePreview.src = DEFAULT_PRODUCT_IMG;
    } else {
      writeImagePreview.src = src;
    }
  }

  function updateStatusRadioVisuals() {
    document.querySelectorAll(".gamza-status-radio-label").forEach((label) => {
      const radio = label.querySelector("input");
      label.classList.remove("selected-selling", "selected-reserved", "selected-completed");
      if (radio.checked) {
        if (radio.value === "판매중") label.classList.add("selected-selling");
        else if (radio.value === "예약중") label.classList.add("selected-reserved");
        else if (radio.value === "거래완료") label.classList.add("selected-completed");
      }
    });
  }

  // ========================================================
  // 4. 이벤트 리스너 등록
  // ========================================================

  // 카테고리 칩 클릭
  categoryChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      categoryChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      currentCategory = chip.dataset.category;
      renderProductList();
    });
  });

  // 검색창 입력
  searchInputEl.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      searchClearBtnEl.style.display = "block";
    } else {
      searchClearBtnEl.style.display = "none";
    }
    renderProductList();
  });

  // 검색어 지우기 버튼
  searchClearBtnEl.addEventListener("click", () => {
    searchInputEl.value = "";
    searchQuery = "";
    searchClearBtnEl.style.display = "none";
    searchInputEl.focus();
    renderProductList();
  });

  // '거래가능만 보기' 토글
  availableToggleEl.addEventListener("change", (e) => {
    onlyAvailable = e.target.checked;
    renderProductList();
  });

  // 로고 클릭 시 전체 필터 초기화
  logoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentCategory = "전체";
    categoryChips.forEach((c) => {
      c.classList.toggle("is-active", c.dataset.category === "전체");
    });
    searchInputEl.value = "";
    searchQuery = "";
    searchClearBtnEl.style.display = "none";
    availableToggleEl.checked = false;
    onlyAvailable = false;
    renderProductList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 로그인 버튼 클릭 -> 로그인 모달 오픈
  loginBtnHeader.addEventListener("click", () => {
    openAuthModal("login");
  });

  // 로그아웃 버튼 클릭
  logoutBtnHeader.addEventListener("click", async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      currentUser = null;
      currentProfile = null;
      updateAuthUI(false);
      showToast("👋 안전하게 로그아웃되었습니다.");
    } catch (err) {
      console.error("로그아웃 오류:", err);
      showToast("⚠️ 로그아웃 중 오류가 발생했습니다.");
    }
  });

  // 인증 모달 모드 전환 탭
  tabLoginBtn.addEventListener("click", () => setAuthMode("login"));
  tabSignupBtn.addEventListener("click", () => setAuthMode("signup"));

  // 인증 모달 하단 전환 링크
  authToggleLink.addEventListener("click", () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  });

  // 인증 모달 닫기
  authCloseBtn.addEventListener("click", closeAuthModal);
  authModalEl.addEventListener("click", (e) => {
    if (e.target === authModalEl) closeAuthModal();
  });

  // 인증 폼 제출 (회원가입 / 로그인)
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAuthError();

    const email = authEmailInput.value.trim();
    const password = authPasswordInput.value.trim();
    const nickname = authNicknameInput.value.trim();

    if (!email) {
      showAuthError("이메일을 입력해주세요.");
      authEmailInput.focus();
      return;
    }
    if (!password || password.length < 6) {
      showAuthError("비밀번호는 최소 6자 이상이어야 합니다.");
      authPasswordInput.focus();
      return;
    }

    if (!supabase) {
      showAuthError("수파베이스가 연결되지 않았습니다.");
      return;
    }

    const prevBtnText = authSubmitBtn.innerHTML;
    authSubmitBtn.disabled = true;

    try {
      if (authMode === "signup") {
        // 회원가입 모드
        if (!nickname || nickname.length < 2) {
          showAuthError("감자 닉네임을 2자 이상 입력해주세요.");
          authNicknameInput.focus();
          authSubmitBtn.disabled = false;
          return;
        }

        authSubmitBtn.innerHTML = "🥔 닉네임 확인 중...";

        // 닉네임 중복 체크
        const { data: existingNick, error: nickCheckErr } = await supabase
          .from('profiles')
          .select('id')
          .eq('nickname', nickname)
          .maybeSingle();

        if (existingNick) {
          showAuthError("이미 사용 중인 감자 닉네임입니다. 다른 닉네임을 입력해주세요.");
          authNicknameInput.focus();
          authSubmitBtn.disabled = false;
          authSubmitBtn.innerHTML = prevBtnText;
          return;
        }

        authSubmitBtn.innerHTML = "🥔 회원가입 진행 중...";

        // Supabase Auth 회원가입
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              nickname: nickname
            }
          }
        });

        if (error) {
          console.error("회원가입 오류:", error);
          if (error.message.includes("already registered") || error.message.includes("User already exists")) {
            showAuthError("이미 등록된 이메일 계정입니다. 로그인해주세요.");
          } else {
            showAuthError(error.message || "회원가입 처리 중 오류가 발생했습니다.");
          }
          authSubmitBtn.disabled = false;
          authSubmitBtn.innerHTML = prevBtnText;
          return;
        }

        if (data?.user) {
          // profiles 테이블에 프로필 레코드 upsert
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              nickname: nickname,
              avatar_url: DEFAULT_AVATAR,
              region: '우리동네',
              manner_temp: 36.5
            });
          } catch (profileErr) {
            console.warn("프로필 생성 알림:", profileErr);
          }

          currentUser = data.user;
          currentProfile = { id: data.user.id, nickname: nickname };

          if (data.session) {
            // 즉시 로그인된 세션
            updateAuthUI(true);
            closeAuthModal();
            showToast(`🎉 환영합니다, <strong>${nickname}</strong>님! 회원가입 및 로그인이 완료되었습니다.`);

            // 요구사항 3: 글쓰기를 눌렀던 상태면 글쓰기 모달 이어서 열기
            if (pendingOpenWriteModal) {
              pendingOpenWriteModal = false;
              openWriteModal();
            }
          } else {
            // 이메일 인증이 필요한 환경일 경우
            showToast(`✉️ <strong>${email}</strong>으로 인증 링크가 발송되었습니다. 메일함을 확인해주세요.`);
            setAuthMode("login");
          }
        }
      } else {
        // 로그인 모드
        authSubmitBtn.innerHTML = "🥔 로그인 중...";

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          console.error("로그인 오류:", error);
          if (error.message.includes("Invalid login credentials")) {
            showAuthError("이메일 또는 비밀번호가 올바르지 않습니다.");
          } else if (error.message.includes("Email not confirmed")) {
            showAuthError("이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.");
          } else {
            showAuthError(error.message || "로그인 처리 중 오류가 발생했습니다.");
          }
          authSubmitBtn.disabled = false;
          authSubmitBtn.innerHTML = prevBtnText;
          return;
        }

        if (data?.user) {
          currentUser = data.user;
          currentProfile = await fetchUserProfile(data.user.id);

          // 만약 profiles 테이블에 프로필이 없으면 자동 생성
          if (!currentProfile) {
            const defaultNick = data.user.user_metadata?.nickname || "감자이웃_" + data.user.id.slice(0, 4);
            try {
              await supabase.from('profiles').upsert({
                id: data.user.id,
                nickname: defaultNick,
                avatar_url: DEFAULT_AVATAR,
                region: '우리동네',
                manner_temp: 36.5
              });
              currentProfile = { id: data.user.id, nickname: defaultNick };
            } catch (pErr) {
              console.warn("프로필 자동 복원 실패:", pErr);
              currentProfile = { nickname: defaultNick };
            }
          }

          updateAuthUI(true);
          closeAuthModal();

          const activeNickname = currentProfile?.nickname || currentUser.user_metadata?.nickname || "감자이웃";
          showToast(`🥔 반갑습니다, <strong>${activeNickname}</strong>님! 로그인되었습니다.`);

          // 요구사항 3: 글쓰기를 눌렀던 상태면 글쓰기 창 이어서 열기
          if (pendingOpenWriteModal) {
            pendingOpenWriteModal = false;
            openWriteModal();
          }
        }
      }
    } catch (err) {
      console.error("인증 예외:", err);
      showAuthError("요청 처리 중 오류가 발생했습니다: " + (err.message || ""));
    } finally {
      authSubmitBtn.disabled = false;
      authSubmitBtn.innerHTML = prevBtnText;
    }
  });

  // 상세 모달 닫기
  detailCloseBtn.addEventListener("click", closeDetailModal);
  detailModalEl.addEventListener("click", (e) => {
    if (e.target === detailModalEl) closeDetailModal();
  });

  // 상세 모달 채팅 시작하기 버튼
  detailChatBtn.addEventListener("click", () => {
    showToast(`💬 ${sellerNameEl.textContent}님과의 감자톡 채팅이 준비 중입니다!`);
  });

  // 요구사항 3: 로그인을 하지 않은 상태에서 [글쓰기]를 누르면 로그인 모달이 먼저 뜨고, 로그인 성공 시 글쓰기 창이 이어서 뜨게 함
  writeBtnHeader.addEventListener("click", () => {
    if (!currentUser) {
      pendingOpenWriteModal = true;
      showToast("🔒 글을 작성하려면 로그인이 필요합니다. 먼저 로그인해주세요.");
      openAuthModal("login");
      return;
    }
    openWriteModal();
  });

  writeCloseBtn.addEventListener("click", closeWriteModal);
  writeCancelBtn.addEventListener("click", closeWriteModal);
  writeModalEl.addEventListener("click", (e) => {
    if (e.target === writeModalEl) closeWriteModal();
  });

  // 글쓰기 이미지 URL 입력 시 미리보기
  writeImageUrlInput.addEventListener("input", (e) => {
    updateImagePreview(e.target.value);
  });

  // 글쓰기 파일 첨부 시 미리보기
  writeImageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        writeImageUrlInput.value = "";
        updateImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // 빠른 샘플 이미지 칩 클릭
  document.querySelectorAll(".gamza-quick-img-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sampleUrl = btn.dataset.url;
      writeImageUrlInput.value = sampleUrl;
      updateImagePreview(sampleUrl);
    });
  });

  // 판매상태 라디오 체인지 이벤트
  document.querySelectorAll('input[name="writeStatus"]').forEach((radio) => {
    radio.addEventListener("change", updateStatusRadioVisuals);
  });

  // 자세한 설명 실시간 글자 수 카운터 (최대 500자)
  const writeDescEl = document.getElementById("writeDescription");
  const writeCharCounterEl = document.getElementById("writeCharCounter");
  if (writeDescEl && writeCharCounterEl) {
    writeDescEl.addEventListener("input", () => {
      writeCharCounterEl.textContent = `${writeDescEl.value.length} / 500자`;
    });
  }

  // 요구사항 4: 글쓰기 폼 제출 시 작성자(seller_id)가 데이터베이스에 함께 저장되고 닉네임이 연동됨
  writeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 로그인 체크 (이중 검증)
    if (!currentUser) {
      pendingOpenWriteModal = true;
      showToast("🔒 글 등록을 위해 먼저 로그인해주세요.");
      closeWriteModal();
      openAuthModal("login");
      return;
    }

    const title = document.getElementById("writeTitle").value.trim();
    const category = document.getElementById("writeCategory").value;
    const priceRaw = writePriceInput.value.trim();
    const location = document.getElementById("writeLocation").value.trim();
    const statusRadio = document.querySelector('input[name="writeStatus"]:checked');
    const status = statusRadio ? statusRadio.value : "판매중";
    const description = document.getElementById("writeDescription").value.trim();
    const imageSrc = writeImagePreview.src || DEFAULT_PRODUCT_IMG;

    // 유효성 검사
    if (!title) {
      showToast("⚠️ 상품명을 입력해주세요.");
      document.getElementById("writeTitle").focus();
      return;
    }
    if (!category) {
      showToast("⚠️ 카테고리를 선택해주세요.");
      document.getElementById("writeCategory").focus();
      return;
    }
    if (priceRaw === "") {
      showToast("⚠️ 가격을 입력해주세요.");
      writePriceInput.focus();
      return;
    }
    if (!location) {
      showToast("⚠️ 거래 희망 동네를 입력해주세요.");
      document.getElementById("writeLocation").focus();
      return;
    }
    if (description.length > 500) {
      showToast("⚠️ 자세한 설명은 최대 500자까지 작성할 수 있습니다.");
      document.getElementById("writeDescription").focus();
      return;
    }

    const submitBtn = document.getElementById("writeSubmitBtn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "🥔 수파베이스에 저장 중...";

    const currentNick = currentProfile?.nickname || currentUser.user_metadata?.nickname || "감자이웃";
    const currentAvatar = currentProfile?.avatar_url || DEFAULT_AVATAR;
    const currentRegion = currentProfile?.region || location;
    const currentManner = currentProfile?.manner_temp ? `${currentProfile.manner_temp}℃` : "36.5℃";

    try {
      if (editingProductId) {
        // [게시글 수정 모드]
        if (supabase) {
          const { data, error } = await supabase
            .from('products')
            .update({
              title: title,
              category: category,
              price: parseInt(priceRaw, 10) || 0,
              location: location,
              status: status,
              image_url: imageSrc,
              description: description,
              updated_at: new Date().toISOString()
            })
            .eq('id', editingProductId)
            .select('*, profiles(*)')
            .single();

          if (error) throw error;

          if (data) {
            const idx = products.findIndex((p) => p.id === editingProductId);
            if (idx !== -1) {
              products[idx] = {
                ...products[idx],
                title: data.title,
                category: data.category,
                price: data.price,
                location: data.location,
                status: data.status,
                image: data.image_url || DEFAULT_PRODUCT_IMG,
                description: data.description || ""
              };
            }
          }
        } else {
          // 오프라인 폴백 수정
          const idx = products.findIndex((p) => p.id === editingProductId);
          if (idx !== -1) {
            products[idx].title = title;
            products[idx].category = category;
            products[idx].price = parseInt(priceRaw, 10) || 0;
            products[idx].location = location;
            products[idx].status = status;
            products[idx].image = imageSrc;
            products[idx].description = description;
          }
        }

        renderProductList();
        closeWriteModal();
        showToast(`🎉 <strong>${title}</strong> 상품 정보가 수정되었습니다!`);
        return;
      }

      // [신규 게시글 등록 모드]
      if (supabase) {
        // 현재 로그인 사용자의 currentUser.id를 seller_id로 함께 저장
        const { data, error } = await supabase
          .from('products')
          .insert([{
            title: title,
            category: category,
            price: parseInt(priceRaw, 10) || 0,
            location: location,
            status: status,
            image_url: imageSrc,
            description: description,
            seller_id: currentUser.id
          }])
          .select('*, profiles(*)')
          .single();

        if (error) throw error;

        if (data) {
          const newProduct = {
            id: data.id,
            seller_id: data.seller_id || currentUser.id,
            title: data.title,
            category: data.category,
            price: data.price,
            location: data.location,
            time: "방금 전",
            status: data.status,
            image: data.image_url || DEFAULT_PRODUCT_IMG,
            description: data.description || "",
            likes_count: data.likes_count || 0,
            seller: {
              id: data.seller_id || currentUser.id,
              nickname: data.profiles?.nickname || currentNick,
              avatar: data.profiles?.avatar_url || currentAvatar,
              location: data.profiles?.region || currentRegion,
              mannerTemp: data.profiles?.manner_temp ? `${data.profiles.manner_temp}℃` : currentManner
            }
          };
          products.unshift(newProduct);
        }
      } else {
        // 오프라인 폴백
        const fallbackProduct = {
          id: Date.now(),
          seller_id: currentUser.id,
          title: title,
          category: category,
          price: parseInt(priceRaw, 10) || 0,
          location: location,
          time: "방금 전",
          status: status,
          image: imageSrc,
          description: description,
          likes_count: 0,
          seller: {
            id: currentUser.id,
            nickname: currentNick,
            avatar: currentAvatar,
            location: currentRegion,
            mannerTemp: currentManner
          }
        };
        products.unshift(fallbackProduct);
      }

      // 필터 초기화 후 리스트 갱신
      currentCategory = "전체";
      categoryChips.forEach((c) => {
        c.classList.toggle("is-active", c.dataset.category === "전체");
      });
      searchInputEl.value = "";
      searchQuery = "";
      searchClearBtnEl.style.display = "none";

      renderProductList();
      closeWriteModal();

      showToast("🎉 <strong>" + title + "</strong> 상품이 등록되었습니다!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("상품 처리 오류:", err);
      showToast("⚠️ 처리 실패: " + (err.message || "오류가 발생했습니다."));
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = editingProductId ? "🥔 수정완료" : "🥔 작성완료";
    }
  });

  // ESC 키 누르면 열려있는 모달 닫기
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (authModalEl.classList.contains("is-active")) closeAuthModal();
      if (detailModalEl.classList.contains("is-active")) closeDetailModal();
      if (writeModalEl.classList.contains("is-active")) closeWriteModal();
    }
  });

  // ========================================================
  // 5. 앱 초기화 실행
  // ========================================================
  initAuth();
  loadProducts();
  initRealtime();

})();
