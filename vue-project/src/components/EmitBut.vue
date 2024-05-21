<template>
    <button @click="UbahTeks">Click Me</button>
</template>

<script setup>
const emit = defineEmits(['response'])

function UbahTeks(){
    emit('response','hello from child')
}

</script>