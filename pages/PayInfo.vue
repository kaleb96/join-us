<script setup lang="ts">

const cardNo = reactive({

    no1 : '',
    no2 : '',
    no3 : '',
    no4 : '',
    result : false,
    valid : false
})

//input Data 검증
const handleInput = () => {

    checkRegex();
    if(cardNo.result === true) { //input 확인 완료
        
        let num = `${cardNo.no1}${cardNo.no2}${cardNo.no3}${cardNo.no4}`;
        cardNo.valid = calculation(num);    
    }    
}

//input data 확인
const checkRegex = () => {

    let regex = /^\d{4}$/; //정규식
    
    if(regex.test(cardNo.no1) && regex.test(cardNo.no2) //모든 input값에 4자리인지 체크
    && regex.test(cardNo.no3) && regex.test(cardNo.no4)) { 
        cardNo.result = true; //success

    } else { //fail
        cardNo.result = false;

    }
}

// 조건 계산식
const calculation = (num: string) => {

    //문자열 Reverse
    const reversed = num.split('').reverse().join('');
    
    let sum = 0;
    for(let i = 0; i< reversed.length; i++) {

        let digit = parseInt(reversed[i], 10);

        if(i % 2 === 1) { //가장 오른쪽 숫자부터 짝수 번째 자릿수 -> 가장 왼쪽에서 홀수 (reversed)

            digit*2;
            if(digit >=10) { //9 이상일 경우 자리수의 값을 더함
                digit = Math.floor((digit/10) + (digit % 10));
            }
        }
    
        sum += digit; //모든 값을 더하기
    }
    return sum % 10 === 0; //true : 유효

}
</script>

<template>
    <div>
        <span>카드번호</span> <br>
        <a-space direction="vertical">
            <a-space direction="horizontal">
                <a-input v-model:value="cardNo.no1" @change="handleInput"></a-input>
                <a-input v-model:value="cardNo.no2" @change="handleInput"></a-input>
                <a-input v-model:value="cardNo.no3" @change="handleInput"></a-input>
                <a-input v-model:value="cardNo.no4" @change="handleInput"></a-input>
            </a-space>
                <a-input v-if="!(cardNo.valid && cardNo.result) && cardNo.no1" placeholder="유효하지 않은 값입니다." disabled></a-input>
            <a-button>완료</a-button>
        </a-space>
       

    </div>
</template>