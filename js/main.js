/**
 *ECMA6 SCRIPT STUDY
 */

//const arr=[1,2,3];
//바람직한 패턴이 아닙니다.

(()=>{
	//const arr=[1,2,3]; //지역변수로 선언하고 코딩하는 것을 제안.
	const sceneInfo=[
		{	
			type:'sticky',
			//0
			heightNum:5,	//브라우저 높이의 5배로 scrollheight 세팅.
			scrollHeight:0, //문서길이에 대해서 섹션의 애니메이션 구간을 미리 설정합니다.
							//일단 0이라고 설정한 부부은 기기마다 값이 달라질 수 있기 때문에
							//스크롤 높이의 몇배수 만큼 설정을 해주려고 합니다.
			objs:{
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message .a'),
				messageB: document.querySelector('#scroll-section-0 .main-message .b'),
				messageC: document.querySelector('#scroll-section-0 .main-message .c'),
				messageD: document.querySelector('#scroll-section-0 .main-message .d'),
			}
		},
		//각구간을 4개로 나눴습니다.
		{	
			//1
			type:'normal',
			heightNum:5,
			scrollHeight:0,
			objs:{
				container: document.querySelector('#scroll-section-1')
			} 
		},
		{	
			type:'sticky',
			//2
			heightNum:5,
			scrollHeight:0,
			objs:{
				container: document.querySelector('#scroll-section-2')
			}	
		},	
		{
			type:'sticky',
			//3
			scrollHeight:0,
			heightNum:5,
			objs:{
				container: document.querySelector('#scroll-section-3')
			}
		}	
	];
	
	let yOffset=0;
	let prevScrollHeight=0;
		//현재 스크롤위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합.
	let currentScene=0;
		//활성화된 씬
	
	function setLayout(){
		for(let i=0; i<sceneInfo.length; i++){
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`;
			//기본적으로 문자열을 설정해야하나 ${--- } << ---이부분에 변수이름을 적용 가능
		}
		
		
		//정확하게 한번더 선언. 재선언 가능의 LET
		yOffset=window.pageYOffset;
		//load이벤트와 연관지어야하는 이유.
		let totalScrollHeight=0;
		for(let i=0; i<sceneInfo.length; i++){
			totalScrollHeight+=sceneInfo[i].scrollHeight;
			if(totalScrollHeight >= yOffset){
				currentScene=i;
				break;
				/*
					*총 전체스크롤 높이가 현재 커서하고있는 페이지 스크롤 위치보다 크면,
					*break를 사용하여 for 문을 탈출합니다.
					*그리고 i값을 currentscene으로 세팅해줍니다.
				 */
			}
		}
		document.body.setAttribute('id',`show-scene-${currentScene}`);
	}
	
	
	
	
	function scrollLoop(){
		prevScrollHeight=0;
		for(let i = 0; i<currentScene; i++){
			prevScrollHeight+=sceneInfo[i].scrollHeight;
		}
		if (yOffset>prevScrollHeight+sceneInfo[currentScene].scrollHeight){
			currentScene++;
		}
		if (yOffset<prevScrollHeight){
			if(currentScene==0) return;//모바일기기의 위로 올릴경우 -가 될 때를 방지
			currentScene--;
		}
		document.body.setAttribute('id',`show-scene-${currentScene}`);
		//"setAttribute 속성은 id 값을 두번재 인자값으로 줄 수 있다. 라는 의미"
		console.log(currentScene);
	}
	

	window.addEventListener('resize',setLayout);
	window.addEventListener('load',setLayout);
	//각 스크롤 높이를 로드, 리사이즈 될 때 스크롤의 높이를 잡아줍니다.
	window.addEventListener('scroll',()=>{
		yOffset=window.pageYOffset;
		scrollLoop();
		
	});
	setLayout();
})();

//LET CONST => ECMA6에서 상수역할. 재할당은 가능하나 재선언이 불가하다.
//괄호로 감싸주게되면 로드되어지자마자 바로 실행합니다.