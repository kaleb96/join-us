<script setup lang="ts">

onMounted(()=> {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.head.appendChild(script);
})

//states
const name = ref('');
const ctn = ref('');
const roadAddress = ref('');
const zonecode = ref('');
const isNameChecked = ref(true);
const isCtnChecked = ref(true);
const router = useRouter();

//functions
//이름 유효성 검사
const handleName = () => {

    if(name.value) {

        let reg = /^(?:[가-힣]{2,}|[a-zA-Z]{3,})$/;
        
        if(!reg.test(String(name.value))) { //fail
            return isNameChecked.value = false
        } 
    }
    return isNameChecked.value = true; //success
}

//연락처 유호성 검사
const handleCtn = () => {

    if(ctn.value) {

        let reg = /^0\d{2}[ -]?\d{3,4}[ -]?\d{4}$/;
        // console.log('test is = ' + reg.test(String(ctn.value)))

        if(!(reg.test(String(ctn.value)))) { //false
            return isCtnChecked.value = false;
        }
    } 

    return isCtnChecked.value = true; //success
}

//Daum 우편번호 검색
const postOpen = () => {

  new daum.Postcode({
    
    oncomplete: (data: any) => {
    
        if(data) {
            roadAddress.value = data.roadAddress;
            zonecode.value = data.zonecode;
        }
    }
  }).open();
}

const goNext = () => {

    if(roadAddress.value && zonecode.value && isNameChecked && isCtnChecked) {
        router.push('/PayInfo');
    }
}
</script>

<template>
    <div>
        <a-space direction="vertical">
            <div>
                <span>이름</span>
                <a-input type="text" v-model:value="name" @change="handleName"></a-input>
                <a-input v-if="!isNameChecked" placeholder="이름을 다시 확인 해주세요" disabled></a-input>
            </div>
            <div>
                <span>연락처</span>
                <a-input type="text" v-model:value="ctn" @change="handleCtn"></a-input>
                <a-input v-if="!isCtnChecked" placeholder="연락처를 다시 확인 해주세요" disabled></a-input>
            </div>
            <div>
                <span>주소</span>
                <a-button @click="postOpen">우편번호</a-button>
                <a-input type="text" readonly v-model:value="roadAddress"></a-input>
                <a-input type="text" readonly v-model:value="zonecode"></a-input>
            </div>
            <div>
                <a-button><Nuxt-link to='/'>이전</Nuxt-link></a-button>
                <a-button @click="goNext">다음</a-button>
            </div>
        </a-space>
    </div>
</template>