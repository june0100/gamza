/**
 * 감자 마켓 (Gamza Market) - 화면 3: 글쓰기 모달 및 등록 로직
 * 파일명: part3_write.js
 */

(function () {
  'use strict';

  // 기본 감자 상품 이미지 (폴백용 SVG Data URI)
  const DEFAULT_POTATO_IMG =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="100%" height="100%" fill="#F7EFE5"/>
      <ellipse cx="150" cy="100" rx="70" ry="50" fill="#DDB892" stroke="#8D5B4C" stroke-width="4"/>
      <circle cx="130" cy="90" r="4" fill="#6F4E37"/>
      <circle cx="170" cy="90" r="4" fill="#6F4E37"/>
      <path d="M 135 110 Q 150 125 165 110" stroke="#6F4E37" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="120" cy="115" r="3" fill="#B08968"/>
      <circle cx="178" cy="105" r="2.5" fill="#B08968"/>
      <text x="150" y="170" font-family="sans-serif" font-size="14" fill="#8D5B4C" font-weight="bold" text-anchor="middle">🥔 감자 마켓 상품</text>
    </svg>
  `);

  let currentImageData = '';
  let onCreatedCallback = null;

  // 모달 템플릿 HTML
  function getModalHTML() {
    return `
    <div id="gamzaWriteModal" class="gamza-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="gamzaModalTitle">
      <div class="gamza-modal-container">
        <!-- 헤더 -->
        <header class="gamza-modal-header">
          <h2 id="gamzaModalTitle" class="gamza-modal-title">
            <span class="gamza-icon">🥔</span> 내 물건 팔기
          </h2>
          <button type="button" class="gamza-modal-close-btn" id="gamzaCloseModalBtn" aria-label="닫기">✕</button>
        </header>

        <!-- 본문 폼 -->
        <form id="gamzaWriteForm" class="gamza-modal-body" novalidate>
          
          <!-- 이미지 첨부 / URL 입력 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label">
              <span>상품 이미지</span>
              <span style="font-weight: normal; font-size: 0.8rem; color: var(--gamza-text-muted);">파일 첨부 또는 URL</span>
            </label>
            <div class="gamza-image-upload-wrapper" id="gamzaImageDropZone">
              <div class="gamza-image-action-row">
                <label class="gamza-file-btn" for="gamzaImageFileInput">
                  📷 사진 첨부
                </label>
                <input type="file" id="gamzaImageFileInput" accept="image/*" style="display:none;" />
                <input 
                  type="url" 
                  id="gamzaImageUrlInput" 
                  class="gamza-input gamza-image-url-input" 
                  placeholder="또는 이미지 URL을 입력하세요 (https://...)" 
                />
              </div>

              <!-- 이미지 미리보기 -->
              <div class="gamza-preview-container" id="gamzaPreviewContainer">
                <img id="gamzaPreviewImg" class="gamza-preview-img" src="" alt="상품 미리보기" />
                <button type="button" class="gamza-preview-remove-btn" id="gamzaRemoveImageBtn" title="이미지 삭제">✕</button>
              </div>
            </div>
          </div>

          <!-- 상품명 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label" for="gamzaTitleInput">
              <span>상품명<span class="gamza-required">*</span></span>
            </label>
            <input 
              type="text" 
              id="gamzaTitleInput" 
              name="title" 
              class="gamza-input" 
              placeholder="상품명을 입력해주세요" 
              maxlength="60" 
              required 
            />
          </div>

          <!-- 카테고리 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label" for="gamzaCategorySelect">
              <span>카테고리<span class="gamza-required">*</span></span>
            </label>
            <select id="gamzaCategorySelect" name="category" class="gamza-select" required>
              <option value="" disabled selected>카테고리를 선택해주세요</option>
              <option value="디지털 기기">📱 디지털 기기</option>
              <option value="가구/인테리어">🛋️ 가구/인테리어</option>
              <option value="의류">👕 의류</option>
              <option value="생활가전">🍳 생활가전</option>
              <option value="도서/티켓">📚 도서/티켓</option>
              <option value="반려동물 용품">🐶 반려동물 용품</option>
              <option value="기타">🥔 기타</option>
            </select>
          </div>

          <!-- 가격 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label" for="gamzaPriceInput">
              <span>가격<span class="gamza-required">*</span></span>
            </label>
            <div class="gamza-price-input-wrapper">
              <span class="gamza-price-currency">₩</span>
              <input 
                type="number" 
                id="gamzaPriceInput" 
                name="price" 
                class="gamza-input gamza-price-input" 
                placeholder="가격을 입력해주세요 (숫자만)" 
                min="0" 
                step="100" 
                required 
              />
              <span class="gamza-price-unit">원</span>
            </div>
            <div class="gamza-price-quick-tags">
              <button type="button" class="gamza-badge-chip" id="gamzaFreePriceChip">🎁 무료나눔 (0원)</button>
              <button type="button" class="gamza-badge-chip" data-add="5000">+5,000원</button>
              <button type="button" class="gamza-badge-chip" data-add="10000">+10,000원</button>
              <button type="button" class="gamza-badge-chip" data-add="50000">+50,000원</button>
            </div>
          </div>

          <!-- 거래 희망 동네 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label" for="gamzaLocationInput">
              <span>거래 희망 동네<span class="gamza-required">*</span></span>
            </label>
            <input 
              type="text" 
              id="gamzaLocationInput" 
              name="location" 
              class="gamza-input" 
              placeholder="거래 희망 동네 (예: 역삼동, 서초동)" 
              value="역삼동" 
              required 
            />
          </div>

          <!-- 판매 상태 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label">
              <span>판매 상태</span>
            </label>
            <div class="gamza-status-group">
              <label class="gamza-status-option">
                <input type="radio" name="status" value="판매중" checked />
                <div class="gamza-status-card">판매중</div>
              </label>
              <label class="gamza-status-option">
                <input type="radio" name="status" value="예약중" />
                <div class="gamza-status-card">예약중</div>
              </label>
              <label class="gamza-status-option">
                <input type="radio" name="status" value="거래완료" />
                <div class="gamza-status-card">거래완료</div>
              </label>
            </div>
          </div>

          <!-- 자세한 설명 -->
          <div class="gamza-form-group">
            <label class="gamza-form-label" for="gamzaDescriptionInput">
              <span>자세한 설명<span class="gamza-required">*</span></span>
            </label>
            <textarea 
              id="gamzaDescriptionInput" 
              name="description" 
              class="gamza-textarea" 
              rows="4" 
              placeholder="브랜드, 사용감, 하자 여부 등 구매자에게 필요한 설명을 자세히 적어주세요. (최대 500자)" 
              maxlength="500" 
              required
            ></textarea>
            <div class="gamza-char-counter" id="gamzaCharCounter">0 / 500자</div>
          </div>

        </form>

        <!-- 하단 푸터 버튼 -->
        <footer class="gamza-modal-footer">
          <button type="button" class="gamza-btn gamza-btn-cancel" id="gamzaCancelModalBtn">취소</button>
          <button type="submit" form="gamzaWriteForm" class="gamza-btn gamza-btn-submit" id="gamzaSubmitBtn">
            🥔 작성완료
          </button>
        </footer>
      </div>
    </div>

    <!-- 토스트 알림 컨테이너 -->
    <div id="gamzaToast" class="gamza-toast" aria-live="polite"></div>
    `;
  }

  // 모달 DOM 주입 및 초기화
  function ensureModalInDOM() {
    if (!document.getElementById('gamzaWriteModal')) {
      const wrapper = document.createElement('div');
      wrapper.id = 'gamzaWriteModuleRoot';
      wrapper.innerHTML = getModalHTML();
      document.body.appendChild(wrapper);
      bindModalEvents();
    }
  }

  // 토스트 메시지 출력
  let toastTimer = null;
  function showToast(message, type = 'info') {
    const toast = document.getElementById('gamzaToast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'gamza-toast ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : '');
    toast.classList.add('is-show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-show');
    }, 2800);
  }

  // 이미지 미리보기 설정
  function setPreviewImage(src) {
    const previewContainer = document.getElementById('gamzaPreviewContainer');
    const previewImg = document.getElementById('gamzaPreviewImg');
    if (!previewContainer || !previewImg) return;

    if (src) {
      currentImageData = src;
      previewImg.src = src;
      previewContainer.classList.add('has-image');
    } else {
      currentImageData = '';
      previewImg.src = '';
      previewContainer.classList.remove('has-image');
    }
  }

  // 모달 이벤트 바인딩
  function bindModalEvents() {
    const modal = document.getElementById('gamzaWriteModal');
    const closeBtn = document.getElementById('gamzaCloseModalBtn');
    const cancelBtn = document.getElementById('gamzaCancelModalBtn');
    const form = document.getElementById('gamzaWriteForm');
    const fileInput = document.getElementById('gamzaImageFileInput');
    const urlInput = document.getElementById('gamzaImageUrlInput');
    const removeImgBtn = document.getElementById('gamzaRemoveImageBtn');
    const dropZone = document.getElementById('gamzaImageDropZone');
    const descTextarea = document.getElementById('gamzaDescriptionInput');
    const charCounter = document.getElementById('gamzaCharCounter');
    const freePriceChip = document.getElementById('gamzaFreePriceChip');
    const priceInput = document.getElementById('gamzaPriceInput');

    // 닫기 및 취소 버튼
    closeBtn?.addEventListener('click', closeWriteModal);
    cancelBtn?.addEventListener('click', closeWriteModal);

    // 모달 오버레이(배경) 클릭 시 닫기
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWriteModal();
      }
    });

    // ESC 키 누를 때 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeWriteModal();
      }
    });

    // 파일 첨부 미리보기
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('이미지 파일(JPG, PNG, GIF 등)만 첨부할 수 있습니다.', 'error');
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          setPreviewImage(loadEvent.target.result);
          if (urlInput) urlInput.value = '';
        };
        reader.readAsDataURL(file);
      }
    });

    // 드래그 앤 드롭 지원
    if (dropZone) {
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('is-dragover');
        });
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('is-dragover');
        });
      });
      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt?.files && dt.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            setPreviewImage(loadEvent.target.result);
            if (urlInput) urlInput.value = '';
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // URL 입력 시 미리보기 반영
    urlInput?.addEventListener('input', () => {
      const url = urlInput.value.trim();
      if (url) {
        setPreviewImage(url);
        if (fileInput) fileInput.value = '';
      } else {
        setPreviewImage('');
      }
    });

    // 이미지 삭제 버튼
    removeImgBtn?.addEventListener('click', () => {
      setPreviewImage('');
      if (fileInput) fileInput.value = '';
      if (urlInput) urlInput.value = '';
    });

    // 빠른 가격 칩 버튼 (+5000, +10000, +50000)
    document.querySelectorAll('.gamza-price-quick-tags button[data-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const addAmount = Number(btn.getAttribute('data-add')) || 0;
        const currentVal = Number(priceInput.value) || 0;
        priceInput.value = currentVal + addAmount;
      });
    });

    // 무료나눔 칩 버튼
    freePriceChip?.addEventListener('click', () => {
      priceInput.value = 0;
    });

    // 글자 수 카운터
    descTextarea?.addEventListener('input', () => {
      const len = descTextarea.value.length;
      if (charCounter) {
        charCounter.textContent = `${len} / 500자`;
      }
    });

    // 폼 제출 (유효성 검사 및 등록 처리)
    form?.addEventListener('submit', handleFormSubmit);
  }

  // 폼 제출 핸들러
  function handleFormSubmit(e) {
    e.preventDefault();

    const titleInput = document.getElementById('gamzaTitleInput');
    const categorySelect = document.getElementById('gamzaCategorySelect');
    const priceInput = document.getElementById('gamzaPriceInput');
    const locationInput = document.getElementById('gamzaLocationInput');
    const descInput = document.getElementById('gamzaDescriptionInput');
    const statusRadio = document.querySelector('input[name="status"]:checked');

    const title = titleInput?.value.trim() || '';
    const category = categorySelect?.value.trim() || '';
    const priceStr = priceInput?.value.trim() || '';
    const location = locationInput?.value.trim() || '';
    const description = descInput?.value.trim() || '';
    const status = statusRadio ? statusRadio.value : '판매중';

    // 1. 유효성 검사
    if (!title) {
      showToast('상품명을 입력해주세요! 🥔', 'error');
      titleInput?.focus();
      return;
    }

    if (!category) {
      showToast('카테고리를 선택해주세요! 🥔', 'error');
      categorySelect?.focus();
      return;
    }

    if (priceStr === '' || isNaN(Number(priceStr)) || Number(priceStr) < 0) {
      showToast('올바른 가격을 입력해주세요 (0원 이상)', 'error');
      priceInput?.focus();
      return;
    }

    if (!location) {
      showToast('거래 희망 동네를 입력해주세요! (예: 역삼동)', 'error');
      locationInput?.focus();
      return;
    }

    if (!description) {
      showToast('상품에 대한 자세한 설명을 적어주세요!', 'error');
      descInput?.focus();
      return;
    }

    if (description.length > 500) {
      showToast('자세한 설명은 최대 500자까지 작성할 수 있습니다.', 'error');
      descInput?.focus();
      return;
    }

    // 2. 신규 상품 객체 생성
    const newProduct = {
      id: 'gamza_' + Date.now(),
      title: title,
      category: category,
      price: Number(priceStr),
      location: location,
      status: status,
      description: description,
      imageUrl: currentImageData || DEFAULT_POTATO_IMG,
      createdAt: new Date().toISOString(),
      createdTimeStr: '방금 전',
      likes: 0,
      chats: 0,
      seller: {
        nickname: '감자이웃',
        temperature: 36.5
      }
    };

    // 3. 콜백 및 커스텀 이벤트 전달
    if (typeof onCreatedCallback === 'function') {
      onCreatedCallback(newProduct);
    }
    if (typeof window.onProductCreated === 'function') {
      window.onProductCreated(newProduct);
    }

    // 전역 이벤트 디스패치 (타 화면이나 모듈과의 느슨한 결합 지원)
    window.dispatchEvent(
      new CustomEvent('gamza:product-created', {
        detail: newProduct
      })
    );

    // 4. 모달 닫기 및 폼 초기화
    closeWriteModal();
    resetForm();

    // 5. 성공 토스트 출력
    showToast(`'${title}' 상품이 등록되었습니다! 🥔✨`, 'success');
  }

  // 폼 리셋 함수
  function resetForm() {
    const form = document.getElementById('gamzaWriteForm');
    const charCounter = document.getElementById('gamzaCharCounter');
    if (form) form.reset();
    setPreviewImage('');
    if (charCounter) charCounter.textContent = '0 / 1000자';
  }

  // 모달 열기 함수
  function openWriteModal() {
    ensureModalInDOM();
    const modal = document.getElementById('gamzaWriteModal');
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
      const firstInput = document.getElementById('gamzaTitleInput');
      setTimeout(() => firstInput?.focus(), 100);
    }
  }

  // 모달 닫기 함수
  function closeWriteModal() {
    const modal = document.getElementById('gamzaWriteModal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  // 초기화 및 콜백 등록 함수
  function initWriteModal(options = {}) {
    ensureModalInDOM();
    if (options.onProductCreated) {
      onCreatedCallback = options.onProductCreated;
    }
  }

  // DOM 로드 완료 시 기본 주입
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureModalInDOM);
  } else {
    ensureModalInDOM();
  }

  // 전역 객체(window)에 공개 API 노출
  window.openWriteModal = openWriteModal;
  window.closeWriteModal = closeWriteModal;
  window.initWriteModal = initWriteModal;
  window.resetWriteForm = resetForm;
  window.showGamzaToast = showToast;

  // ES Module 호환 지원
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      openWriteModal,
      closeWriteModal,
      initWriteModal,
      resetForm,
      showToast
    };
  }
})();
