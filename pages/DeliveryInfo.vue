<template>
    <div>
        <a-space direction="vertical">
            <div>
                <span>이름</span>
                <a-input type="text"></a-input>
            </div>
            <div>
                <span>연락처</span>
                <a-input type="text"></a-input>
            </div>
            <div>
                <span>주소</span>
                <a-button type="primary">우편번호</a-button>
            </div>
            <a-input></a-input>
            <a-input></a-input>
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