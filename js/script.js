/* ################################# fetch #################################  */
function loadLoadingPage(){
  fetch('/include/loading.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.loading-include').innerHTML = data;
    return bearShow();
  })
  .then(()=>{
    loadIntro();
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadIntro(){
  fetch('./include/intro.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.intro-include').innerHTML = data;
    typing(drawPath); // fetch 이후 typing 함수 실행
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadAboutIntro(){
  fetch('./include/about-intro.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.about-intro-include').innerHTML = data;
  })
  .then((data)=>{
    aboutIntroHandler();
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadAbout(){
  fetch('./include/about.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.about-include').innerHTML = data;
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadSkill(){
  fetch('./include/skill.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.skill-include').innerHTML = data;

    skillTab(); // fetch 이후 skillTab() 함수 실행
    skillTabAccordion();
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadWorks(){
  fetch('./include/works.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.works-include').innerHTML = data;

    const swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 1,
      loop: false,
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
      },
      on: {
        init: () => {
          console.log('Swiper 초기화 완료');
        },
      },
    });
  })
  .catch(error => console.error('Error loading header:', error));
}

function loadEpilogue(){
  fetch('./include/epilogue.html')
  .then(response => response.text())
  .then(data=>{
    document.querySelector('.epilogue-include').innerHTML = data;
    epilogueHandler();
    bearStop();
  })
  .catch(error => console.error('Error loading header:', error));
}

/* ################################# scroll 이벤트 ################################# */
const contentArea = document.querySelector('.content');
const contact = document.querySelector('.nav-items>a');
const changeMenu = document.querySelector('.change-menu');

contentArea.addEventListener('scroll', ()=>{
  const scrollY = contentArea.scrollTop;
  const pathArrow = document.getElementById('scroll-arrow');

  console.log('현재 scrollY: ', scrollY);

  let lastScrollY = 0; //스크롤 값
  const scrollingDown = scrollY > lastScrollY; // 스크롤 방향 감지

  resetLinkStyles(); // 모든 색상 초기화

  // 스크롤 값에 따라 내비게이션 색상 변경(스크롤 방향 반영)
  if(scrollY >= 1400 && scrollY < 2100) {
    document.getElementById('about-link').style.color = scrollingDown ? 'var(--brown)' : 'var(--veige)';
  } 
  else if(scrollY >= 2100 && scrollY < 2800) {
    document.getElementById('about-link').style.color = 'var(--veige)';
    document.getElementById('skill-link').style.color = scrollingDown ? 'var(--brown)' : 'var(--veige)';
  } 
  else if(scrollY >= 2800) {
    document.getElementById('skill-link').style.color = 'var(--veige)';
    document.getElementById('works-link').style.color = scrollingDown ? 'var(--brown)' : 'var(--veige)';
  }

  lastScrollY = scrollY; // 이전 스크롤 위치 업데이트

  // intro section scroll arrow
  scrollY >= 700 ? pathArrow.style.opacity = 0 : pathArrow.style.opacity = 1;
});

/* ################################# function ################################# */
// bear show
function bearShow(){
  return new Promise((resolve) => {
    const loadingBearImg = document.querySelectorAll('.loading-bear-img');
    let index = 0; //곰 이미지 인덱스

    const interval = setInterval(() => {
      if(index < loadingBearImg.length){
        loadingBearImg[index].classList.add('visible');
        index++;
      }
      else{
        clearInterval(interval);
        setTimeout(()=>{
          document.querySelector('.loading-include').style.display = 'none'; //1초 후 숨김
          resolve();
        }, 1000);
      } 
    }, 1000); //1초에 1개씩 나타남
  });
}

//색깔 초기화 함수
function resetLinkStyles(){
  document.getElementById('about-link').style.color = 'var(--veige)';
  document.getElementById('skill-link').style.color = 'var(--veige)';
  document.getElementById('works-link').style.color = 'var(--veige)';
}

// show contact window
function contactWindowShow(){
  const contactBtn = document.getElementById('contact-link');
  const ContactWindow = document.getElementById('contact');
  const closeBtn = document.querySelector('.close-bear');
  const contactBg = document.querySelector('.contact-bg');

  contactBtn.addEventListener('click', ()=>{
    ContactWindow.classList.add('visible');
    contactBg.classList.add('visible');
  });
  closeBtn.addEventListener('click', ()=>{
    ContactWindow.classList.remove('visible');
    contactBg.classList.remove('visible');
  })
}

// intro typing
const typing = (callback) => {
  const text = document.querySelector('.intro-typing-text');
  const cursor = document.querySelector('.cursor');
  const txt = "프론트엔드 포트폴리오";
  let counter = 0;

  const type = () => {
    if(counter < txt.length) {
      text.textContent += txt[counter];
      counter++;
      setTimeout(type, 300); // 다음 글자 0.3초 후 출력
    }
    else{
      cursor.classList.add('blink_animate');
      if(callback) callback(); //타이핑 완료 후 drawPath 콜백
    }
  };
  type();
};

// intro path
const drawPath = () => {
  const pathArrow = document.getElementById('scroll-arrow');
  const pathLength = pathArrow.getTotalLength();

  pathArrow.style.strokeDasharray = pathLength;
  pathArrow.style.strokeDashoffset = pathLength;

  setTimeout(() => {
    pathArrow.style.strokeDashoffset = '0';

    setTimeout(()=>{
      pathArrow.classList.add('animate');
    }, 1000); //패스 다 그리고 animate
  }, 100); //타이핑 이후 패스 그림
};

function aboutIntroHandler(){
  const contentArea = document.querySelector('.content'); // 스크롤 컨테이너
  const aboutIntroSection = document.querySelector('.about-intro-include'); // 스크롤 잠금 대상
  const aboutIntroList = document.getElementById('about-intro-list'); // 텍스트가 추가될 ul
  const introTexts = [
    '<h2>프론트엔드 개발자 이혜빈입니다.</h2>',
    '새로운 도전을 두려워하지 않고',
    '기초를 차근차근 다지며',
    '꾸준히 성장 중입니다.',
    '스크롤을 내려서 다음 내용을 확인하세요!',
  ];

  let currentTextIndex = 0; // 현재 출력 중인 문장의 인덱스
  let isScrollingAllowed = false; // 스크롤 활성화 여부
  let isScrollUnlocked = false; // 한 번 스크롤이 해제되었는지 확인하는 상태

  // 1. 초기화: 텍스트 추가 및 숨기기
  function initializeTexts(){
    aboutIntroList.innerHTML = ''; //기존 텍스트 제거

    introTexts.forEach((text) => {
      const listItem = document.createElement('li');

      listItem.style.opacity = '0'; // 처음에 숨김

      if(text.startsWith('<h2>')){
        listItem.innerHTML = text; // HTML 태그 포함된 텍스트 처리
      }
      else{
        const paragraph = document.createElement('p');

        paragraph.textContent = text; // 일반 텍스트 처리
        listItem.appendChild(paragraph);
      }
      aboutIntroList.appendChild(listItem); // ul에 li 추가
    });
  }
  
  // 2. 문장 출력
  function showText(index){
    const items = aboutIntroList.querySelectorAll('li');
    if(currentTextIndex < items.length){
      items[index].style.opacity = '1'; //문장 보이기
      items[index].classList.remove('text-blur-out');
    }

    //문장이 모두 출력된 경우 스크롤 잠금 하제
    if(index === introTexts.length - 1){
      console.log('문장 출력 끝 스크롤 잠금 해제');
      
      unlockScroll();
      contentArea.removeEventListener('wheel', handleWheel); //휠 이벤트 비활성화
      isScrollingAllowed = true;
    }
  }

  // 3. 스크롤 잠금
  function lockScroll() {
    if(!isScrollUnlocked){
      contentArea.style.overflow = 'hidden';
      console.log('스크롤 잠금 활성화');
    }
  }

  // 4. 스크롤 해제
  function unlockScroll() {
    isScrollUnlocked = true;
    contentArea.style.overflow = 'auto';
    console.log('스크롤 잠금 해제');
  }

  // 5. 휠 이벤트 핸들러
  function handleWheel(event) {
    const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

    // Swiper 내부에서는 about-intro의 휠 이벤트 무시
    if(event.target.closest('.swiper-container')){
      return;
    }

    // 휠 아래로: 문장 출력
    if (scrollDirection === 'down') {
      if(currentTextIndex < introTexts.length) {
        showText(currentTextIndex); // 문장 출력
        currentTextIndex++;
      }
    }
    // 휠 위로: 문장 삭제
    if (scrollDirection === 'up') {
      if (currentTextIndex > 0) {
        currentTextIndex--;
        const items = aboutIntroList.querySelectorAll('li');
        items[currentTextIndex].style.opacity = '0'; // 문장 숨김
        items[currentTextIndex].classList.add('text-blur-out'); // 블러 효과 추가
      }
    }
  }

  // 6. about-intro section 안 스크롤 이벤트
  contentArea.addEventListener('scroll', ()=>{
    const scrollY = contentArea.scrollTop;
    const aboutIntroOffset = aboutIntroSection.offsetTop;
    
    console.log(`스크롤 Y 위치: ${scrollY}, About Intro Offset: ${aboutIntroOffset}`);

    if(scrollY >= (aboutIntroOffset-60) && !isScrollingAllowed && !isScrollUnlocked){
      console.log('about-intro 섹션 도착');
      lockScroll();
      contentArea.addEventListener('wheel', handleWheel, { passive: false });
    }
    else if (scrollY < (aboutIntroOffset - 60) && isScrollingAllowed) {
      console.log('about-intro 섹션 이전으로 돌아감');
      unlockScroll();
      contentArea.removeEventListener('wheel', handleWheel);
    }
  });
  initializeTexts();
}

// skill tab
function skillTab(){
  const targetLink = document.querySelectorAll('.skill-menu-tab a');
  const tabContent = document.querySelectorAll('.skill-content > div');
  const skillLabel = document.querySelector('.skill-label');

  for(let i = 0; i < targetLink.length; i++){
    targetLink[i].addEventListener('click', (e)=>{
      e.preventDefault();

      // 상단 글자 변경
      skillLabel.innerHTML = '';
      if(i === 0) skillLabel.innerHTML += '/Front-End';
      else if(i === 1) skillLabel.innerHTML += '/Back-End';
      else skillLabel.innerHTML += '/Tool';

      let orgTarget = e.target.getAttribute('href');
      let tabTarget = orgTarget.replace('#', '');

      for(let j = 0; j < tabContent.length; j++){
        tabContent[j].style.display= 'none';
      }

      document.getElementById(tabTarget).style.display = 'block';

      // 클릭한 li active 추가
      for(let k = 0; k < targetLink.length; k++){
        targetLink[k].closest('li').classList.remove('active');
        e.target.closest('li').classList.add('active');
      }
    });
  }
  document.getElementById('front').style.display = 'block';
}

// skill tab accordion
function skillTabAccordion(){
  const skillTitles = document.querySelectorAll('.skill-title');

  skillTitles.forEach((title) => {
    title.addEventListener('click', () => {
      const desc = title.nextElementSibling; //title의 다음 요소(.skill-desc)

      const allDescs = document.querySelectorAll('.skill-desc'); //모든 설명을 비활성화
      allDescs.forEach((d) => {
        if (d !== desc) {
          d.style.maxHeight = null; // 내용 접기
          d.parentElement.querySelector('.skill-title span').textContent = '+'; // "+" 표시
        }
      });

      // 클릭된 설명을 토글
      if(desc.style.maxHeight) {
        desc.style.maxHeight = null; // 이미 열려 있으면 닫기
        title.querySelector('span').textContent = '+'; // "+" 표시로 변경
      } 
      else{
        desc.style.maxHeight = desc.scrollHeight + 'px'; // 높이를 내용에 맞게 설정
        title.querySelector('span').textContent = '-'; // "-" 표시로 변경
      }
    });
  });
}

// wokrs scroll change
function horizontalScroll(){  
  const worksWrapper = document.querySelector('.works-wrapper'); // 가로 스크롤 컨테이너
  const works = document.querySelector('.works'); // 세로 스크롤 이벤트를 처리할 컨테이너

  // 세로 스크롤을 가로 스크롤로 변환
  works.addEventListener('wheel', (event) => {
  event.preventDefault(); // 기본 동작 방지

  // deltaY 값을 가로 스크롤로 변환
  worksWrapper.scrollLeft += event.deltaY * 1.5; // 스크롤 속도를 조금 더 빠르게 설정
  });
}

// Epliogue 표시 함수
function epilogueHandler(){
  const epilogue = document.getElementById('epilogue'); 
  const goToIntro = document.querySelector('.go-to-intro');
  const worksWrapper = document.querySelector('.works-wrapper');

  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: false,
    mousewheel: true,
  });

  let wheelCount = 0; // 휠 동작 카운트
  const maxWheelCount = 5; // 휠 최대 횟수
  let epilogueVisible = false; // Epilogue 표시 상태
  let lastScrollY = 0; // 이전 스크롤 위치 저장

  // 스크롤 이벤트
  contentArea.addEventListener('scroll', () => {
    const scrollY = contentArea.scrollTop;

    // Epilogue가 보이는 상태에서 위로 스크롤 시 숨기기
    if(epilogueVisible && scrollY < lastScrollY) 
      hideEpilogue();

    lastScrollY = scrollY; // 스크롤 위치를 업데이트
  });

  // Swiper 슬라이드 변경 이벤트
  swiper.on('slideChange', () => {
    const currentIndex = swiper.activeIndex; // 현재 슬라이드 인덱스
    const totalSlides = swiper.slides.length; // 전체 슬라이드 개수

    if(currentIndex === totalSlides - 1) {
      // 마지막 슬라이드에서 휠 이벤트 활성화
      enableWheelDetection();
    }
    else{
      disableWheelDetection();
      wheelCount = 0; // 카운트 초기화
    }
  });

  // 휠 이벤트 핸들러
  function handleWheel(event){
    if (event.deltaY > 0) {
      wheelCount++; // 휠 아래로 스크롤 시 카운트 증가
    }
    else if (event.deltaY < 0) {
      if (epilogueVisible) { // 휠 위로 스크롤 시 Epilogue 숨김
        hideEpilogue();
      }
    }

    // 현재 wheelCount가 maxWheelCount와 같을 때 Epilogue 표시
    if (wheelCount >= maxWheelCount) {
      showEpilogue();
    }
  }

  // Epilogue 표시
  function showEpilogue(){
    epilogue.classList.add('visible');
    epilogueVisible = true; // 상태 업데이트
    console.log('Epilogue 표시');
    enableWheelDetection(); // Epilogue에서도 휠 이벤트 활성화
  }

  // Epilogue 숨김
  function hideEpilogue(){
    epilogue.classList.remove('visible');
    epilogueVisible = false; // 상태 업데이트
    wheelCount = 0; // 휠 카운트 초기화
    enableWheelDetection(); // 다시 휠 이벤트 활성화
    console.log('Epilogue 숨김');
  }

  // 휠 이벤트 활성화
  function enableWheelDetection(){
    worksWrapper.addEventListener('wheel', handleWheel, { passive: false });
    console.log('휠 이벤트 활성화');
  }

  // 휠 이벤트 비활성화
  function disableWheelDetection(){
    worksWrapper.removeEventListener('wheel', handleWheel);
    console.log('휠 이벤트 비활성화');
  }

  // "Intro로 돌아가기" 버튼 클릭 시 초기화
  goToIntro.addEventListener('click', () => {
    hideEpilogue(); // Epilogue 숨김
    contentArea.scrollTop = 0; // 스크롤 초기화
    swiper.slideTo(0); // Swiper 초기화
  });
}

// Epiogue bear stop
function bearStop(){
  const goToIntro = document.querySelector('.go-to-intro');
  const goToIntroHover = document.querySelector('.hover-image');

  goToIntro.addEventListener('mouseenter', ()=>{
    goToIntro.classList.add('stop');
    goToIntroHover.classList.add('visible');
  });
  goToIntro.addEventListener('mouseleave', ()=>{
    goToIntro.classList.remove('stop');
    goToIntroHover.classList.remove('visible');
  });
};

//초기 로드
contactWindowShow();
loadIntro();
loadAboutIntro();
loadWorks();
loadAbout();
loadSkill();
loadEpilogue();
loadLoadingPage();
