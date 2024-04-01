<script setup lang="ts">

//states
const name = ref('');
const ctn = ref('');
const zonecode = ref('');
const detailAddress = ref('');
const isNameChecked = ref(true);
const isCtnChecked = ref(true);
const isScriptLoaded = ref(false);
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
                <button>우편번호</button>
                <a-input type="text" readonly v-model:value="zonecode"></a-input>
                <a-input type="text" readonly v-model:value="detailAddress"></a-input>
            </div>
            <div>
                <a-button>
                    <NuxtLink to="/">이전</NuxtLink>
                </a-button>
                <a-button>
                    <NuxtLink to="/PayInfo">다음</NuxtLink>
                </a-button>
            </div>
        </a-space>
    </div>
</template>