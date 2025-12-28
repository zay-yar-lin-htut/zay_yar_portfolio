<script setup>

const dev_photo = '/public/images/dev.png';
const ops_photo = '/public/images/ops.png';
const backend = 'backend developer'; 
const devops = 'devops engineer';
</script>
<template>
    <div class="flex justify-center items-center mx-auto p-10">
        <div class="flex flex-start w-3/5 justify-center items-center">
            <div class="text-center">
                <h1 class="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
                <p class="text-xl">I'm Zay Yar Lin Htut, a passionate ${{ backend }}.</p>
            </div>
        </div>
        <div>
            
        </div>
        <div class="flex flex-end w-2/5 justify-center items-center">
            <img class="h-4/5 w-4/5 drop-shadow-[0_6px_10px_rgba(239,68,68,0.4)]" :src="dev_photo" alt="">
        </div>
    </div>
</template>