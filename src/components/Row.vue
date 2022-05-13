<template>
    <div class="row">
        <Tile v-for="el, idx in guess" :key="'tile'+idx+''+rownum" :id="'tile'+idx+''+rownum" :letter="el" :row="rownum" :col="idx"/>
        
    </div>
</template>

<script setup lang="ts">
    import  { useGameStore, ColoredLetter } from "../stores/game";
    import Tile from './Tile.vue';
    const game = useGameStore();
    const props = defineProps<{
        guess: ColoredLetter[],
        rownum: number
    }>()
    const row = props.rownum;




    /* If a correct letter is guessed twice and one instance is in the correct place, that one is green but the other is grey
    If it guessed twice and both instances are in the wrong place, only the first instance is yellown */
</script>

<style scoped>
    .row{        
        display: flex;
    }
</style>